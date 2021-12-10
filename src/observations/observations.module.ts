import { Module } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { ObservationsController } from './observations.controller';
import { NaturalistService } from 'src/naturalist/naturalist.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [ObservationsController],
  providers: [ObservationsService, NaturalistService],
  imports: [HttpModule],
})
export class ObservationsModule {}
