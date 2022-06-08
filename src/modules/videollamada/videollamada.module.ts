import { Module } from '@nestjs/common';
import { VideollamadaService } from './videollamada.service';
import { VideollamadaController } from './videollamada.controller';

@Module({
  providers: [VideollamadaService],
  controllers: [VideollamadaController]
})
export class VideollamadaModule {}
