#!/bin/bash

echo "🔍 Testing Database Connection..."
echo "================================"

# Test database connection
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable not set"
    echo "Loading from .env file..."
    set -a
    source .env
    set +a
fi

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL still not found!"
    echo "Please check your .env file"
    exit 1
fi

echo "✅ DATABASE_URL found"
echo "Testing connection..."

# Create a simple test script
cat > test-db.js << 'EOF'
const { neon } = require('@neondatabase/serverless');

async function testConnection() {
  try {
    const sql = neon(process.env.DATABASE_URL, {
      connectionTimeoutMillis: 5000,
    });
    
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Database connection successful');
    console.log('Test result:', result);
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔧 This might be causing your server to crash');
    process.exit(1);
  }
}

testConnection();
EOF

# Test the connection
NODE_ENV=development node test-db.js

# Clean up
rm test-db.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🚀 Database connection OK. Starting development server..."
    echo ""
    exec ./fix-and-start.sh
else
    echo ""
    echo "❌ Database connection failed. Please check:"
    echo "1. Your internet connection"
    echo "2. DATABASE_URL in .env file"
    echo "3. Neon database status"
    echo ""
    echo "You can still start the server, but auth features won't work:"
    read -p "Start anyway? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        exec ./fix-and-start.sh
    fi
fi
