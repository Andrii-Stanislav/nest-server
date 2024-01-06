import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../guards';

import { ExamplesService } from './examples.service';
import { CreateExampleDto, UpdateExampleDto } from './dto';

@ApiBearerAuth()
@ApiTags('Examples route')
@UseGuards(JwtAuthGuard)
@Controller('examples')
export class ExamplesController {
  constructor(private readonly examplesService: ExamplesService) {}

  @Get()
  async getAll() {
    return this.examplesService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.examplesService.getById(id);
  }

  @Post()
  async create(@Body() dto: CreateExampleDto) {
    return this.examplesService.create(dto);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateExampleDto) {
    return this.examplesService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.examplesService.remove(id);
  }
}
