# Testing & Integration Guide

## Step-by-Step Testing Procedure

### Prerequisites
- PostgreSQL running
- Prisma migration completed (`npx prisma migrate dev --name init`)
- Backend server running (`npm run start:dev` on port 3000)
- Frontend server running (`npm run dev` on port 5173)

---

## 1. Test API Endpoints with cURL or Postman

### A. Create Initial Bobot (Weights) - Required!
```bash
# Create Pendidikan weight
curl -X POST http://localhost:3000/bobot \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kriteria": "Pendidikan",
    "bobot": 0.25,
    "jenis_kriteria": "benefit"
  }'

# Create Pengalaman weight
curl -X POST http://localhost:3000/bobot \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kriteria": "Pengalaman",
    "bobot": 0.25,
    "jenis_kriteria": "benefit"
  }'

# Create Skill Analisis weight
curl -X POST http://localhost:3000/bobot \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kriteria": "Skill Analisis",
    "bobot": 0.25,
    "jenis_kriteria": "benefit"
  }'

# Create Sertifikasi weight
curl -X POST http://localhost:3000/bobot \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kriteria": "Sertifikasi",
    "bobot": 0.25,
    "jenis_kriteria": "benefit"
  }'
```

### B. Verify Bobot Created
```bash
curl -X GET http://localhost:3000/bobot
```

Expected output:
```json
[
  {
    "id": "xxx",
    "nama_kriteria": "Pendidikan",
    "bobot": 0.25,
    "jenis_kriteria": "benefit"
  },
  // ... other criteria
]
```

### C. Create Test Candidates
```bash
# Candidate 1
curl -X POST http://localhost:3000/kandidat \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Budi Santoso",
    "email": "budi@example.com",
    "posisi_yang_dicari": "Accountant",
    "pendidikan": 85,
    "pengalaman": 90,
    "skill_analisis": 80,
    "sertifikasi": 75
  }'

# Candidate 2
curl -X POST http://localhost:3000/kandidat \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Siti Nurhaliza",
    "email": "siti@example.com",
    "posisi_yang_dicari": "Finance Staff",
    "pendidikan": 78,
    "pengalaman": 88,
    "skill_analisis": 92,
    "sertifikasi": 85
  }'

# Candidate 3
curl -X POST http://localhost:3000/kandidat \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Ahmad Wijaya",
    "email": "ahmad@example.com",
    "posisi_yang_dicari": "Marketing",
    "pendidikan": 72,
    "pengalaman": 80,
    "skill_analisis": 75,
    "sertifikasi": 88
  }'
```

### D. Verify Candidates Created
```bash
curl -X GET http://localhost:3000/kandidat
```

### E. Calculate Ranking (SAW Method)
```bash
curl -X POST http://localhost:3000/saw/calculate
```

Expected output: No body, but database is updated with `nilai_akhir` and `ranking` fields

### F. Get Ranking Results
```bash
curl -X GET http://localhost:3000/saw/ranking
```

Expected output:
```json
[
  {
    "id": "xxx",
    "nama": "Siti Nurhaliza",
    "posisi_yang_dicari": "Finance Staff",
    "nilai_akhir": 0.87,
    "ranking": 1
  },
  {
    "id": "yyy",
    "nama": "Budi Santoso",
    "posisi_yang_dicari": "Accountant",
    "nilai_akhir": 0.8625,
    "ranking": 2
  },
  // ...
]
```

---

## 2. Frontend Testing

### A. Open Application
Navigate to `http://localhost:5173` in your browser

### B. "Daftar Kandidat" Tab
1. Click "Tambah Kandidat" button
2. Fill form with test data:
   - Nama: "Rini Setyo"
   - Email: "rini@example.com"
   - Nomor Telepon: "081234567890"
   - Posisi: Select "Accountant"
   - Pendidikan: 88
   - Pengalaman: 92
   - Skill Analisis: 86
   - Sertifikasi: 79
3. Click "Simpan" button
4. Verify candidate appears in table

