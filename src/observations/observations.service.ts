import { Injectable } from '@nestjs/common';

@Injectable()
export class ObservationsService {
  findOne(id: number) {
    return `This action returns an observation`;
  }

  findAll() {
    return `This action returns all observations`;
  }

  findPhotos(id: number) {
    return 'This should return photos of an observation';
  }
}
