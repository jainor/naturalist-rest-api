import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaxaService } from './taxa.service';
import { CreateTaxaDto } from './dto/create-taxa.dto';
import { UpdateTaxaDto } from './dto/update-taxa.dto';

@Controller('taxa')
export class TaxaController {
  constructor(private readonly taxaService: TaxaService) {}

  @Post()
  create(@Body() createTaxaDto: CreateTaxaDto) {
    return this.taxaService.create(createTaxaDto);
  }

  @Get()
  findAll() {
    return this.taxaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxaDto: UpdateTaxaDto) {
    return this.taxaService.update(+id, updateTaxaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxaService.remove(+id);
  }
}
