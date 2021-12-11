import { Module } from '@nestjs/common';
import { TaxaService } from './taxa.service';
import { TaxaController } from './taxa.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [TaxaController],
  providers: [TaxaService],
  imports: [HttpModule],
})
export class TaxaModule {}
