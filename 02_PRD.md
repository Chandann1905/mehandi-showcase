# Mehndi Showcase & Booking Platform

## Master Product Requirements Document (FINAL)

Version: 1.1

Status: Production Ready

Architecture: Mobile First + Firebase Only + Dynamic CMS

Target: AI Agent Implementation


# Product Vision

Build a premium, luxury, mobile-first mehndi showcase and booking platform that enables visitors to discover mehndi designs, explore categories and collections, submit booking requests, and communicate instantly through WhatsApp.

The platform must operate as a fully CMS-driven system where administrators can manage all content without developer involvement.


# Core Product Principles

## Principle 1

Mobile First

Every feature must be designed for mobile before tablet and desktop.


## Principle 2

CMS First

Nothing should be hardcoded.

All content must be editable through Admin Panel.


## Principle 3

SEO First

Every public page must be crawlable, indexable and SEO optimized.


## Principle 4

Conversion First

Every page should encourage:

Design Discovery

WhatsApp Contact

Booking Submission


## Principle 5

Future Scalability

Database and architecture must support:

Multiple Artists

Multiple Cities

Mobile Apps

Marketplace Expansion

without redesign.


# User Roles

## Visitor

Can:

Browse Designs

Search Designs

Filter Designs

View Packages

Submit Booking

Submit Review

Contact Artist


## Super Admin

Full System Access


## Content Manager

Manage:

Designs

Categories

Collections

Reviews

Pages


## Booking Manager

Manage:

Bookings

Leads

Status Updates

Internal Notes


# Website Modules

## Home

Dynamic CMS Sections:

Hero

Categories

Featured Designs

Collections

Packages

Reviews

FAQ

CTA Banner

Contact

Admin can:

Create

Edit

Delete

Enable

Disable

Reorder

sections.


## Gallery

Features:

Search

Filters

Infinite Scroll

Categories

Collections

Favorites

Recently Viewed


## Design Details

Components:

Image Gallery

Description

Tags

Related Designs

Share

Favorite

Book Now

WhatsApp

Sticky Mobile Footer:

Favorite

Book Now

WhatsApp


## Packages

Dynamic Package System

Admin can:

Create

Edit

Delete

Reorder

packages.


## Reviews

Features:

Ratings

Images

Featured Reviews

Verified Reviews


## Contact

Features:

WhatsApp

Phone

Social Media

Google Map


## Dynamic Pages

Unlimited CMS Pages

Examples:

About

FAQ

Privacy Policy

Terms

Refund Policy


# Booking Module

Booking Flow:

Design

↓

Booking Form

↓

Firestore Save

↓

WhatsApp Redirect

↓

Admin Lead Created


Required Fields:

Name

Mobile Number

Event Date

Optional Fields:

Location

Notes

Design Reference

Attachment


Booking Statuses:

New

Contacted

Confirmed

Completed

Cancelled


# Reviews Module

Review Workflow:

Submitted

↓

Pending

↓

Approved

↓

Published


# CMS Requirements

## Categories

Fully Dynamic

Examples:

Bridal

Arabic

Pakistani

Dubai Style

Modern

Admin can manage everything.


## Collections

Examples:

Trending

Wedding Season

Editor Choice

Admin managed.


## Homepage Builder

Admin can:

Add Sections

Remove Sections

Reorder Sections

Configure Content


## Menu Builder

Admin can:

Create Menus

Reorder Items

Enable Items

Disable Items


## Theme Builder

Admin can manage:

Colors

Fonts

Logos

Favicon

Hero Images

without code changes.


## Form Builder

Supported Types:

Text

Number

Email

Date

Select

Checkbox

File Upload


# Admin Panel Modules

Dashboard

Designs

Categories

Collections

Packages

Bookings

Reviews

Media Library

Pages

Menus

Forms

SEO

Theme

Settings

Audit Logs


# Favorites System

Visitors can:

Save Designs

Remove Designs

No login required for MVP.

Use local storage.


# Recently Viewed

Track recently viewed designs.

Retention:

30 Days


# WhatsApp Integration

All booking flows must redirect to WhatsApp.

Message templates must be editable via Admin Panel.

No hardcoded WhatsApp messages.


# SEO Requirements

Dynamic SEO Engine

Every page must support:

Meta Title

Meta Description

Canonical URL

Open Graph Image


Schema Support:

LocalBusiness

FAQ

Review

Breadcrumb

ImageObject


Technical SEO:

Sitemap

Robots.txt

Structured Data


# Performance Requirements

Mobile Lighthouse:

Performance ≥ 95

Accessibility ≥ 95

Best Practices ≥ 100

SEO ≥ 100


Requirements:

Lazy Loading

WebP

AVIF

Responsive Images

Route Prefetching

Code Splitting


# Security Requirements

Firebase Authentication

Role Based Access Control

Firestore Security Rules

Rate Limiting

Input Validation

Spam Protection

HTTPS Only

reCAPTCHA


# Analytics Requirements

Track:

Page Views

Gallery Views

Design Views

Searches

Favorites

Booking Starts

Booking Submissions

WhatsApp Clicks

Review Submissions


# Future Readiness

Database must already support:

artist_id

city_id

locale

even if MVP uses only one artist.


# AI Agent Implementation Rules

NON-NEGOTIABLE

Never hardcode categories.

Never hardcode homepage sections.

Never hardcode menus.

Never hardcode packages.

Never hardcode forms.

Never hardcode SEO metadata.

Never hardcode theme values.

All content must originate from Firestore.

All uploads must use Firebase Storage.

All business logic must be reusable and separated from UI.

All pages must be CMS-driven.

Code must be production-ready, strongly typed, and scalable.


# Acceptance Criteria

The platform must allow administrators to create, edit, delete, reorder, publish, unpublish and manage every visible aspect of the website without code modifications, redeployment or developer intervention.

The system must remain compatible with future Flutter mobile applications using the same Firebase backend and data model.
