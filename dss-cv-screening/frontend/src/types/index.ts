export interface Kandidat {
  id: string;
  nama: string;
  posisi_yang_dicari: string;
  email: string;
  nomor_telepon?: string;
  pendidikan: number;
  pengalaman: number;
  skill_analisis: number;
  sertifikasi: number;
  nilai_akhir?: number;
  ranking?: number;
}

export interface Bobot {
  id: string;
  nama_kriteria: string;
  bobot: number;
  jenis_kriteria: string;
}

export interface RankingResult {
  id: string;
  nama: string;
  posisi_yang_dicari: string;
  nilai_akhir: number;
  ranking: number;
}
