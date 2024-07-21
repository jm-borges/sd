import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLaureateDto } from 'src/laureates/dto/create-laureate.dto';

export class CreatePrizeDto {
    @IsString()
    year: string;

    @IsString()
    category: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateLaureateDto)
    laureates?: CreateLaureateDto[];
}
