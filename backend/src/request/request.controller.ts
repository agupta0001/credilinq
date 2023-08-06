import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Company from 'src/models/company.model';
import { SubmitFormDto } from './dto/submit-form.dto';
import User from 'src/models/user.model';
import { Sequelize } from 'sequelize-typescript';

@Controller('request')
export class RequestController {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  @Get('entitySearch/:uen')
  async searchEntity(@Param('uen') uen: string) {
    const companyByUEN = await this.companyModel.findOne({
      where: {
        uen,
      },
    });

    if (!companyByUEN) return {};

    return companyByUEN;
  }

  @Post('submit')
  async saveForm(@Body() formData: SubmitFormDto) {
    try {
      await this.sequelize.transaction(async (transaction) => {
        const business = await this.companyModel.create(
          {
            ...formData.business,
          },
          { transaction },
        );

        const user = await this.userModel.create(
          {
            ...formData.user,
            uen: formData.business.uen,
          },
          { transaction },
        );
      });

      return { success: true };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }
}
