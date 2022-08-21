import { Inject, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { CLOUDINARY_TOKEN } from './constants';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(CLOUDINARY_TOKEN) private cloudinary: any) {}

  uploadImage(image: Express.Multer.File, path?: string) {
    return new Promise<string>((resolve, reject) => {
      /**
       * convert image to base64 encoding, so that it can be uploaded
       * to cloudinary
       */
      const encoding = 'base64';
      const extension = extname(image.originalname);
      const imageUri = `data:image/${extension.slice(
        1,
      )};${encoding},${image.buffer.toString('base64')}`;

      this.cloudinary.uploader.upload(
        imageUri,
        {
          public_id: path,
        },
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result.secure_url);
        },
      );
    });
  }
}
