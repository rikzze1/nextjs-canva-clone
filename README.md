# Next.js Canva Clone

A powerful web-based design editor built with Next.js and Fabric.js, inspired by Canva. Create, edit, and export graphics with an intuitive drag-and-drop interface, complete with AI features and subscription management.

## 📸 Preview

### Dashboard
![Dashboard Preview](./public/preview/dashboard.png)

### Canvas Editor
![Canvas Editor Preview](./public/preview/canvas.png)

## 🚀 Features

### Core Editor
- **Interactive Canvas** - Fabric.js-powered design workspace with zoom, pan, and precise controls
- **Rich Text Editor** - Advanced text tools with custom fonts, weights, styles, and formatting
- **Shape Library** - Comprehensive collection of shapes (circles, rectangles, triangles, diamonds, stars)
- **Color Management** - Fill colors, stroke colors, gradients, and opacity controls
- **Layer Management** - Full layer control with bring forward/send backward functionality
- **Export Options** - Save designs as PNG, JPEG, SVG, or JSON formats
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

### Authentication & User Management
- **OAuth Integration** - Secure login with GitHub and Google providers
- **Session Management** - Persistent user sessions with NextAuth.js
- **User Profiles** - Personalized user accounts and preferences
- **Protected Routes** - Secure access to editor and premium features

### Subscription System
- **Stripe Integration** - Complete payment processing with Stripe Checkout
- **Subscription Management** - Monthly/yearly billing with automatic renewals
- **Tiered Access** - Free tier with limitations, premium tier with full access
- **Webhook Handling** - Real-time subscription status updates
- **Usage Tracking** - Monitor project limits and feature usage

### AI-Powered Features
- **Background Removal** - AI-powered background removal using Replicate API
- **Image Generation** - Create custom images with AI assistance
- **Smart Cropping** - Intelligent image cropping and optimization
- **Content Enhancement** - AI-driven design suggestions

### Project Management
- **Project Persistence** - Save and load projects with PostgreSQL database
- **Auto-save** - Automatic project saving to prevent data loss
- **Project Templates** - Pre-designed templates for quick starts
- **Version History** - Track changes and revert to previous versions
- **Project Sharing** - Share designs with team members

### File Management
- **Image Upload** - Drag-and-drop image uploads with UploadThing
- **Unsplash Integration** - Access millions of stock photos
- **File Optimization** - Automatic image compression and optimization
- **Multiple Formats** - Support for PNG, JPEG, SVG, and more

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Canvas Library:** Fabric.js
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI / shadcn/ui
- **State Management:** Zustand + React Query (TanStack Query)
- **TypeScript:** Full type safety throughout

### Backend & Database
- **API Framework:** Hono.js for fast, lightweight APIs
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** NextAuth.js with multiple providers
- **File Storage:** UploadThing for secure file uploads

