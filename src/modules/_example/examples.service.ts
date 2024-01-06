import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Example } from './examples.model';
import { CreateExampleDto, UpdateExampleDto } from './dto';

@Injectable()
export class ExamplesService {
  constructor(
    @InjectRepository(Example)
    private examplesRepository: Repository<Example>,
  ) {}

  async getAll() {
    return await this.examplesRepository.find();
  }

  async getById(id: number) {
    return await this.examplesRepository.findOneBy({ id });
  }

  async create(dto: CreateExampleDto) {
    return await this.examplesRepository.save(dto);
  }

  async update(id: number, dto: UpdateExampleDto) {
    await this.examplesRepository.update({ id }, dto);
  }

  async remove(id: number) {
    return await this.examplesRepository.delete(id);
  }
}
