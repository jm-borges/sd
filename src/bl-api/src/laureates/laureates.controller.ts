import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LaureatesService } from './laureates.service';
import { CreateLaureateDto } from './dto/create-laureate.dto';
import { UpdateLaureateDto } from './dto/update-laureate.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('laureates')
@Controller('laureates')
export class LaureatesController {
    constructor(private readonly laureatesService: LaureatesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new laureate' })
    @ApiResponse({ status: 201, description: 'The laureate has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: CreateLaureateDto })
    create(@Body() createLaureateDto: CreateLaureateDto) {
        return this.laureatesService.create(createLaureateDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all laureates' })
    @ApiResponse({ status: 200, description: 'Return all laureates.' })
    findAll() {
        return this.laureatesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a laureate by id' })
    @ApiResponse({ status: 200, description: 'Return the laureate with the given id.' })
    @ApiResponse({ status: 404, description: 'Laureate not found.' })
    @ApiParam({ name: 'id', description: 'The id of the laureate' })
    findOne(@Param('id') id: string) {
        return this.laureatesService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a laureate by id' })
    @ApiResponse({ status: 200, description: 'The laureate has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Laureate not found.' })
    @ApiParam({ name: 'id', description: 'The id of the laureate' })
    @ApiBody({ type: UpdateLaureateDto })
    update(@Param('id') id: string, @Body() updateLaureateDto: UpdateLaureateDto) {
        return this.laureatesService.update(id, updateLaureateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a laureate by id' })
    @ApiResponse({ status: 200, description: 'The laureate has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Laureate not found.' })
    @ApiParam({ name: 'id', description: 'The id of the laureate' })
    remove(@Param('id') id: string) {
        return this.laureatesService.delete(id);
    }
}
