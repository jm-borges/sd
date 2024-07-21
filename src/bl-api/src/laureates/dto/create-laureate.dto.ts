import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLaureateDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsString()
    motivation: string;

    @IsNotEmpty()
    @IsString()
    share: string;

    @IsNotEmpty()
    @IsString()
    prizeId: string;
}
