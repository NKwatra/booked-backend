import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { Organization, OrganizationDocument } from './organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private orgModel: Model<OrganizationDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addNew(organization: CreateOrganizationDto, logo: Express.Multer.File) {
    /**
     * Save the organization document
     */
    const newOrgObj = {
      name: organization.name,
      address: organization.address,
      brandLogo: 'dummy_path',
    };
    const newOrg = new this.orgModel(newOrgObj);
    const newOrgDocument = await newOrg.save();
    /**
     * Upload the brand logo and update document in db
     */
    let uploadedUrl = '';
    try {
      uploadedUrl = await this.cloudinaryService.uploadImage(
        logo,
        newOrgDocument.id,
      );
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error in uploading brand logo');
    }
    newOrgDocument.brandLogo = uploadedUrl;
    const savedDocument = newOrgDocument.save();
    return savedDocument;
  }
}
