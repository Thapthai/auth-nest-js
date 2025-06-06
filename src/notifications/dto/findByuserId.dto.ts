import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';

export class FindByuserIdDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  take: number = 3;
}