### External Services
- **Payment Processing:** Stripe for subscriptions and payments
- **AI Services:** Replicate for background removal and image generation
- **Image Library:** Unsplash API for stock photos
- **Deployment:** Vercel for seamless hosting

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   └── [[...route]]/  # Hono.js API handlers
│   │       ├── ai.ts      # AI service endpoints
│   │       ├── images.ts  # Image management
│   │       ├── projects.ts # Project CRUD
│   │       ├── subscriptions.ts # Stripe integration
│   │       └── users.ts   # User management
│   ├── editor/[projectid]/ # Dynamic editor page
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── Modal/            # Modal components
│   └── Logo/             # Branding components
├── db/                   # Database configuration
│   ├── schema.ts         # Drizzle ORM schema
│   ├── drizzle.ts        # Database connection
│   └── drizzle-safe.ts   # Safe database operations
├── lib/                  # Utility libraries
│   ├── stripe.ts         # Stripe configuration
│   ├── hono.ts          # API client setup
│   └── utils.ts         # Common utilities
├── providers/            # React context providers
│   ├── Providers.tsx     # Main provider wrapper
│   └── QueryProvider/    # React Query setup
├── features/             # Feature-based modules
│   ├── Editor/           # Canvas editor
│   │   ├── components/   # Editor-specific components
│   │   │   ├── NavBar/   # Top navigation
│   │   │   ├── SideBar/  # Tool sidebars
│   │   │   ├── ToolBar/  # Bottom toolbar
│   │   │   └── Footer/   # Status footer
│   │   ├── hooks/        # Custom React hooks
│   │   ├── constants.ts  # Editor constants
│   │   ├── types.ts      # TypeScript definitions
│   │   └── utils.ts      # Editor utilities
│   └── Subscriptions/    # Payment system
│       ├── components/   # Subscription UI
│       │   └── SubscriptionModal.tsx
│       ├── services/     # API mutations
│       │   └── mutations/
│       └── store/        # Zustand stores
└── auth.ts              # Authentication configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL database
- Stripe account
- GitHub/Google OAuth apps
- Replicate API key (for AI features)
- Unsplash API key
- UploadThing account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nextjs-canva-clone.git
   cd nextjs-canva-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   AUTH_URL=http://localhost:3000
   AUTH_SECRET="your-secure-auth-secret"

   # Database
   DATABASE_URL="postgresql://username:password@host:port/database"

   # Authentication Providers
   AUTH_GITHUB_ID="your-github-oauth-client-id"
   AUTH_GITHUB_SECRET="your-github-oauth-client-secret"
   AUTH_GOOGLE_ID="your-google-oauth-client-id"
   AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"

   # Payment Processing
   STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
   STRIPE_PRICE_ID="price_your-stripe-price-id"
   STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

   # External APIs
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY="your-unsplash-access-key"
   UPLOADTHING_TOKEN="your-uploadthing-token"
   REPLICATE_TOKEN="your-replicate-api-token"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   # or
   bun run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Key Features Implementation

### Authentication Flow
- NextAuth.js with JWT strategy
- Multiple OAuth providers (GitHub, Google)
- Session persistence and refresh
- Protected API routes with middleware

### Canvas Management
- Fabric.js integration with custom event handlers
- Real-time object manipulation and selection
- Responsive canvas sizing and zoom controls
- Custom hooks for canvas state management

### Database Architecture
- PostgreSQL with Drizzle ORM for type safety
- User, project, and subscription tables
- Optimistic updates with React Query
- Connection pooling for performance

### Payment Processing
- Stripe Checkout for subscription management
- Webhook handlers for real-time status updates
- Usage-based billing and feature gating
- Secure payment processing with SCA compliance

### AI Integration
- Replicate API for background removal
- Async job processing with status polling
- Error handling and retry mechanisms
- Usage tracking for billing purposes

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Configure PostgreSQL database (Neon, Supabase, etc.)
4. Set up Stripe webhooks with production URL
5. Deploy with automatic CI/CD

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Setup
- Configure production database
- Update OAuth redirect URLs
- Set up Stripe webhook endpoints
- Configure CDN for static assets

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Database
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio
npm run db:migrate   # Run migrations

# Testing
npm run test         # Run test suite
npm run test:watch   # Watch mode testing
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signin` - User authentication
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Subscriptions
- `POST /api/subscriptions/checkout` - Create Stripe checkout
- `POST /api/subscriptions/webhook` - Handle Stripe webhooks
- `GET /api/subscriptions/status` - Get subscription status

### AI Services
- `POST /api/ai/remove-background` - Remove image background
- `POST /api/ai/generate-image` - Generate AI image
- `GET /api/ai/status/:jobId` - Check processing status

### Images
- `POST /api/images/upload` - Upload image file
- `GET /api/images/unsplash` - Search Unsplash photos
- `GET /api/images/:id` - Get image details

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

### Code Standards
- TypeScript for all new code
- ESLint + Prettier for formatting
- Conventional commits for messages
- Test coverage for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Next.js, Fabric.js, and cutting-edge web technologies**

*Last updated: June 2025*