### C. Edit Candidate
1. Click "Edit" button on a candidate row
2. Change one value (e.g., pendidikan to 90)
3. Click "Simpan"
4. Verify changes reflected in table

### D. Delete Candidate
1. Click "Hapus" button
2. Confirm deletion
3. Verify candidate removed from table

### E. "Hasil Ranking" Tab
1. Click "Hitung Ranking" button
2. Wait for calculation to complete
3. Verify table shows candidates sorted by ranking
4. Check that top candidate has 🥇 emoji, 2nd has 🥈, 3rd has 🥉
5. Verify status badges: "Terpilih", "Alternatif-1", "Alternatif-2", "Backup"

---

## 3. SAW Algorithm Verification

### Manual Calculation Example

For candidate with scores: [85, 90, 80, 75] and weights [0.25, 0.25, 0.25, 0.25]

**Step 1: Find Max Values**
```
Max Pendidikan: 85 (from all candidates)
Max Pengalaman: 90
Max Skill: 92
Max Sertifikasi: 88
```

**Step 2: Normalize (divide by max)**
```
R11 = 85/85 = 1.00
R21 = 90/90 = 1.00
R31 = 80/92 = 0.870
R41 = 75/88 = 0.852
```

**Step 3: Calculate Score**
```
V = (1.00 × 0.25) + (1.00 × 0.25) + (0.870 × 0.25) + (0.852 × 0.25)
V = 0.25 + 0.25 + 0.218 + 0.213
V ≈ 0.931
```

---

## 4. Database Verification

### Check Tables Created
```bash
psql -U postgres -d dss_cv_screening

# List tables
\dt

# View Bobot table
SELECT * FROM "Bobot";

# View Kandidat table
SELECT * FROM "Kandidat" ORDER BY ranking ASC;
```

---

## 5. Common Testing Scenarios

### Scenario A: All Candidates Have Same Scores
- Expected: All tied (ranking 1 for all)
- Behavior: Order by insertion (first inserted gets rank 1)

### Scenario B: One Excellent Candidate
- Expected: Clear ranking with first candidate far ahead

### Scenario C: Update Weight and Recalculate
```bash
# Update weight
curl -X PUT http://localhost:3000/bobot/{id} \
  -H "Content-Type: application/json" \
  -d '{"bobot": 0.4}'

# Recalculate ranking
curl -X POST http://localhost:3000/saw/calculate

# Verify ranking changed
curl -X GET http://localhost:3000/saw/ranking
```

---

## 6. Troubleshooting

| Issue | Solution |
|-------|----------|
| "Connection refused" | Ensure PostgreSQL is running |
| "Database does not exist" | Run `createdb dss_cv_screening` |
| "Prisma Client not found" | Ensure `npm install` completed & `npx prisma generate` ran |
| "API returns 500" | Check backend logs for error details |
| "Frontend shows loading forever" | Check if `VITE_API_URL` is correct in `.env` |
| "No candidates in ranking" | Ensure candidates exist before calling `/saw/calculate` |
| "Wrong ranking order" | Check that weights sum to 1.0 (or less) |

---

## 7. Performance Testing

### Load Test with Multiple Candidates
```bash
# Create 100 candidates
for i in {1..100}; do
  curl -X POST http://localhost:3000/kandidat \
    -H "Content-Type: application/json" \
    -d "{
      \"nama\": \"Kandidat $i\",
      \"email\": \"test$i@example.com\",
      \"posisi_yang_dicari\": \"Accountant\",
      \"pendidikan\": $((RANDOM % 100)),
      \"pengalaman\": $((RANDOM % 100)),
      \"skill_analisis\": $((RANDOM % 100)),
      \"sertifikasi\": $((RANDOM % 100))
    }"
done

# Measure calculation time
time curl -X POST http://localhost:3000/saw/calculate
```

---

## Next Steps After Testing

1. ✅ All API endpoints working
2. ✅ Frontend properly displays data
3. ✅ SAW algorithm produces correct rankings
4. → Deploy to production
5. → Add authentication
6. → Implement export (CSV/PDF)
7. → Add more evaluation criteria
