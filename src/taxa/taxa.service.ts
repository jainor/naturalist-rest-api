import { Injectable } from '@nestjs/common';
import { CreateTaxaDto } from './dto/create-taxa.dto';
import { UpdateTaxaDto } from './dto/update-taxa.dto';

@Injectable()
export class TaxaService {
  create(createTaxaDto: CreateTaxaDto) {
    return 'This action adds a new taxa';
  }

  findAll() {
    return `This action returns all taxa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxa`;
  }

  update(id: number, updateTaxaDto: UpdateTaxaDto) {
    return `This action updates a #${id} taxa`;
  }

  remove(id: number) {
    return `This action removes a #${id} taxa`;
  }
}
