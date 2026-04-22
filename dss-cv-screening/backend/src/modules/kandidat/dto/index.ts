export class CreateKandidatDto {
  nama: string;
  posisi_yang_dicari: string;
  email: string;
  nomor_telepon?: string;
  pendidikan?: number;
  pengalaman?: number;
  skill_analisis?: number;
  sertifikasi?: number;
}

export class UpdateKandidatDto {
  nama?: string;
  posisi_yang_dicari?: string;
  email?: string;
  nomor_telepon?: string;
  pendidikan?: number;
  pengalaman?: number;
  skill_analisis?: number;
  sertifikasi?: number;
  nilai_akhir?: number;
  ranking?: number;
}
