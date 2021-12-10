import { Module } from '@nestjs/common';
import { TaxaService } from './taxa.service';
import { TaxaController } from './taxa.controller';
import { NaturalistService } from '../naturalist/naturalist.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [TaxaController],
  providers: [TaxaService, NaturalistService],
  imports: [HttpModule],
})
export class TaxaModule {}
