#!/bin/bash

echo "🔧 WSL Next.js Development Server Troubleshooter"
echo "================================================="
echo ""

echo "📋 System Information:"
echo "WSL Version: $(wsl --version 2>/dev/null || echo 'WSL1 or version not available')"
echo "Node Version: $(node --version)"
echo "Bun Version: $(bun --version)"
echo "Next.js Version: $(bunx next --version)"
echo ""

echo "🌐 Network Information:"
echo "Hostname: $(hostname)"
echo "IP Address: $(hostname -I | awk '{print $1}')"
echo ""

echo "🔍 Port Check:"
if lsof -i :3000 > /dev/null 2>&1; then
    echo "❌ Port 3000 is already in use:"
    lsof -i :3000
    echo ""
    echo "💡 Kill the process with: kill -9 $(lsof -t -i:3000)"
else
    echo "✅ Port 3000 is available"
fi
echo ""

echo "🚀 Recommended Commands to Try:"
echo "1. Basic dev server:     bun run dev:stable"
echo "2. With host binding:    bun run dev"
echo "3. With turbopack:       bun run dev:turbo"
echo "4. Manual command:       bunx next dev --hostname 0.0.0.0 --port 3000"
echo ""

echo "🔗 Access URLs:"
echo "- Local:     http://localhost:3000"
echo "- Network:   http://$(hostname -I | awk '{print $1}'):3000"
echo "- WSL Host:  http://$(hostname).local:3000"
