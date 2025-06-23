import { IsOptional } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    permission_id: number
}
