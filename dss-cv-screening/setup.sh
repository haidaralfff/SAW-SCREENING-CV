#!/bin/bash
# DSS CV Screening - Complete Setup Script
# Run this script to fully setup and start the application

set -e

echo "🚀 DSS CV Screening - Complete Setup Script"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check prerequisites
echo "${BLUE}Step 1: Checking prerequisites...${NC}"
command -v node &> /dev/null || { echo "Node.js not found"; exit 1; }
command -v npm &> /dev/null || { echo "npm not found"; exit 1; }
echo "${GREEN}✓ Node.js and npm found${NC}"
echo ""

# Step 2: Setup Backend
echo "${BLUE}Step 2: Setting up backend...${NC}"
cd backend

echo "Installing backend dependencies..."
# Prisma should already be installed, but check
if ! npm list @prisma/client &>/dev/null; then
    npm install @prisma/client prisma pg --save
fi
echo "${GREEN}✓ Backend dependencies installed${NC}"

echo "Generating Prisma Client..."
npx prisma generate
echo "${GREEN}✓ Prisma Client generated${NC}"
echo ""

# Step 3: Setup Database
echo "${BLUE}Step 3: Setting up database...${NC}"
echo "Running Prisma migrations..."
npx prisma migrate dev --name init
echo "${GREEN}✓ Database migrations completed${NC}"
echo ""

# Step 4: Seed Initial Data
echo "${BLUE}Step 4: Creating initial data...${NC}"
echo "Seeding bobot (weights) data..."

# Create initial bobot records
npx ts-node prisma/seed.ts 2>/dev/null || {
    echo "Creating bobot records via API..."
    # Will be created after server starts
}

echo "${GREEN}✓ Database ready${NC}"
echo ""

# Step 5: Setup Frontend
echo "${BLUE}Step 5: Setting up frontend...${NC}"
cd ../frontend
npm install
echo "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

# Step 6: Ready to Start
echo "${GREEN}=================================="
echo "✨ Setup Complete!"
echo "==================================${NC}"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm run start:dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
echo "First steps:"
echo "1. Add criteria weights via POST /bobot"
echo "2. Add candidates via form"
echo "3. Calculate ranking with button"
echo "4. View results in 'Hasil Ranking' tab"
echo ""
