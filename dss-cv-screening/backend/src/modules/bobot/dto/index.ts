import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateBobotDto {
  @IsString()
  @IsNotEmpty()
  nama_kriteria: string;

  @IsNumber()
  @IsOptional()
  bobot?: number;

  @IsString()
  @IsOptional()
  jenis_kriteria?: string;
}

export class UpdateBobotDto {
  @IsString()
  @IsOptional()
  nama_kriteria?: string;

  @IsNumber()
  @IsOptional()
  bobot?: number;

  @IsString()
  @IsOptional()
  jenis_kriteria?: string;
}
