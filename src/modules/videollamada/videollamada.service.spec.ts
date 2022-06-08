import { Test, TestingModule } from '@nestjs/testing';
import { VideollamadaService } from './videollamada.service';

describe('VideollamadaService', () => {
  let service: VideollamadaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideollamadaService],
    }).compile();

    service = module.get<VideollamadaService>(VideollamadaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
