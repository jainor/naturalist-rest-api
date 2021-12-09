import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxaService {
  findAll() {
    return `This action returns all taxa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxa`;
  }
}
