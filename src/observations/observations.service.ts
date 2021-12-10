import { Injectable } from '@nestjs/common';
import { NaturalistService } from 'src/naturalist/naturalist.service';

@Injectable()
export class ObservationsService {
  constructor(private naturalistService: NaturalistService) {}

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
