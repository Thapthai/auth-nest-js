import { IsArray } from "class-validator";


export class UpdateUserSaleOfficeDto {
    user_id: number;
    
    @IsArray()
    sale_office_ids: number[];
}