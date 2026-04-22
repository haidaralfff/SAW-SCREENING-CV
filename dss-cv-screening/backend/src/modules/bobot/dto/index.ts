export class CreateBobotDto {
  nama_kriteria: string;
  bobot?: number;
  jenis_kriteria?: string;
}

export class UpdateBobotDto {
  nama_kriteria?: string;
  bobot?: number;
  jenis_kriteria?: string;
}
