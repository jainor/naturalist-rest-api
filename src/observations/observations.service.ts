import { Injectable } from '@nestjs/common';

@Injectable()
export class ObservationsService {
  findAll() {
    return `This action returns all observations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} observation`;
  }
}
