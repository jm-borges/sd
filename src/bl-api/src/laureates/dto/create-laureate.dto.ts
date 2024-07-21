import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLaureateDto {
    @ApiProperty({
        description: 'The first name of the laureate',
        example: 'Marie'
    })
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({
        description: 'The surname of the laureate',
        example: 'Curie'
    })
    @IsNotEmpty()
    @IsString()
    surname: string;

    @ApiProperty({
        description: 'The motivation for the laureate receiving the prize',
        example: 'In recognition of their contributions to the advancement of chemistry'
    })
    @IsNotEmpty()
    @IsString()
    motivation: string;

    @ApiProperty({
        description: 'The share of the prize that the laureate received',
        example: '1/2'
    })
    @IsNotEmpty()
    @IsString()
    share: string;

    @ApiProperty({
        description: 'The ID of the prize that the laureate received',
        example: '12345'
    })
    @IsNotEmpty()
    @IsString()
    prizeId: string;
}
