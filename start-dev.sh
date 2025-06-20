#!/bin/bash

echo "🚀 Starting development server with stability fixes..."

# Kill any existing processes on port 3000
echo "🔍 Checking for existing processes on port 3000..."
if lsof -i :3000 > /dev/null 2>&1; then
    echo "❌ Killing existing process on port 3000..."
    kill -9 $(lsof -t -i:3000) 2>/dev/null || true
    sleep 2
fi

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache

# Start the server with better error handling
echo "🚀 Starting Next.js development server..."
echo "📍 Server will be available at: http://localhost:3000"
echo "🔄 Use Ctrl+C to stop the server"
echo ""

# Use the stable version without turbopack
NODE_OPTIONS="--max-old-space-size=4096" bunx next dev --hostname 0.0.0.0 --port 3000

echo "✅ Development server stopped."
