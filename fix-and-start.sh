#!/bin/bash

echo "🔧 Comprehensive Fix for WSL Next.js Development Server"
echo "======================================================"
echo ""

# Step 1: Kill any existing processes
echo "1️⃣ Cleaning up existing processes..."
pkill -f "next" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true
if lsof -i :3000 > /dev/null 2>&1; then
    kill -9 $(lsof -t -i:3000) 2>/dev/null || true
fi
sleep 2

# Step 2: Clear caches
echo "2️⃣ Clearing caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Step 3: Check for TypeScript errors
echo "3️⃣ Checking TypeScript..."
echo "Running type check..."
bunx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "⚠️  TypeScript errors found. Continuing anyway..."
else
    echo "✅ No TypeScript errors"
fi

# Step 4: Check environment
echo "4️⃣ Environment check..."
if [ ! -f ".env" ]; then
    echo "❌ .env file not found"
else
    echo "✅ .env file exists"
fi

# Step 5: Install dependencies if needed
echo "5️⃣ Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
fi

# Step 6: Try different dev commands
echo "6️⃣ Starting development server..."
echo "🚀 Trying stable mode first..."

# Set environment variables for better Node.js performance
export NODE_OPTIONS="--max-old-space-size=4096"
export FORCE_COLOR=1

echo "📍 Server will be available at:"
echo "   - http://localhost:3000"
echo "   - http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "🔄 Press Ctrl+C to stop"
echo ""

# Try the most stable option first
exec bunx next dev --hostname 0.0.0.0 --port 3000
