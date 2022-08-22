import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private orgService: OrganizationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  async addNew(
    @Body() organization: CreateOrganizationDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpe?g|png)/i }),
        ],
        exceptionFactory: (error: string) => {
          /**
           * Check if error is because of size validation failure
           */
          if (error.includes('expected size is less than')) {
            throw new BadRequestException(
              'Logo size cannot be greater than 2 MB.',
            );
          } else if (error) {
            console.log(error);
            throw new BadRequestException(
              'Logo can only be either a jpeg or png image',
            );
          }
        },
      }),
    )
    logo: Express.Multer.File,
  ) {
    const organizationDoc = await this.orgService.addNew(organization, logo);
    return organizationDoc;
  }
}
