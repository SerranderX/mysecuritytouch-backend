import { Module, forwardRef } from '@nestjs/common';
import { AutoIncService } from './auto-inc.service';
import { MorganModule } from 'nest-morgan';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AiSchema } from '../../schemas/ai.schema';

@Module({
  imports:[MorganModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Ai', schema: AiSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [AutoIncService],
  exports: [AutoIncService]
})

export class AutoIncModule {}
