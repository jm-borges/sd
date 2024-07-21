import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LaureatesService } from './laureates.service';
import { CreateLaureateDto } from './dto/create-laureate.dto';
import { UpdateLaureateDto } from './dto/update-laureate.dto';

@Controller('laureates')
export class LaureatesController {
    constructor(private readonly laureatesService: LaureatesService) { }

    @Post()
    create(@Body() createLaureateDto: CreateLaureateDto) {
        return this.laureatesService.create(createLaureateDto);
    }

    @Get()
    findAll() {
        return this.laureatesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.laureatesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateLaureateDto: UpdateLaureateDto) {
        return this.laureatesService.update(id, updateLaureateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.laureatesService.delete(id);
    }
}
