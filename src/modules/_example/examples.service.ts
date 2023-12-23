import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Example } from './examples.model';
import { CreateExampleDto, UpdateExampleDto } from './dto';

@Injectable()
export class ExamplesService {
  constructor(
    @InjectModel(Example) private examplesRepository: typeof Example,
  ) {}

  async getAll() {
    return await this.examplesRepository.findAll();
  }

  async getById(id: number) {
    return await this.examplesRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async create(dto: CreateExampleDto) {
    return await this.examplesRepository.create(dto);
  }

  async updatePlayer(playerId: number, dto: UpdateExampleDto) {
    await this.examplesRepository.update(dto, { where: { id: playerId } });
  }

  async remove(id: number) {
    return await this.examplesRepository.destroy({ where: { id } });
  }
}
