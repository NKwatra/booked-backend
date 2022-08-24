import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Authorized } from '../decorators/authorization.decorator';
import { UserType } from '../user/enums/user-type.enum';
import { AddServiceDto } from './dto/add-service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private service: ServiceService) {}

  @Authorized(UserType.ADMIN)
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
}
