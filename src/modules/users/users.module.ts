import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
//Imports 
import { MongooseModule } from '@nestjs/mongoose';
import { MorganModule } from 'nest-morgan';

//Schemas
import { UserSchema } from '../../schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { GrupoFamiliarModule } from '../grupo-familiar/grupo-familiar.module';

@Module({
  imports: [
    MorganModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => GrupoFamiliarModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
