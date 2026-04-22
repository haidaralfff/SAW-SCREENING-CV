-- CreateTable
CREATE TABLE "bobots" (
    "id" TEXT NOT NULL,
    "nama_kriteria" TEXT NOT NULL,
    "bobot" DOUBLE PRECISION NOT NULL DEFAULT 0.25,
    "jenis_kriteria" TEXT NOT NULL DEFAULT 'benefit',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bobots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kandidats" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "posisi_yang_dicari" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nomor_telepon" TEXT,
    "pendidikan" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pengalaman" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skill_analisis" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sertifikasi" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nilai_akhir" DOUBLE PRECISION DEFAULT 0,
    "ranking" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kandidats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bobots_nama_kriteria_key" ON "bobots"("nama_kriteria");

-- CreateIndex
CREATE UNIQUE INDEX "kandidats_email_key" ON "kandidats"("email");
