import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObservationsService } from './observations.service';

@Controller('observations')
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Get()
  findAll() {
    return this.observationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observationsService.findOne(+id);
  }
}
