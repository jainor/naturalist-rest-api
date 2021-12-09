import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxaDto } from './create-taxa.dto';

export class UpdateTaxaDto extends PartialType(CreateTaxaDto) {}
