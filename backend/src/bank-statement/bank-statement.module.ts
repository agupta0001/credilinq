import { Module } from '@nestjs/common';
import { BankStatementService } from './bank-statement.service';
import { BankStatementController } from './bank-statement.controller';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import Resource from '../models/resource.model';

@Module({
  imports: [
    MulterModule.register({
      dest: './temp/',
    }),
    SequelizeModule.forFeature([Resource]),
  ],
  controllers: [BankStatementController],
  providers: [BankStatementService],
})
export class BankStatementModule {}
