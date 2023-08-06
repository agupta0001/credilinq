import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  ArrayMaxSize,
  IsObject,
  IsEmail,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { IFile } from 'src/bank-statement/types';

class Business {
  @IsString()
  uen: string;

  @IsString()
  name: string;
}

class User {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  position: string;
}

export class SubmitFormDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Business)
  business: Business;

  @IsObject()
  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsArray()
  @ArrayMaxSize(1)
  files: IFile[];

  @IsString()
  perfiosTransactionId: string;
}
