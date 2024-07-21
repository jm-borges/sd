import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateLaureateDto } from 'src/laureates/dto/update-laureate.dto';

export class UpdatePrizeDto {
    @IsOptional()
    @IsString()
    year?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateLaureateDto)
    laureates?: UpdateLaureateDto[];
}
