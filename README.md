# Next.js Canva Clone

A web-based design editor built with Next.js and Fabric.js. Create, edit, and export graphics with drag-and-drop interface, AI features, and subscription management.

## Features

- Interactive canvas with Fabric.js
- Text editor with custom fonts and formatting
- Shape library and color management
- Layer control and export options (PNG, JPEG, SVG, JSON)
- OAuth authentication (GitHub, Google)
- Stripe subscription system
- AI-powered background removal and image generation
- Project persistence with PostgreSQL
- Image uploads via UploadThing and Unsplash integration

## Tech Stack

- **Frontend:** Next.js 14, Fabric.js, Tailwind CSS, shadcn/ui, Zustand, React Query
- **Backend:** Hono.js, PostgreSQL, Drizzle ORM, NextAuth.js
- **Services:** Stripe, Replicate AI, Unsplash, UploadThing
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL database
- Stripe account
- GitHub/Google OAuth apps
- API keys for Replicate, Unsplash, UploadThing

### Installation

1. Clone and install:
   ```bash
   git clone https://github.com/your-username/nextjs-canva-clone.git
   cd nextjs-canva-clone
   npm install
   ```

2. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   AUTH_URL=http://localhost:3000
   AUTH_SECRET="your-auth-secret"
   DATABASE_URL="postgresql://..."
   AUTH_GITHUB_ID="your-github-id"
   AUTH_GITHUB_SECRET="your-github-secret"
   STRIPE_SECRET_KEY="sk_test_..."
   REPLICATE_TOKEN="your-replicate-token"
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY="your-unsplash-key"
   UPLOADTHING_TOKEN="your-uploadthing-token"
   ```

3. Set up database:
   ```bash
   npm run db:push
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio
```

## License

MIT License - see [LICENSE](LICENSE) file for details.
