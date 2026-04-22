# DSS CV Screening - Setup & Running Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm atau yarn

## Installation Steps

### 1. Backend Setup

```bash
cd backend

# Packages sudah terinstall, configure environment
cp .env.example .env

# Sesuaikan DATABASE_URL di .env dengan kredensial PostgreSQL Anda:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/dss_cv_screening"

# Generate Prisma Client dan jalankan migration
npx prisma migrate dev --name init

# Start backend server
npm run start

# Server berjalan di http://localhost:3000
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend berjalan di http://localhost:5173
```

## API Endpoints

### Kandidat
- `GET /kandidat` - Get all candidates
- `POST /kandidat` - Create new candidate
- `PUT /kandidat/:id` - Update candidate
- `DELETE /kandidat/:id` - Delete candidate

### Bobot (Weights)
- `GET /bobot` - Get all weights
- `PUT /bobot/:id` - Update weight

### SAW Calculation
- `POST /saw/calculate` - Calculate ranking using SAW method
- `GET /saw/ranking` - Get ranking results

## Database Schema

### Bobot Table
- `id` (String, Primary Key)
- `nama_kriteria` (String, Unique)
- `bobot` (Float) - Weight percentage
- `jenis_kriteria` (String) - Type (benefit)

### Kandidat Table
- `id` (String, Primary Key)
- `nama` (String) - Candidate name
- `email` (String, Unique)
- `posisi_yang_dicari` (String) - Position (Accountant, Finance Staff, Marketing)
- `pendidikan` (Float) - Education score (0-100)
- `pengalaman` (Float) - Experience score (0-100)
- `skill_analisis` (Float) - Analytical skills score (0-100)
- `sertifikasi` (Float) - Certification score (0-100)
- `nilai_akhir` (Float) - Final SAW score
- `ranking` (Int) - Final ranking

## SAW Algorithm Flow

1. **Normalisasi** - Normalize scores (0-100 → 0-1)
2. **Weighted Sum** - Calculate: (normalized × weight) for each criteria
3. **Ranking** - Sort by final score (descending)
4. **Update DB** - Store ranking & scores in database

## Troubleshooting

### Database Connection Error
- Pastikan PostgreSQL running
- Check DATABASE_URL di .env
- Run: `psql -U postgres -d dss_cv_screening`

### Prisma Migration Error
- Delete `/prisma/migrations` folder
- Run: `npx prisma migrate dev --name init`

### Frontend API Connection Error
- Check VITE_API_URL di `.env`
- Backend harus berjalan di port 3000

## Next Steps
1. Seed initial Bobot data via POST /bobot
2. Add candidates via POST /kandidat
3. Calculate ranking via POST /saw/calculate
4. View results in Frontend
