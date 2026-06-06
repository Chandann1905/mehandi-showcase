# 07_Firebase_Spec.md

# Mehndi Showcase & Booking Platform

## Firebase Architecture Specification

Version: 1.0

Backend Architecture: Firebase Only

Deployment Model: Serverless


# 1. Overview

The platform shall use Firebase as the complete backend infrastructure.

No dedicated backend servers shall be required.

All application services must operate through Firebase services.


# 2. Firebase Services

## Required Services

### Firebase Authentication

Purpose:

Admin Authentication

Role Management


### Cloud Firestore

Purpose:

CMS Data

Bookings

Reviews

Settings

SEO

Analytics Metadata


### Firebase Storage

Purpose:

Design Images

Review Images

Logos

Hero Images

Attachments


### Firebase Hosting

Purpose:

Frontend Hosting

CDN Delivery


### Cloud Functions

Purpose:

Business Logic

Validation

Automation


### Firebase Analytics

Purpose:

Visitor Tracking

Conversion Tracking


### Firebase Performance Monitoring

Purpose:

Speed Monitoring

Error Detection


# 3. Environment Architecture

## Development

Project:

text id="2jztsl" mehndi-dev


## Staging

Project:

text id="m2gwf2" mehndi-staging


## Production

Project:

text id="pxvnbe" mehndi-production


# 4. Authentication Architecture

## Authentication Provider

Firebase Authentication


## Login Method

MVP:

text id="2fjlwm" Email + Password


Future:

text id="z0fv60" Google Login Phone Login


# 5. Admin Login Flow

```text id=“xf4i4z” Login

↓

Firebase Auth

↓

Verify User

↓

Fetch Role

↓

Dashboard Access

---

# 6. Role Management

Roles:

```text id="7zvzpd"
SUPER_ADMIN

CONTENT_MANAGER

BOOKING_MANAGER


Role source:

text id="sr7q5h" admins collection


# 7. Firestore Collections

Required Collections

```text id=“mhgqut” roles

admins

artists

cities

categories

collections

designs

design_images

packages

bookings

booking_notes

reviews

favorites

recent_views

pages

homepage_sections

menus

forms

form_submissions

media

seo

theme

settings

audit_logs

---

# 8. Firestore Security Rules

## Public Users

Allowed:

```text id="z6r7nr"
Read Public Content

Create Booking

Create Review


Denied:

```text id=“6o1ep6” Edit Content

Delete Content

Access Admin Data

---

## Admin Users

Allowed based on role.

---

# 9. Firestore Rule Strategy

Example:

```javascript id="3kib0y"
isAuthenticated()

isAdmin()

hasRole()

isPublished()

Reusable functions only.


# 10. Storage Structure

```text id=“gjm2hn” /designs

/reviews

/categories

/hero

/pages

/uploads

/logos

/favicons

---

# 11. Storage Upload Limits

Design Images:

```text id="6l3k0r"
10 MB


Review Images:

text id="f7zbma" 5 MB


Attachments:

text id="3pq7wx" 10 MB


# 12. Storage Security Rules

Public:

text id="xwyk2d" Read Approved Assets


Admin:

text id="x5qevq" Upload Update Delete


Anonymous upload prohibited.


# 13. Media Processing Pipeline

```text id=“7wgn4q” Upload

↓

Validate

↓

Compress

↓

Generate Thumbnail

↓

Convert WebP

↓

Store

↓

Save Metadata

---

# 14. Cloud Functions Overview

Required Functions

---

## createBooking

Purpose:

Create booking record.

---

## updateBookingStatus

Purpose:

Manage booking workflow.

---

## submitReview

Purpose:

Create review.

---

## approveReview

Purpose:

Publish review.

---

## generateSitemap

Purpose:

SEO automation.

---

## rebuildSearchIndex

Purpose:

Search refresh.

---

## generateAnalytics

Purpose:

Analytics aggregation.

---

## createAuditLog

Purpose:

Track admin activity.

---

# 15. Booking Function Flow

```text id="34aqur"
Validate

↓

Save Booking

↓

Generate Number

↓

Audit Log

↓

Return Success


# 16. Review Function Flow

```text id=“58u5it” Validate

↓

Save Review

↓

Pending Status

---

# 17. Homepage Builder Function

```text id="k8v8xa"
Load Sections

↓

Sort Order

↓

Render Homepage

Dynamic only.


# 18. Analytics Events

Visitor Events

```text id=“h0v5r0” page_view

gallery_view

design_view

search

favorite_add

booking_start

booking_submit

whatsapp_click

review_submit

---

Admin Events

```text id="7uuxs8"
login

create_design

update_design

delete_design

approve_review

update_booking


# 19. Conversion Funnel

Track:

```text id=“zvfwwi” Homepage View

↓

Gallery View

↓

Design View

↓

Booking Start

↓

Booking Submit

↓

WhatsApp Click

---

# 20. Performance Monitoring

Track:

- Slow Queries
- Slow Functions
- Large Documents
- Storage Usage
- Failed Requests

---

# 21. Error Monitoring

Capture:

- Function Failures
- Firestore Failures
- Storage Failures
- Authentication Failures

---

# 22. Audit Logging

Every admin action creates log.

---

Tracked Actions

```text id="1stgwf"
Create

Update

Delete

Publish

Unpublish

Login

Logout


# 23. Backup Strategy

Firestore

Daily Export

Retention:

text id="pw7dpc" 30 Days


Storage

Weekly Snapshot

Retention:

text id="q8wb2l" 30 Days


# 24. Disaster Recovery

Recovery Targets

RPO:

text id="sz8uqy" 24 Hours

RTO:

text id="hz6h90" 4 Hours


# 25. Deployment Architecture

```text id=“0jv9vk” GitHub

↓

Pull Request

↓

Build

↓

Test

↓

Deploy

↓

Firebase Hosting

---

# 26. CI/CD Requirements

Every deployment must run:

```text id="txk0jc"
Type Check

Lint

Build

Security Validation

before deployment.


# 27. Firebase Config Management

Environment Variables

Never hardcode:

```text id=“s4wjlwm” API Keys

Project IDs

Secrets

---

Use:

```text id="axey5x"
.env.local

.env.staging

.env.production


# 28. Rate Limiting

Protect:

Bookings

Reviews

Forms

Against spam.


# 29. Abuse Protection

Implement:

```text id=“n89j2r” reCAPTCHA

Duplicate Detection

Submission Limits

---

# 30. Future Readiness

Architecture must support:

```text id="dnp0qu"
Flutter Apps

Multiple Artists

Multiple Cities

Marketplace

Notifications

Payments

without backend redesign.


# 31. Firebase Acceptance Criteria

The entire platform must operate using Firebase services only.

No dedicated backend servers shall be required.

All uploads must use Firebase Storage.

All content must use Firestore.

All authentication must use Firebase Authentication.

All business logic must use Cloud Functions.

All analytics must use Firebase Analytics.

All deployments must be automated through CI/CD pipelines.
