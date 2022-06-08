import { Module, forwardRef } from '@nestjs/common';
import { DispositivosService } from './dispositivos.service';
import { DispositivosController } from './dispositivos.controller';
import { MorganModule } from 'nest-morgan';
import { MongooseModule } from '@nestjs/mongoose';
import { DispositivoSchema } from '../../schemas/dispositivo.schema';
import { AuthModule } from '../auth/auth.module';
import { AutoIncModule } from '../auto-inc/auto-inc.module';

@Module({
  imports:[MorganModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Dispositivo', schema: DispositivoSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => AutoIncModule)
  ],
  providers: [DispositivosService],
  controllers: [DispositivosController],
  exports: [DispositivosService]
})
export class DispositivosModule {}
