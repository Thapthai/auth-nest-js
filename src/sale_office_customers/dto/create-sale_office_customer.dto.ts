import { IsInt, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateSaleOfficeCustomerDto {
    @IsInt()
    @IsNotEmpty()
    sale_office_id: number;

    @IsInt()
    @IsNotEmpty()
    customer_id: number;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
