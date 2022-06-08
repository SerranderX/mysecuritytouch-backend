import { Test, TestingModule } from '@nestjs/testing';
import { VideollamadaController } from './videollamada.controller';

describe('Videollamada Controller', () => {
  let controller: VideollamadaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideollamadaController],
    }).compile();

    controller = module.get<VideollamadaController>(VideollamadaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
