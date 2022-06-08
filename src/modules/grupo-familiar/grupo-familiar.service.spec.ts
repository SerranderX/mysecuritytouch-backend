import { Test, TestingModule } from '@nestjs/testing';
import { GrupoFamiliarService } from './grupo-familiar.service';

describe('GrupoFamiliarService', () => {
  let service: GrupoFamiliarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrupoFamiliarService],
    }).compile();

    service = module.get<GrupoFamiliarService>(GrupoFamiliarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
