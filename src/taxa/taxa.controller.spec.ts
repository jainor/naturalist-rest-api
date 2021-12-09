import { Test, TestingModule } from '@nestjs/testing';
import { TaxaController } from './taxa.controller';
import { TaxaService } from './taxa.service';

describe('TaxaController', () => {
  let controller: TaxaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxaController],
      providers: [TaxaService],
    }).compile();

    controller = module.get<TaxaController>(TaxaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
