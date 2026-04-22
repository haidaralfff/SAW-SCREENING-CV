# Project Structure - DSS CV Screening System

```
dss-cv-screening/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── bobot/
│   │   │   │   ├── bobot.module.ts
│   │   │   │   ├── bobot.service.ts
│   │   │   │   ├── bobot.controller.ts
│   │   │   │   └── dto/
│   │   │   │       └── index.ts
│   │   │   ├── kandidat/
│   │   │   │   ├── kandidat.module.ts
│   │   │   │   ├── kandidat.service.ts
│   │   │   │   ├── kandidat.controller.ts
│   │   │   │   └── dto/
│   │   │   │       └── index.ts
│   │   │   └── saw/
│   │   │       ├── saw.module.ts
│   │   │       ├── saw.service.ts
│   │   │       └── saw.controller.ts
│   │   ├── modules/
│   │   │   └── prisma/
│   │   │       └── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── test/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── node_modules/
│   ├── src/
│   │   ├── components/
│   │   │   ├── KandidatForm.vue
│   │   │   ├── KandidatList.vue
│   │   │   └── RankingTable.vue
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.vue
│   │   ├── main.ts
│   │   └── style.css
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── public/
│
└── SETUP_GUIDE.md

```

## Key Technologies

### Backend (NestJS)
- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Modules**: 
  - Bobot: Criteria weights management
  - Kandidat: Candidate information
  - SAW: Simple Additive Weighting algorithm
  - Prisma: Database connection

### Frontend (Vue 3)
- **Framework**: Vue 3 + Composition API
- **TypeScript**: Full type safety
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Data Models

### Bobot (Weights)
```
{
  id: string (uuid)
  nama_kriteria: string (Unique: Pendidikan, Pengalaman, Skill_Analisis, Sertifikasi)
  bobot: float (0.0 - 1.0)
  jenis_kriteria: string (benefit)
}
```

### Kandidat (Candidates)
```
{
  id: string (uuid)
  nama: string
  email: string (Unique)
  posisi_yang_dicari: string (Accountant | Finance Staff | Marketing)
  pendidikan: float (0-100)
  pengalaman: float (0-100)
  skill_analisis: float (0-100)
  sertifikasi: float (0-100)
  nilai_akhir: float (SAW score)
  ranking: int (1, 2, 3, ...)
}
```

## API Routes Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bobot` | Get all criteria weights |
| PUT | `/bobot/:id` | Update weight |
| POST | `/kandidat` | Create candidate |
| GET | `/kandidat` | Get all candidates (ordered by ranking) |
| PUT | `/kandidat/:id` | Update candidate |
| DELETE | `/kandidat/:id` | Delete candidate |
| POST | `/saw/calculate` | Trigger SAW calculation |
| GET | `/saw/ranking` | Get ranking results |

## Running the Application

### Terminal 1: Backend
```bash
cd backend
npm run start:dev  # Development with auto-reload
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

### Access Points
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Docs (if Swagger configured): http://localhost:3000/api

## Database Setup

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Launch Prisma Studio (optional - visual database viewer)
npx prisma studio
```

## Common Commands

### Backend
```bash
npm run start          # Production
npm run start:dev      # Development with reload
npm run build          # Compile TypeScript
npm run test           # Run tests
```

### Frontend
```bash
npm run dev            # Development server
npm run build          # Build for production
npm run preview        # Preview production build
```
