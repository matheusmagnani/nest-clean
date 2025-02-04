import { Module } from '@nestjs/common';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CreateAccountController } from './controller/create-account.controller';
import { AuthenticateController } from './controller/authenticate.controller';
import { CreateQuestionController } from './controller/create-question.controller';
import { FetchRecentQuestionController } from './controller/fetch-recent-questions.controller';

@Module({
  imports: [ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController, 
    AuthenticateController, 
    CreateQuestionController,
    FetchRecentQuestionController
  ],
  providers: [PrismaService],
})
export class AppModule {}
