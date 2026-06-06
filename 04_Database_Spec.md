# 04_Database_Spec.md

# Mehndi Showcase & Booking Platform

## Database Specification

Version: 1.0

Database: Cloud Firestore

Architecture: Firebase Only


# 1. Database Design Principles

## Principle 1

CMS First

All content must originate from Firestore.

No hardcoded content.


## Principle 2

Future Ready

Database must support:

Multiple Artists

Multiple Cities

Multiple Languages

Mobile Apps

Marketplace Expansion

without redesign.


## Principle 3

Scalable Collections

Avoid deeply nested documents.

Prefer flat collections with references.


## Principle 4

Auditability

All administrative actions must be trackable.


## Principle 5

Soft Deletes

Data should not be permanently deleted by default.


# 2. Common Fields

Every primary collection must include:

{
  "id": "",
  "active": true,
  "deleted": false,
  "created_at": "",
  "updated_at": "",
  "created_by": "",
  "updated_by": ""
}


# 3. Collection Overview

admins
roles
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


# 4. Roles Collection

## Collection

roles

Schema:

{
  "name": "SUPER_ADMIN",
  "permissions": []
}

Roles:

SUPER_ADMIN
CONTENT_MANAGER
BOOKING_MANAGER


# 5. Admins Collection

admins

Schema:

{
  "firebase_uid": "",
  "name": "",
  "email": "",
  "role_id": "",
  "active": true
}


# 6. Artists Collection

Future Ready

artists

Schema:

{
  "name": "",
  "slug": "",
  "bio": "",
  "phone": "",
  "email": "",
  "profile_image": "",
  "active": true
}

MVP:

Single Artist

Future:

Multi Artist


# 7. Cities Collection

cities

Schema:

{
  "name": "",
  "slug": "",
  "state": "",
  "country": "",
  "active": true
}


# 8. Categories Collection

categories

Schema:

{
  "name": "",
  "slug": "",
  "description": "",
  "image_url": "",
  "icon": "",
  "sort_order": 1,
  "active": true
}

Examples:

Bridal
Arabic
Pakistani
Dubai Style
Modern
Festival


# 9. Collections Collection

collections

Schema:

{
  "title": "",
  "slug": "",
  "description": "",
  "image_url": "",
  "sort_order": 1,
  "active": true
}

Examples:

Trending
Editor's Choice
Wedding Season


# 10. Designs Collection

designs

Schema:

{
  "artist_id": "",
  "city_id": "",
  "category_id": "",

  "title": "",
  "slug": "",

  "description": "",

  "tags": [],

  "featured": false,

  "difficulty": "",

  "estimated_time": "",

  "price_range": "",

  "favorite_count": 0,

  "view_count": 0,

  "active": true
}


# 11. Design Images Collection

design_images

Schema:

{
  "design_id": "",
  "image_url": "",
  "alt_text": "",
  "sort_order": 1
}


# 12. Packages Collection

packages

Schema:

{
  "artist_id": "",

  "title": "",

  "description": "",

  "price": "",

  "features": [],

  "featured": false,

  "sort_order": 1,

  "active": true
}


# 13. Bookings Collection

bookings

Schema:

{
  "booking_number": "",

  "artist_id": "",

  "customer_name": "",

  "mobile": "",

  "event_date": "",

  "location": "",

  "package_id": "",

  "design_id": "",

  "notes": "",

  "attachment": "",

  "status": "new"
}

Statuses:

new
contacted
confirmed
completed
cancelled


# 14. Booking Notes Collection

booking_notes

Schema:

{
  "booking_id": "",
  "admin_id": "",
  "note": ""
}


# 15. Reviews Collection

reviews

Schema:

{
  "customer_name": "",
  "rating": 5,
  "review_text": "",
  "images": [],
  "verified": false,
  "featured": false,
  "status": "pending"
}

Statuses:

pending
approved
rejected


# 16. Favorites Collection

favorites

Schema:

{
  "visitor_id": "",
  "design_id": ""
}


# 17. Recent Views Collection

recent_views

Schema:

{
  "visitor_id": "",
  "design_id": "",
  "viewed_at": ""
}

Retention:

30 Days


# 18. Pages Collection

pages

Schema:

{
  "title": "",
  "slug": "",
  "content": "",

  "published": true
}

Examples:

About
FAQ
Privacy Policy
Terms


# 19. Homepage Sections Collection

homepage_sections

Schema:

{
  "section_type": "",
  "enabled": true,
  "sort_order": 1,

  "config": {}
}

Supported Types:

hero
categories
featured_designs
collections
packages
reviews
faq
cta
contact


# 20. Menus Collection

menus

Schema:

{
  "title": "",
  "url": "",
  "sort_order": 1,
  "visible": true
}


# 21. Forms Collection

forms

Schema:

{
  "title": "",
  "slug": "",
  "fields": [],
  "active": true
}


# 22. Form Submissions

form_submissions

Schema:

{
  "form_id": "",
  "data": {},
  "submitted_at": ""
}


# 23. Media Collection

media

Schema:

{
  "file_name": "",
  "file_url": "",
  "folder": "",
  "size": 0,
  "mime_type": ""
}


# 24. SEO Collection

seo

Schema:

{
  "entity_type": "",
  "entity_id": "",

  "meta_title": "",

  "meta_description": "",

  "canonical_url": "",

  "og_image": ""
}

Entity Types:

home
page
design
package
category
collection


# 25. Theme Collection

theme

Schema:

{
  "primary_color": "",
  "secondary_color": "",

  "heading_font": "",
  "body_font": "",

  "border_radius": "",

  "logo": "",

  "favicon": ""
}


# 26. Settings Collection

settings

Schema:

{
  "site_name": "",
  "phone": "",
  "email": "",
  "whatsapp": "",

  "address": "",

  "instagram": "",

  "facebook": "",

  "youtube": ""
}


# 27. Audit Logs Collection

audit_logs

Schema:

{
  "admin_id": "",

  "module": "",

  "action": "",

  "old_data": {},

  "new_data": {},

  "ip_address": "",

  "created_at": ""
}

Actions:

create
update
delete
publish
unpublish
login
logout


# 28. Firestore Index Strategy

Required Indexes:

Designs

category_id + active

featured + active

created_at + active

view_count + active

Bookings

status + created_at

event_date + status

Reviews

status + featured

Pages

slug + published


# 29. Query Patterns

Homepage:

Featured Designs
Featured Categories
Featured Reviews

Gallery:

Category Filter
Tag Filter
Search

Booking Dashboard:

New Bookings
Upcoming Events


# 30. Soft Delete Strategy

Never permanently delete content.

Instead:

{
  "deleted": true
}

Excluded from frontend queries.


# 31. Localization Readiness

Add:

{
  "locale": "en"
}

to content collections.

Future Support:

English
Hindi
Arabic


# 32. Multi Artist Readiness

All major collections should support:

{
  "artist_id": ""
}

Future:

Artist Dashboard
Marketplace
Franchise Network


# 33. Data Retention

Bookings:

Permanent

Reviews:

Permanent

Recent Views:

30 Days

Audit Logs:

2 Years


# 34. Database Acceptance Criteria

The database must support:

Dynamic CMS

Dynamic Menus

Dynamic Pages

Dynamic Forms

Dynamic SEO

Dynamic Theme Management

Multi Artist Expansion

Mobile App Expansion

Marketplace Expansion

without requiring collection redesign.
