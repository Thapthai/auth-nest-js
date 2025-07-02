import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  is_read?: boolean;
}
