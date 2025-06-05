import { IsNotEmpty, IsString } from "class-validator"

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    message: string

    @IsString()
    @IsNotEmpty()
    type: string

    timestamp: Date
}
