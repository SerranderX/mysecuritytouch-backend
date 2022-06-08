import { Test, TestingModule } from '@nestjs/testing';
import { DispositivosController } from './dispositivos.controller';

describe('Dispositivos Controller', () => {
  let controller: DispositivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispositivosController],
    }).compile();

    controller = module.get<DispositivosController>(DispositivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
