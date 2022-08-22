import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    OrganizationModule,
    MongooseModule.forRoot('mongodb://localhost:27017/booked'),
    CloudinaryModule,
    UserModule,
  ],
})
export class AppModule {}
