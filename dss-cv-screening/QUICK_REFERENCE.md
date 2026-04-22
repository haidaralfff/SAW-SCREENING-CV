# DSS CV Screening - Quick Reference

## Current Status ✅

### Completed
- ✅ Project folder structure created
- ✅ Vue 3 + Vite frontend scaffold (npm install completed)
- ✅ NestJS backend scaffold (npm install completed)
- ✅ All source files created (16 backend modules, 8 frontend components)
- ✅ Prisma schema designed (Bobot & Kandidat models)
- ✅ API endpoints defined (8 total)
- ✅ SAW algorithm implemented
- ✅ Documentation files created

### In Progress
- ⏳ Prisma/pg installation (npm install @prisma/client prisma pg)
  - Est. time: 5-10 more minutes (native module compilation)

### Pending
- ⏰ PostgreSQL database setup
- ⏰ Prisma migration (npx prisma migrate dev --name init)
- ⏰ Frontend axios installation
- ⏰ Seed initial weight data
- ⏰ Testing & validation

---

## Tech Stack Summary

```
Frontend                Backend               Database
├─ Vue 3.5.32          ├─ NestJS 11          ├─ PostgreSQL
├─ Vite 8              ├─ TypeScript          ├─ Prisma ORM
├─ TypeScript 6        ├─ @nestjs/*          └─ 2 tables
├─ Axios 1.7.7         └─ Jest               (Bobot & Kandidat)
└─ Port: 5173          └─ Port: 3000
```

---

## Critical File Locations

| Purpose | Path | Status |
|---------|------|--------|
| Prisma Schema | `backend/prisma/schema.prisma` | ✅ Complete |
| SAW Algorithm | `backend/src/modules/saw/saw.service.ts` | ✅ Complete |
| Main UI Component | `frontend/src/App.vue` | ✅ Complete |
| API Service | `frontend/src/services/api.ts` | ✅ Complete |
| Database Config | `backend/.env` | ✅ Complete |
| Frontend Config | `frontend/.env` | ✅ Complete |

---

## Core Data Models

### Bobot (Criteria Weights)
```typescript
{
  id: string (UUID)
  nama_kriteria: "Pendidikan" | "Pengalaman" | "Skill_Analisis" | "Sertifikasi"
  bobot: 0.25 (each, equals 1.0 total)
  jenis_kriteria: "benefit"
}
```

### Kandidat (Candidates)
```typescript
{
  id: string (UUID)
  nama: string
  email: string (unique)
  posisi_yang_dicari: "Accountant" | "Finance Staff" | "Marketing"
  pendidikan: 0-100 (score)
  pengalaman: 0-100
  skill_analisis: 0-100
  sertifikasi: 0-100
  nilai_akhir: float (SAW score)
  ranking: number (1, 2, 3, ...)
}
```

---

## SAW Algorithm (Simple Additive Weighting)

### Formula
```
R[i,j] = X[i,j] / max(X[i])    // Normalization
V[i] = Σ(R[i,j] × W[j])       // Weighted Sum
Ranking = Sort by V[i] descending
```

### Implementation
- Location: `backend/src/modules/saw/saw.service.ts`
- Methods: `calculateRanking()`, `getRanking()`
- Endpoint: `POST /saw/calculate` → Updates database
- Endpoint: `GET /saw/ranking` → Returns sorted results

---

## API Endpoints Overview

### Bobot Management
| Method | Path | Description |
|--------|------|-------------|
| GET | `/bobot` | Get all weights |
| POST | `/bobot` | Create weight |
| PUT | `/bobot/:id` | Update weight |
| DELETE | `/bobot/:id` | Delete weight |

### Kandidat Management
| Method | Path | Description |
|--------|------|-------------|
| GET | `/kandidat` | Get all candidates |
| POST | `/kandidat` | Create candidate |
| PUT | `/kandidat/:id` | Update candidate |
| DELETE | `/kandidat/:id` | Delete candidate |

### SAW Calculation
| Method | Path | Description |
|--------|------|-------------|
| POST | `/saw/calculate` | Trigger SAW ranking |
| GET | `/saw/ranking` | Get ranked results |

---

## Quick Start (After Prisma Install)

### 1. Setup Database
```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### 2. Start Backend
```bash
npm run start:dev
# Listens on http://localhost:3000
```

### 3. Start Frontend (new terminal)
```bash
cd frontend
npm run dev
# Listens on http://localhost:5173
```

### 4. Add Initial Weights
```bash
# Create 4 bobot records with 0.25 weight each
# See TESTING_GUIDE.md for cURL examples
curl -X POST http://localhost:3000/bobot ...
```

### 5. Test Application
```bash
# Open http://localhost:5173
# Add candidates → Calculate ranking → View results
```

---

## Troubleshooting

### npm install Still Running?
- This is normal! Native modules (pg) compile on first install
- Takes 5-15 minutes depending on system
- Do NOT interrupt - let it complete

### PostgreSQL Connection Error?
```bash
# Ensure PostgreSQL is running
# On Windows: Services → PostgreSQL → Start
# On Mac: brew services start postgresql
# On Linux: sudo systemctl start postgresql

# Create database if not exists
createdb dss_cv_screening
```

### Prisma Migration Fails?
```bash
# Delete migration folder and retry
rm -rf backend/prisma/migrations
npx prisma migrate dev --name init
```

### Frontend Shows Loading?
- Check `frontend/.env` has correct `VITE_API_URL`
- Ensure backend is running on port 3000
- Check browser console for API errors

---

## Key Commands Reference

```bash
# Backend
npm install                    # Install backend deps
npx prisma generate           # Generate Prisma Client
npx prisma migrate dev        # Run migrations
npm run start:dev             # Start dev server
npm run build                 # Compile TypeScript
npm test                      # Run tests

# Frontend
npm install                   # Install frontend deps
npm run dev                   # Start dev server
npm run build                 # Build for production
npm run preview               # Preview production build

# Database
npx prisma studio            # Open database viewer
psql -d dss_cv_screening     # Open PostgreSQL CLI
```

---

## File Structure Quick Reference

```
dss-cv-screening/
├── backend/
│   ├── src/modules/
│   │   ├── bobot/           # Weight CRUD
│   │   ├── kandidat/        # Candidate CRUD
│   │   └── saw/             # Ranking logic
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── .env                 # DB credentials
├── frontend/
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── services/        # API client
│   │   └── App.vue          # Main app
│   └── .env                 # API URL config
└── docs/
    ├── SETUP_GUIDE.md       # Installation guide
    ├── PROJECT_STRUCTURE.md # Architecture overview
    └── TESTING_GUIDE.md     # Testing procedure
```

---

## Next: Monitor Installation

```bash
# Check Prisma install progress (in backend folder)
npm list prisma @prisma/client pg

# Once complete, run:
npx prisma generate
npx prisma migrate dev --name init
```

**Expected completion**: ~10 minutes total for full Prisma compilation

---

## Support Resources

- **Prisma Docs**: https://www.prisma.io/docs/
- **NestJS Docs**: https://docs.nestjs.com/
- **Vue 3 Docs**: https://vuejs.org/guide/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

---

Last Updated: During Prisma Installation
Status: On Track ✅
