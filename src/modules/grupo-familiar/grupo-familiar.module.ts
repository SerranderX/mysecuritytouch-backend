import { Module, forwardRef } from '@nestjs/common';
import { GrupoFamiliarService } from './grupo-familiar.service';
import { GrupoFamiliarController } from './grupo-familiar.controller';
import { MorganModule } from 'nest-morgan';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { GrupoFamiliarSchema } from '../../schemas/grupoFamiliar.schema';

@Module({
  imports: [MorganModule.forRoot(),
    MongooseModule.forFeature([{ name: 'GrupoFamiliar', schema: GrupoFamiliarSchema }]),
    forwardRef(() => AuthModule),],
  providers: [GrupoFamiliarService],
  controllers: [GrupoFamiliarController],
  exports:[GrupoFamiliarService]
})
export class GrupoFamiliarModule {}
