import { Test, TestingModule } from '@nestjs/testing';
import { NaturalistService } from './naturalist.service';

describe('NaturalistService', () => {
  let service: NaturalistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaturalistService],
    }).compile();

    service = module.get<NaturalistService>(NaturalistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
