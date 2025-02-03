import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controller/create-account.controller';

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
