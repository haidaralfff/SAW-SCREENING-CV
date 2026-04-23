import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateKandidatDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  posisi_yang_dicari: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  nomor_telepon?: string;

  @IsNumber()
  @IsOptional()
  pendidikan?: number;

  @IsNumber()
  @IsOptional()
  pengalaman?: number;

  @IsNumber()
  @IsOptional()
  skill_analisis?: number;

  @IsNumber()
  @IsOptional()
  sertifikasi?: number;
}

export class UpdateKandidatDto {
  @IsString()
  @IsOptional()
  nama?: string;

  @IsString()
  @IsOptional()
  posisi_yang_dicari?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  nomor_telepon?: string;

  @IsNumber()
  @IsOptional()
  pendidikan?: number;

  @IsNumber()
  @IsOptional()
  pengalaman?: number;

  @IsNumber()
  @IsOptional()
  skill_analisis?: number;

  @IsNumber()
  @IsOptional()
  sertifikasi?: number;

  @IsNumber()
  @IsOptional()
  nilai_akhir?: number;

  @IsNumber()
  @IsOptional()
  ranking?: number;
}
