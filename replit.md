# Studio LeFlow - Music Production Studio Website

## Overview
Studio LeFlow is a professional music production studio in Belgrade, Serbia, offering comprehensive music production services. The project aims to establish a dynamic online presence to showcase services, engage users through project giveaways, and provide robust content management for administrators. The platform supports recording, mixing/mastering, instrumental production, and complete song creation, with the ambition to expand its market reach and user base through an interactive and modern website.

## User Preferences
I want iterative development. Ask before making major changes. I prefer detailed explanations.

## System Architecture

### UI/UX Decisions
The website features a modern, responsive design using Tailwind CSS and shadcn/ui components, enhanced by Framer Motion for animations. It incorporates the Studio LeFlow transparent emblem logo with automatic color inversion for dark/light themes. SEO optimization is a key focus, including dynamic meta tags, Open Graph tags, structured data, sitemap, robots.txt, and geo-tags. The UI is primarily in Serbian.

### Technical Implementations
**Frontend:** React 18 with TypeScript, Vite, Tailwind CSS + shadcn/ui, Framer Motion, Wouter for routing, TanStack Query for server state management, React Hook Form + Zod for form validation.
**Backend:** Express.js with TypeScript, Drizzle ORM (PostgreSQL), Passport.js for authentication, Express Session.

### Feature Specifications
- **CMS Content Management**: Inline editing for text, image uploads, and team member management, activated via an "Izmeni Sajt" toggle.
- **User Authentication**: Email/password authentication with verification, including 2FA for admin login during maintenance.
- **Real-Time Messaging System**: Full-featured messaging with real-time updates, admin oversight, and legal compliance (Terms of Service and Privacy notices on auth pages).
- **Project Giveaways**: Monthly project uploads, a voting system, and admin approval with audio preview.
- **Portfolio (Projekti Page)**: Showcase studio work with YouTube embeds, managed by admins.
- **Contact Form**: Direct email notifications.
- **File Uploads**: MP3 files for projects, images for CMS.
- **Admin Panel**: Comprehensive management for users, project approvals, portfolio, CMS editing, newsletter subscribers, and maintenance mode. Includes a "Poruke" tab for conversation oversight and audit logs.
- **Newsletter System**: Double opt-in email confirmation with admin management, statistics, and campaign sending capabilities using a rich text editor.
- **Password Management**: Secure forgot/reset password flows with email verification codes.
- **Maintenance Mode**: Site-wide control for administrators, allowing admin access while the public sees a maintenance page.
- **Content Protection**: Three-layer protection on all images and logos to prevent drag/drop, text selection, and right-click context menu.
- **Google Search SEO & Favicon Optimization**: Comprehensive SEO improvements including multi-size favicons, optimized meta descriptions, titles, and structured data with bidirectional keywords.

### System Design Choices
- **Database**: PostgreSQL managed by Replit, utilizing Drizzle ORM for schema management across various entities (users, projects, votes, comments, CMS content, settings, newsletter subscribers, messaging data).
- **Performance**: Optimized for Core Web Vitals (LCP) through lazy loading, prioritized image fetching, async font loading, server compression, and Vite build optimizations.
- **Language**: All UI and content are primarily in Serbian.
- **Security**: Implements case-insensitive email/username lookups, banned user authorization, robust password hashing (Node.js scrypt), and security measures for the messaging system (verified email required, admin audit logging).

## External Dependencies
- **PostgreSQL**: Replit managed database for all persistent data.
- **Resend**: Email service for user verification, password resets, contact form notifications, and newsletter confirmations.
- **UploadThing**: File upload service for MP3 files (max 16MB per file).