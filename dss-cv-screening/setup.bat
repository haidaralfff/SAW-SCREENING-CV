@echo off
REM DSS CV Screening - Complete Setup Script for Windows
REM Run this script to fully setup the application

setlocal enabledelayedexpansion

echo.
echo ============================================
echo   DSS CV Screening - Setup Script (Windows)
echo ============================================
echo.

REM Check if Node.js and npm are installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: npm not found. Please install npm first.
    pause
    exit /b 1
)

echo [Step 1] Checking prerequisites...
echo PASSED: Node.js and npm found
echo.

REM Setup Backend
echo [Step 2] Setting up backend...
cd backend

echo Installing backend dependencies...
REM Check if Prisma is already installed
npm list @prisma/client >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Prisma not found, installing...
    npm install @prisma/client prisma pg --save
)
echo DONE: Backend dependencies installed
echo.

echo Generating Prisma Client...
call npx prisma generate
echo DONE: Prisma Client generated
echo.

REM Setup Database
echo [Step 3] Setting up database...
echo Running Prisma migrations...
call npx prisma migrate dev --name init
echo DONE: Database migrations completed
echo.

REM Setup Frontend
echo [Step 4] Setting up frontend...
cd ..\frontend
call npm install
echo DONE: Frontend dependencies installed
echo.

REM Summary
echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Next Steps:
echo.
echo 1. Open TWO terminal windows
echo.
echo    Terminal 1 - Backend Server:
echo    ==============================
echo    cd dss-cv-screening\backend
echo    npm run start:dev
echo    (Listens on http://localhost:3000)
echo.
echo    Terminal 2 - Frontend Server:
echo    ==============================
echo    cd dss-cv-screening\frontend
echo    npm run dev
echo    (Listens on http://localhost:5173)
echo.
echo 2. Open http://localhost:5173 in your browser
echo.
echo 3. First Time Setup:
echo    - Create weights via API (see TESTING_GUIDE.md)
echo    - Add candidates using the form
echo    - Calculate ranking using the button
echo    - View results in "Hasil Ranking" tab
echo.
echo Documentation:
echo   - SETUP_GUIDE.md ......... Installation guide
echo   - QUICK_REFERENCE.md .... Quick command reference
echo   - TESTING_GUIDE.md ...... Testing procedures
echo   - PROJECT_STRUCTURE.md .. Architecture overview
echo.
pause
