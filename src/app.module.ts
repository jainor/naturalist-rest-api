import { Module } from '@nestjs/common';
import { TaxaModule } from './taxa/taxa.module';
import { ObservationsModule } from './observations/observations.module';

@Module({
  imports: [TaxaModule],
  controllers: [],
})
export class AppModule {}
