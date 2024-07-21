import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateLaureateDto } from 'src/laureates/dto/update-laureate.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePrizeDto {
    @ApiPropertyOptional({
        description: 'The year the prize was awarded',
        example: '2024'
    })
    @IsOptional()
    @IsString()
    year?: string;

    @ApiPropertyOptional({
        description: 'The category of the prize',
        example: 'Chemistry'
    })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiPropertyOptional({
        description: 'List of laureates who received the prize',
        type: [UpdateLaureateDto]
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateLaureateDto)
    laureates?: UpdateLaureateDto[];
}
