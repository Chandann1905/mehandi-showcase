# 06_Admin_Panel_Spec.md

# Mehndi Showcase & Booking Platform

## Admin Panel Specification

Version: 1.0

Type: Dynamic CMS Administration System

Architecture: Firebase + Next.js


# 1. Overview

The Admin Panel is the control center of the platform.

Administrators must be able to manage every visible part of the website without modifying code or redeploying the application.

All modules must be role-based and CMS-driven.


# 2. Design Principles

## Principle 1

No Hardcoded Content

Everything must be editable.


## Principle 2

Role Based Access

Permissions control visibility and actions.


## Principle 3

Fast Operations

Common tasks should require minimal clicks.


## Principle 4

Mobile Friendly

Admin panel must work on mobile and tablet.


# 3. Layout Structure

## Desktop Layout

Sidebar
|
|-- Dashboard
|-- Designs
|-- Categories
|-- Collections
|-- Packages
|-- Bookings
|-- Reviews
|-- Media
|-- Pages
|-- Menus
|-- Homepage
|-- Forms
|-- SEO
|-- Theme
|-- Settings
|-- Audit Logs


## Mobile Layout

Drawer Menu

+
Top Header


# 4. Dashboard Module

Purpose:

Quick overview of business activity.


## Dashboard Widgets

### Designs

Total Designs

Active Designs

Featured Designs


### Bookings

Total Bookings

New Bookings

Confirmed Bookings

Completed Bookings


### Reviews

Total Reviews

Pending Reviews

Featured Reviews


### Performance

WhatsApp Clicks

Conversion Rate

Popular Designs


# 5. Design Management Module

## Features

Create Design

Edit Design

Delete Design

Duplicate Design

Publish

Unpublish


## Design Fields

Title

Slug

Description

Category

Collections

Tags

Difficulty

Estimated Time

Price Range

Featured Status


## Media

Multiple Images

Reorder Images

Alt Text


## Bulk Actions

Publish

Unpublish

Delete

Category Change


# 6. Category Management Module

## Features

Create Category

Edit Category

Delete Category

Reorder Categories


## Fields

Name

Slug

Description

Icon

Cover Image


## Controls

Active

Inactive


# 7. Collection Management Module

## Features

Create Collection

Edit Collection

Delete Collection

Examples:

Trending

Wedding Season

Editor Choice


# 8. Package Management Module

## Features

Create Package

Edit Package

Delete Package

Reorder Packages


## Fields

Package Name

Description

Price

Features

Featured Status


# 9. Booking Management Module

Purpose:

Lead management system.


## Booking Table

Columns:

Booking Number

Customer Name

Phone

Event Date

Package

Status

Created Date


## Booking Detail

Fields:

Customer Information

Design Reference

Notes

Attachments


## Status Workflow

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


## Actions

Update Status

Add Notes

Export


# 10. Booking Notes Module

Internal communication only.

Fields:

Note

Author

Timestamp

Visible only to admins.


# 11. Reviews Module

## Review Queue

Statuses:

Pending

Approved

Rejected


## Actions

Approve

Reject

Feature

Delete


## Review Fields

Customer Name

Rating

Review

Images


# 12. Media Library Module

Purpose:

Central media management.


## Features

Upload Files

Search Files

Replace Files

Delete Files

Copy URLs


## Supported Types

Images:

JPG

PNG

WEBP


## Metadata

Filename

Size

Upload Date

Uploaded By


# 13. Pages Module

Dynamic CMS Pages.


## Features

Create Page

Edit Page

Delete Page

Publish

Unpublish


## Fields

Title

Slug

Content

SEO Data


# 14. Menu Builder Module

Dynamic Navigation System.


## Features

Add Menu Item

Edit Item

Delete Item

Reorder Items


## Supported Targets

Internal Page

Category

Collection

External URL


# 15. Homepage Builder Module

Purpose:

Control homepage layout.


## Section Types

Hero

Categories

Featured Designs

Collections

Packages

Reviews

FAQ

CTA Banner

Contact


## Actions

Add Section

Remove Section

Reorder Section

Configure Section


# 16. Form Builder Module

Purpose:

Dynamic forms.


## Field Types

Text

Textarea

Number

Email

Date

Select

Checkbox

File Upload


## Actions

Add Field

Remove Field

Reorder Field


# 17. Form Submission Module

Displays:

Submitted Forms

Filters

Export


# 18. SEO Module

Purpose:

Manage metadata.


## Fields

Meta Title

Meta Description

Canonical URL

OG Image


## Supported Entities

Home

Pages

Designs

Categories

Collections

Packages


# 19. Theme Builder Module

Purpose:

Visual customization.


## Color Controls

Primary Color

Secondary Color

Success Color

Error Color


## Typography Controls

Heading Font

Body Font


## Branding

Logo

Favicon


## Layout Tokens

Border Radius

Shadow Style


# 20. Settings Module

## General Settings

Site Name

Contact Email

Contact Phone

WhatsApp Number


## Social Settings

Instagram

Facebook

YouTube


## Location Settings

Address

Google Maps Link


# 21. Audit Logs Module

Purpose:

Track administrative activity.


## Events

Create

Update

Delete

Publish

Login

Logout


## Log Fields

User

Module

Action

Timestamp

IP Address


# 22. Permissions Matrix

## SUPER_ADMIN

Full Access


## CONTENT_MANAGER

Access:

Designs

Categories

Collections

Pages

Reviews

Homepage

No access:

Settings

Users


## BOOKING_MANAGER

Access:

Bookings

Notes

No access:

Content Modules


# 23. Search Requirements

Global Admin Search

Search:

Designs

Bookings

Reviews

Pages


# 24. Export Requirements

Supported Formats:

CSV

Excel

Modules:

Bookings

Reviews

Form Submissions


# 25. Activity Tracking

Track:

Design Created

Design Updated

Booking Updated

Review Approved

Settings Modified


# 26. Admin Panel Acceptance Criteria

Administrators must be able to:

Manage all content

Manage bookings

Manage reviews

Manage menus

Manage forms

Manage SEO

Manage theme

Manage homepage layout

without code changes, database migrations, or application redeployment.

The Admin Panel must function as a complete CMS for the entire platform.
