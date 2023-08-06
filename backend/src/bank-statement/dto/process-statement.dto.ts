import { IsString, IsArray, ArrayMaxSize } from 'class-validator';
import { IFile } from '../types';

export class ProcessStatementDto {
  @IsString()
  uen: string;

  @IsString()
  companyName: string;

  @IsString()
  perfiosTransactionId: string;

  @IsArray()
  @ArrayMaxSize(1)
  files: IFile[];
}
