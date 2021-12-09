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

@Controller('taxa')
export class TaxaController {
  constructor(private readonly taxaService: TaxaService) {}

  @Get()
  findAll() {
    return this.taxaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxaService.findOne(+id);
  }
}
