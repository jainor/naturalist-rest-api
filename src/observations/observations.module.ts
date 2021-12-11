import { Module } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { ObservationsController } from './observations.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [ObservationsController],
  providers: [ObservationsService],
  imports: [HttpModule],
})
export class ObservationsModule {}
