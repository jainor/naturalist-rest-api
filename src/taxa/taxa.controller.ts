import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxaService } from './taxa.service';
import { NaturalistService } from 'src/naturalist/naturalist.service';

@Controller('taxa')
export class TaxaController {
  constructor(private readonly taxaService: TaxaService) {}
  @Get(':id/rank/:rank')
  findTaxaDescendantsWithRank(
    @Param('id') id: number,
    @Param('rank') rank: string,
  ) {
    return this.taxaService.findAllTaxaAtRankDescendants(id, rank);
  }
  /*
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.taxaService.findOne(+id);
  }
  */

  @Get('/:id/photos')
  findAllPhotos(@Param('id') id: string) {
    return this.taxaService.findAllPhotos(+id);
  }
}
