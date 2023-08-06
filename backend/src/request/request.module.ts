import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Company from 'src/models/company.model';
import User from 'src/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Company, User])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
