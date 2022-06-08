import { Module, forwardRef } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '../config/config.module';

@Module({
  providers: [EmailService],
  imports: [ConfigModule],
  exports: [EmailService]
})
export class EmailModule {}
