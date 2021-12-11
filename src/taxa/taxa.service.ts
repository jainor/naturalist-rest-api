import { Injectable } from '@nestjs/common';
import { NaturalistService } from '../shared/naturalist';

@Injectable()
export class TaxaService {
  constructor() {}

  findOne(id: number) {
    return `This action returns a #${id} taxa`;
  }

  findAllPhotos(id: number) {
    return NaturalistService.getPhotosByTaxa(id);
  }

  findAllTaxaAtRankDescendants(id: number, rank: string) {
    return NaturalistService.getTaxaAtRankDescendantsTaxa(id, rank);
  }
}
