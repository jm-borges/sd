import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLaureateDto } from 'src/laureates/dto/create-laureate.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePrizeDto {
    @ApiProperty({
        description: 'The year the prize was awarded',
        example: '2024'
    })
    @IsString()
    year: string;

    @ApiProperty({
        description: 'The category of the prize',
        example: 'Chemistry'
    })
    @IsString()
    category: string;

    @ApiPropertyOptional({
        description: 'List of laureates who received the prize',
        type: [CreateLaureateDto]
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateLaureateDto)
    laureates?: CreateLaureateDto[];
}
