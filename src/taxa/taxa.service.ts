import { Injectable } from '@nestjs/common';
import { NaturalistService } from 'src/naturalist/naturalist.service';

@Injectable()
export class TaxaService {
  constructor(private naturalistService: NaturalistService) {}

  findOne(id: number) {
    return `This action returns a #${id} taxa`;
  }

  findAllPhotos(id: number) {
    return this.naturalistService.getPhotosByTaxa(id);
  }

  findAllTaxaAtRankDescendants(id: number, rank: string) {
    return this.naturalistService.getTaxaAtRankDescendantsTaxa(id, rank);
  }
}
