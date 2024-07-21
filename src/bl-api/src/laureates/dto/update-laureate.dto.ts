import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLaureateDto {
    @ApiPropertyOptional({
        description: 'The unique identifier of the laureate',
        example: '12345'
    })
    @IsOptional()
    @IsString()
    id?: string;

    @ApiPropertyOptional({
        description: 'The first name of the laureate',
        example: 'Marie'
    })
    @IsOptional()
    @IsString()
    firstname?: string;

    @ApiPropertyOptional({
        description: 'The surname of the laureate',
        example: 'Curie'
    })
    @IsOptional()
    @IsString()
    surname?: string;

    @ApiPropertyOptional({
        description: 'The motivation for the laureate receiving the prize',
        example: 'In recognition of their contributions to the advancement of chemistry'
    })
    @IsOptional()
    @IsString()
    motivation?: string;

    @ApiPropertyOptional({
        description: 'The share of the prize that the laureate received',
        example: '1/2'
    })
    @IsOptional()
    @IsString()
    share?: string;

    @ApiPropertyOptional({
        description: 'The ID of the prize that the laureate received',
        example: '12345'
    })
    @IsOptional()
    @IsString()
    prizeId?: string;
}
