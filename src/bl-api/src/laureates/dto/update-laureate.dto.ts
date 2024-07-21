import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateLaureateDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    firstname?: string;

    @IsOptional()
    @IsString()
    surname?: string;

    @IsOptional()
    @IsString()
    motivation?: string;

    @IsOptional()
    @IsString()
    share?: string;

    @IsOptional()
    @IsString()
    prizeId?: string;
}
