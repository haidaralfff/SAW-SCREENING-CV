#!/bin/bash

# DSS CV Screening - Database Setup Script
# Run this after Prisma installation completes

echo "🔧 Setting up DSS CV Screening Database..."
echo ""

# Check if PostgreSQL is running
echo "✓ Checking PostgreSQL connection..."
psql -U postgres -d dss_cv_screening -c "SELECT 1" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✓ PostgreSQL is running and database exists"
else
    echo "✗ PostgreSQL connection failed"
    echo "Please ensure PostgreSQL is running and database 'dss_cv_screening' is created"
    exit 1
fi

echo ""
echo "📦 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

echo ""
echo "🌱 Creating seed data (optional)..."
# You can add seed.ts file later

echo ""
echo "✨ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Start backend: npm run start:dev"
echo "2. Start frontend: cd ../frontend && npm run dev"
echo "3. Open http://localhost:5173 in browser"
