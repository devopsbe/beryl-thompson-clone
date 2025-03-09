# Beryl Thompson Website Upgrade Project Plan

## Overview
This document outlines the plan to upgrade the Beryl Thompson "Begin From Within" website using Next.js 14 and Tailwind CSS. The upgrade will include new features such as a subscription system for classes, an appointment system, and a serialized book release platform.

## Technology Stack
- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context API and/or Redux
- **Backend**: Node.js with Express.js (already set up in backend directory)
- **Database**: MongoDB (for user data, appointments, subscriptions)
- **Authentication**: NextAuth.js
- **Payment Processing**: Stripe
- **Content Management**: Headless CMS (optional, e.g., Sanity.io or Contentful)
- **Hosting**: Vercel (for Next.js frontend)
- **API Hosting**: Vercel Serverless Functions or separate Node.js hosting

## Migration Strategy

### Phase 1: Project Setup & Content Migration (Week 1)

1. **Initial Next.js Setup**
   - Initialize Next.js 14 project with App Router
   - Install and configure Tailwind CSS
   - Set up project directory structure
   - Configure ESLint and Prettier

2. **Content Migration**
   - Convert existing HTML pages to Next.js components
   - Migrate CSS to Tailwind utility classes
   - Organize assets in the public directory
   - Ensure responsive design is maintained

3. **Backend Integration**
   - Connect existing backend routes
   - Set up API layer in Next.js
   - Create environment variables for configuration

### Phase 2: Core Feature Implementation (Weeks 2-4)

1. **Subscription System for Classes**
   - Build subscription management pages
   - Implement pricing: $20/month or $200/year options
   - Integrate Stripe for payment processing
   - Create user dashboard for subscription management
   - Implement integration with Teachable/Thinkific

2. **Appointment System**
   - Design and implement appointment request form
   - Build admin approval dashboard for Beryl
   - Set up email notification system
   - Implement free 15-minute intro Skype appointments
   - Create prepaid session purchase functionality

3. **Serialized Book Platform**
   - Design book landing page
   - Create chapter release system
   - Implement reading progress tracking
   - Set up email notifications for new chapter releases
   - Build admin interface for content management

### Phase 3: Polish & Launch (Week 5-6)

1. **Testing & QA**
   - Cross-browser testing
   - Mobile responsiveness testing
   - Payment flow testing
   - Security audit
   - Performance optimization

2. **SEO & Analytics**
   - Implement proper SEO metadata
   - Set up Google Analytics
   - Create sitemap
   - Implement Open Graph tags

3. **Launch Preparation**
   - Final user testing
   - Documentation
   - Backup strategy
   - Launch checklist

## Detailed Feature Specifications

### 1. Subscription System
- **User Flow:**
  1. User views class offerings
  2. Selects monthly ($20) or annual ($200) plan
  3. Creates account or logs in
  4. Completes payment through Stripe
  5. Gains access to class platform
  
- **Admin Flow:**
  1. Manage subscribers
  2. View payment history
  3. Add/edit class content
  4. Send notifications to subscribers

### 2. Appointment System
- **User Flow:**
  1. User submits inquiry form
  2. Receives confirmation email
  3. If approved, gets email with Skype appointment details
  4. After intro, can purchase prepaid sessions

- **Admin Flow:**
  1. Receive notification of new inquiries
  2. Approve/deny requests through dashboard
  3. Schedule appointments
  4. Track completed sessions

### 3. Serialized Book Release
- **User Flow:**
  1. Browse available chapters
  2. Read content online
  3. Track reading progress
  4. Receive notifications for new releases

- **Admin Flow:**
  1. Upload new chapters
  2. Schedule release dates
  3. Edit existing content
  4. View reader statistics

## Project Directory Structure
```
beryl-thompson-clone/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
│   ├── services/           # Services page
│   ├── contact/            # Contact page
│   ├── classes/            # Classes & subscription
│   ├── appointments/       # Appointment system
│   ├── book/               # Serialized book
│   └── api/                # API routes
├── components/             # Reusable components
│   ├── ui/                 # UI components
│   ├── layout/             # Layout components
│   ├── forms/              # Form components
│   └── features/           # Feature-specific components
├── lib/                    # Utility functions
├── public/                 # Static assets
│   ├── images/             # Images
│   ├── fonts/              # Fonts
│   └── favicon.ico         # Favicon
├── styles/                 # Global styles
├── backend/                # Backend API
│   ├── models/             # Database models
│   └── routes/             # API routes
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Timeline

### Week 1
- Set up Next.js project
- Migrate existing content
- Implement base styling with Tailwind CSS

### Week 2
- Implement user authentication
- Begin subscription system
- Create appointment inquiry form

### Week 3
- Complete subscription payment integration
- Build admin dashboard
- Start book platform development

### Week 4
- Finalize appointment system
- Complete book platform
- Integrate email notifications

### Week 5
- Testing and bug fixes
- SEO optimization
- Performance improvements

### Week 6
- Final QA
- Documentation
- Launch

## Tracking Progress
We will track progress using GitHub issues and project boards. Each feature will be broken down into smaller tasks and assigned milestone deadlines.

## Next Steps
1. Initialize Next.js project with Tailwind CSS
2. Set up development environment
3. Begin content migration
4. Create initial components for new features 