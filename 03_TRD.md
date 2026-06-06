# 03_TRD.md

# Mehndi Showcase & Booking Platform

## Technical Requirements Document

Version: 2.0

Status: Production Ready

Architecture: Next.js + Firebase + Dynamic CMS


# 1. Technical Vision

The platform shall be built as a scalable, CMS-driven, mobile-first web application using Firebase as the backend infrastructure and Next.js as the frontend framework.

The system must support:

Single Artist MVP

Multi Artist Future

Multi City Future

Flutter Apps Future

Marketplace Future

without architectural redesign.


# 2. Architecture Principles

## Principle 1

Separation of Concerns

UI must never directly access Firebase.


## Principle 2

CMS Driven

All content comes from Firestore.

No hardcoded content.


## Principle 3

Reusable Business Logic

Business logic must exist outside UI components.


## Principle 4

Type Safety

Strict TypeScript only.

No any types allowed.


## Principle 5

Production First

No mock implementations.

No placeholder logic.


# 3. High Level Architecture

Frontend (Next.js)

↓


Feature Layer

↓

Service Layer

↓

Repository Layer

↓

Firebase Layer

↓

Firestore
Storage
Auth
Functions
Analytics


# 4. Frontend Architecture

Framework:

Next.js App Router

Language:

TypeScript Strict Mode

UI:

Tailwind CSS
ShadCN UI
Framer Motion

Forms:

React Hook Form
Zod


# 5. Project Structure

src/

├── app/

├── components/

├── features/

├── services/

├── repositories/

├── stores/

├── hooks/

├── providers/

├── schemas/

├── types/

├── constants/

├── lib/

├── middleware/

├── utils/

└── styles/


# 6. Feature Architecture

features/

├── designs
├── categories
├── collections
├── packages
├── bookings
├── reviews
├── pages
├── seo
├── cms
├── auth
└── analytics

Each feature owns:

components
hooks
services
types
schemas


# 7. Layer Architecture

## UI Layer

Responsibilities:

Rendering

User Interaction

Forms

Cannot:

Call Firebase directly


## Feature Layer

Responsibilities:

Business workflows

Feature composition


## Service Layer

Responsibilities:

Application logic

Data transformation

Example:

booking.service.ts
design.service.ts
review.service.ts


## Repository Layer

Responsibilities:

Database communication

Example:

booking.repository.ts
design.repository.ts
review.repository.ts


## Firebase Layer

Responsibilities:

Firestore

Storage

Auth

Functions

Only repositories may access Firebase.


# 8. State Management

Library:

Zustand

Stores:

authStore

themeStore

bookingStore

settingsStore

uiStore


# 9. Authentication Architecture

Provider:

Firebase Authentication

MVP:

Email + Password

Admin only.


# 10. Authorization Architecture

Roles:

SUPER_ADMIN

CONTENT_MANAGER

BOOKING_MANAGER

Authorization source:

admins collection


# 11. Route Architecture

Public Routes

/

/designs

/design/[slug]

/packages

/reviews

/contact

/[slug]


Admin Routes

/ admin

/admin/dashboard

/admin/designs

/admin/categories

/admin/collections

/admin/packages

/admin/bookings

/admin/reviews

/admin/pages

/admin/media

/admin/forms

/admin/theme

/admin/settings


# 12. Rendering Strategy

Homepage

Static Generation


Design Pages

ISR


CMS Pages

ISR


Admin

Client Side


# 13. Data Fetching Strategy

Preferred:

Server Components

Use Client Components only when:

Forms

Interactive UI

Live Search


# 14. Repository Pattern

Example:

DesignRepository

create()

update()

delete()

findBySlug()

findFeatured()

findByCategory()

All database access goes through repositories.


# 15. Service Layer Pattern

Example:

DesignService

createDesign()

updateDesign()

publishDesign()

featureDesign()

Services call repositories.

UI calls services.


# 16. Validation Strategy

Library:

Zod

Required Schemas:

bookingSchema

reviewSchema

designSchema

packageSchema

categorySchema


# 17. Search Architecture

Search Scope:

Designs
Categories
Collections
Tags

Features:

Debounced Search

Search Suggestions

Empty Results


# 18. Image Architecture

Formats:

WEBP
AVIF

Fallback:

JPG


Image Pipeline

Upload

↓

Compress

↓

Thumbnail

↓

Storage

↓

Firestore Metadata


# 19. Media Optimization

Requirements:

Responsive Images

Lazy Loading

Blur Placeholder

CDN Delivery


# 20. Error Handling

Frontend:

Error Boundaries

Retry Actions

Fallback UI


Backend:

Cloud Function Logging

Firestore Logging


# 21. Logging Architecture

Track:

Content Changes

Booking Changes

Authentication Events

Review Moderation

Theme Changes

Store in:

audit_logs


# 22. Analytics Architecture

Provider:

Firebase Analytics

Track:

Page Views

Design Views

Booking Starts

Booking Submits

WhatsApp Clicks

Review Submits


# 23. SEO Architecture

Dynamic Metadata

Supports:

Meta Title

Meta Description

Canonical URL

Open Graph

Twitter Card


Structured Data

LocalBusiness

Review

FAQ

Breadcrumb

ImageObject


# 24. Security Architecture

Protection:

Role Based Access

Firestore Rules

Storage Rules

Input Validation

Rate Limiting

reCAPTCHA


# 25. Performance Architecture

Target:

Lighthouse >= 95

Requirements:

Code Splitting

Lazy Loading

Route Prefetching

Image Optimization

ISR


# 26. CI/CD Architecture

GitHub

↓

Pull Request

↓

Lint

↓

Type Check

↓

Build

↓

Tests

↓

Deploy


# 27. Monitoring

Track:

Function Errors

Slow Queries

Failed Uploads

Authentication Failures

Storage Usage


# 28. Coding Standards

Mandatory:

TypeScript Strict Mode

ESLint

Prettier

No Any Types

No Dead Code

No Console Logs In Production


# 29. Future Flutter Compatibility

Backend must remain UI agnostic.

Flutter apps must reuse:

Firestore Collections

Storage Structure

Authentication

Cloud Functions

without backend changes.


# 30. Technical Acceptance Criteria

The application must follow layered architecture.

UI components must never directly access Firebase.

All business logic must be reusable.

All content must originate from Firestore.

The system must remain compatible with future Flutter applications and multi-artist expansion without architectural redesign.
