import { Module } from '@nestjs/common';
import { TaxaService } from './taxa.service';
import { TaxaController } from './taxa.controller';

@Module({
  controllers: [TaxaController],
  providers: [TaxaService]
})
export class TaxaModule {}
