import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  Session,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SerializeList } from '../decorators/serialize-list.decorator';
import { Authorized } from '../decorators/authorization.decorator';
import { UserType } from '../user/enums/user-type.enum';
import { AddServiceDto } from './dto/add-service.dto';
import { ServiceObjectDto } from './dto/service-object.dto';
import { ServiceService } from './service.service';
import { Serialize } from '../decorators/serialize.decorator';

@Controller('service')
export class ServiceController {
  constructor(private service: ServiceService) {}

  @Authorized(UserType.ADMIN)
  @Serialize(ServiceObjectDto)
  @UseInterceptors(FileInterceptor('backgroundImage'))
  @Post()
  async addService(
    @Body() serviceDetails: AddServiceDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpe?g|png)/i }),
        ],
        exceptionFactory: (error: string) => {
          /**
           * Check if error is because of size validation failure
           */
          if (error.includes('expected size is less than')) {
            throw new BadRequestException(
              'Background image size cannot be greater than 10 MB.',
            );
          } else if (error) {
            console.log(error);
            throw new BadRequestException(
              'Background image can only be either a jpeg or png image',
            );
          }
        },
      }),
    )
    backgroundImage: Express.Multer.File,
    @Session() session: any,
  ) {
    const newService = await this.service.addService(
      serviceDetails,
      backgroundImage,
      session.orgId,
    );
    return newService;
  }

  @Authorized(UserType.CUSTOMER)
  @SerializeList(ServiceObjectDto)
  @Get()
  async listServices(
    @Query('page', ParseIntPipe) page: number,
    @Session() session: any,
  ) {
    const userType = session.userType;
    let services;
    if (userType === UserType.EXPERT) {
      services = await this.service.listExpertServices(session.userId, page);
    } else {
      services = await this.service.listOrganizationServices(
        session.orgId,
        page,
      );
    }
    return services;
  }
}
