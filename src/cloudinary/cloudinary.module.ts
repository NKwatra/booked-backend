import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CLOUDINARY_TOKEN } from './constants';
import { v2 } from 'cloudinary';

@Global()
@Module({
  providers: [
    {
      provide: CLOUDINARY_TOKEN,
      useFactory: () => {
        v2.config({
          cloud_name: process.env.CLOUDINARY_CLOUD,
          api_key: process.env.CLOUDINARY_API_KEY,
          secure: true,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        return v2;
      },
    },
    CloudinaryService,
  ],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
