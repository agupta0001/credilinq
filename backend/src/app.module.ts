import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankStatementModule } from './bank-statement/bank-statement.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    BankStatementModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'credilinq',
      password: 'credilinq',
      database: 'credilinq',
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
    }),
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
