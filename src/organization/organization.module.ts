import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './organization.schema';

@Module({
  providers: [OrganizationService],
  controllers: [OrganizationController],
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
})
export class OrganizationModule {}
