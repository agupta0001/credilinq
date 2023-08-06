import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { generateTransactionID } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/sequelize';
import Resource from '../models/resource.model';
import { IFile } from './types';
import { ProcessStatementDto } from './dto/process-statement.dto';
import * as fs from 'fs/promises';

@Controller('bank-statement')
export class BankStatementController {
  constructor(
    @InjectModel(Resource)
    private resourceModel: typeof Resource,
  ) {}

  @Get('initialTransaction')
  getInitialTransaction(): { perfiosTransactionId: string } {
    return {
      perfiosTransactionId: generateTransactionID(),
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'application/pdf' })],
      }),
    )
    file: Express.Multer.File,
    @Body() formData: { uen: string },
  ): Promise<IFile> {
    console.log({ formData });
    const resource = await this.resourceModel.create({
      uen: formData.uen,
      path: file.path,
    });

    return {
      ...file,
      resourceId: resource.id,
    };
  }

  @Post('process/statements')
  async processStatement(@Body() processStatementDto: ProcessStatementDto) {
    try {
      const file = await fs.readFile(processStatementDto.files[0].path);

      // do the processing of statement

      return {
        valid: true,
      };
    } catch {
      return { valid: false };
    }
  }
}
