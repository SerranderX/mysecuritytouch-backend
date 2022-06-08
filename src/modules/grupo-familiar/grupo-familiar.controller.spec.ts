import { Test, TestingModule } from '@nestjs/testing';
import { GrupoFamiliarController } from './grupo-familiar.controller';

describe('GrupoFamiliar Controller', () => {
  let controller: GrupoFamiliarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupoFamiliarController],
    }).compile();

    controller = module.get<GrupoFamiliarController>(GrupoFamiliarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
