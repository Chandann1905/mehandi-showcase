# 05_App_Flow.md

# Mehndi Showcase & Booking Platform

## Application Flow Specification

Version: 1.0

Architecture: Mobile First

Flow Type: User + Admin + System Flows


# 1. Flow Design Principles

## Principle 1

Minimum Friction

Users should reach booking within 3 taps.


## Principle 2

Conversion First

Every flow should lead toward:

Design Discovery

WhatsApp Contact

Booking Submission


## Principle 3

Mobile First

All flows designed for mobile screens first.


# 2. Visitor Journey

## Entry Points

Users may enter from:

Google Search

Google Images

Instagram

WhatsApp Share

Direct URL

Referral Links


# 3. Homepage Flow

Homepage

↓

Browse Categories

↓

View Designs

↓

Design Detail

↓

Book Now

Alternative:

Homepage

↓

WhatsApp CTA

↓

WhatsApp Chat


# 4. Category Flow

Homepage

↓

Category Card

↓

Category Designs

↓

Design Detail

↓

Book Now


# 5. Gallery Flow

Homepage

↓

Gallery

↓

Filter/Search

↓

Design Detail

↓

Booking


# 6. Search Flow

User:

Tap Search

↓

Type Query

↓

Suggestions

↓

Results

↓

Design Detail


# 7. Design Detail Flow

Design Detail

↓

View Images

↓

View Related Designs

↓

Book Now

Alternative:

Design Detail

↓

WhatsApp Button

↓

WhatsApp Opened


# 8. Favorite Flow

Design Detail

↓

Tap Favorite

↓

Saved

↓

Favorites Updated

No login required.

Local Storage Based.


# 9. Recently Viewed Flow

Design Viewed

↓

Recent View Stored

↓

Recent List Updated

Automatic Process.


# 10. Booking Flow

## Primary Flow

Design Selected

↓

Book Now

↓

Booking Form

↓

Submit

↓

Validation

↓

Booking Created

↓

Success Screen

↓

WhatsApp Redirect


# 11. Booking Form Flow

Required:

Name

Phone

Event Date

Optional:

Location

Notes

Attachment


# 12. Booking Validation Flow

Submit

↓

Validate

↓

Success

or

Submit

↓

Validation Error

↓

Show Errors

↓

Retry


# 13. Booking Success Flow

Booking Stored

↓

Booking Number Generated

↓

Success Message

↓

Open WhatsApp

Actions:

Open WhatsApp

Browse More Designs


# 14. WhatsApp Flow

Booking Success

↓

Generate Message

↓

Open WhatsApp

↓

Artist Conversation

Fallback:

WhatsApp Unavailable

↓

Show Phone Number

↓

Manual Contact


# 15. Review Submission Flow

Reviews Page

↓

Submit Review

↓

Fill Form

↓

Submit

↓

Pending Review

↓

Admin Approval


# 16. Contact Flow

Contact Page

↓

WhatsApp

OR

Phone

OR

Social Media

Maximum:

2 Taps


# 17. Dynamic Page Flow

Page

↓

Read Content

↓

CTA

↓

Contact Artist

Examples:

About

FAQ

Terms


# 18. Homepage Builder Flow

Admin:

Dashboard

↓

Homepage Builder

↓

Add Section

↓

Configure

↓

Publish


# 19. Admin Login Flow

Login Screen

↓

Firebase Auth

↓

Role Validation

↓

Dashboard

Failure:

Invalid Credentials

↓

Error Message

↓

Retry


# 20. Dashboard Flow

Dashboard

↓

View Metrics

↓

Navigate Module

Metrics:

Total Designs

Bookings

Reviews

Conversion Rate


# 21. Design Management Flow

Dashboard

↓

Designs

↓

Create Design

↓

Upload Images

↓

Assign Category

↓

Publish

Edit Flow:

Design

↓

Edit

↓

Save

↓

Published


# 22. Category Management Flow

Dashboard

↓

Categories

↓

Create Category

↓

Save

Edit:

Select Category

↓

Update

↓

Save


# 23. Collection Management Flow

Dashboard

↓

Collections

↓

Create Collection

↓

Save


# 24. Package Management Flow

Dashboard

↓

Packages

↓

Create Package

↓

Save


# 25. Booking Management Flow

Dashboard

↓

Bookings

↓

View Booking

↓

Update Status

↓

Save

Status Flow:

NEW

↓

CONTACTED

↓

CONFIRMED

↓

COMPLETED

Alternative:

NEW

↓

CANCELLED


# 26. Booking Notes Flow

Booking

↓

Add Note

↓

Save Note


# 27. Review Moderation Flow

Reviews

↓

Pending

↓

Approve

↓

Published

Alternative:

Reject

↓

Rejected


# 28. Media Upload Flow

Upload

↓

Validate

↓

Compress

↓

Convert WebP

↓

Store

↓

Save Metadata


# 29. Page Builder Flow

Pages

↓

Create Page

↓

Content

↓

SEO

↓

Publish


# 30. Menu Builder Flow

Menus

↓

Add Item

↓

Reorder

↓

Save


# 31. Form Builder Flow

Forms

↓

Create Form

↓

Add Fields

↓

Save

↓

Publish


# 32. Theme Builder Flow

Theme

↓

Update Colors

↓

Update Fonts

↓

Save

↓

Apply

Live Preview Recommended.


# 33. SEO Flow

SEO

↓

Meta Title

↓

Meta Description

↓

Save

Applies Instantly.


# 34. Audit Log Flow

Admin Action

↓

Capture Event

↓

Store Audit Record

Events:

Create

Update

Delete

Publish

Login


# 35. Error Flows

## Gallery Error

Load Failure

↓

Placeholder

↓

Retry


## Booking Error

Submit

↓

Failure

↓

Preserve Form

↓

Retry


## Image Error

Broken Image

↓

Fallback Image


## WhatsApp Error

WhatsApp Failed

↓

Show Number

↓

Manual Contact


# 36. Empty States

Gallery:

No Designs Available

Reviews:

No Reviews Yet

Bookings:

No Bookings Found

Search:

No Results Found


# 37. Analytics Event Flow

Visitor:

View Design

↓

Analytics Event

Booking:

Start Booking

↓

Submit Booking

↓

WhatsApp Click

Admin:

Create Design

↓

Analytics Event


# 38. Notification Flow

Future Ready

Booking Created

↓

Admin Notification

↓

Booking Dashboard

Future:

Email

Push Notification

SMS


# 39. Mobile Navigation Flow

Home

Designs

Packages

Reviews

Book

Always Visible.

Bottom Navigation.


# 40. Flow Acceptance Criteria

Users must be able to:

Find a design within 10 seconds

Reach booking form within 3 taps

Open WhatsApp within 1 tap

Submit booking within 60 seconds

Browse without account creation

Admins must be able to:

Manage content

Manage bookings

Manage reviews

Manage SEO

Manage theme

without code changes or deployment.
