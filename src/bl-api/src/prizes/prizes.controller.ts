import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { Prize } from 'src/models/prize.model';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('prizes')
@ApiBearerAuth()
@Controller('prizes')
export class PrizesController {
    constructor(private readonly prizesService: PrizesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all prizes' })
    @ApiResponse({ status: 200, description: 'Return all prizes.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll(): Promise<Prize[]> {
        return this.prizesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single prize by ID' })
    @ApiParam({ name: 'id', description: 'Prize ID' })
    @ApiResponse({ status: 200, description: 'Return a single prize.' })
    @ApiResponse({ status: 404, description: 'Prize not found.' })
    async findOne(@Param('id') id: string): Promise<Prize> {
        return this.prizesService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new prize' })
    @ApiResponse({ status: 201, description: 'The prize has been created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() data: CreatePrizeDto): Promise<Prize> {
        return this.prizesService.create(data);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a prize by ID' })
    @ApiParam({ name: 'id', description: 'Prize ID' })
    @ApiResponse({ status: 200, description: 'The prize has been updated.' })
    @ApiResponse({ status: 404, description: 'Prize not found.' })
    async update(@Param('id') id: string, @Body() data: UpdatePrizeDto): Promise<Prize> {
        return this.prizesService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a prize by ID' })
    @ApiParam({ name: 'id', description: 'Prize ID' })
    @ApiResponse({ status: 200, description: 'The prize has been deleted.' })
    @ApiResponse({ status: 404, description: 'Prize not found.' })
    async delete(@Param('id') id: string): Promise<Prize> {
        return this.prizesService.delete(id);
    }
}
