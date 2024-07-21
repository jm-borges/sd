import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { Prize } from 'src/models/prize.model';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';

@Controller('prizes')
export class PrizesController {
    constructor(private readonly prizesService: PrizesService) { }

    @Get()
    async findAll(): Promise<Prize[]> {
        return this.prizesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Prize> {
        return this.prizesService.findOne(id);
    }

    @Post()
    async create(@Body() data: CreatePrizeDto): Promise<Prize> {
        return this.prizesService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdatePrizeDto): Promise<Prize> {
        return this.prizesService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Prize> {
        return this.prizesService.delete(id);
    }
}
