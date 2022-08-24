import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { AddServiceDto } from './dto/add-service.dto';
import { Service, ServiceDocument } from './service.schema';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    private cloudinary: CloudinaryService,
  ) {}

  async addService(
    details: AddServiceDto,
    image: Express.Multer.File,
    organization: string,
  ) {
    const newServiceObj = {
      ...details,
      backgroundImage: 'dummy_path',
      organization,
    };
    const newService = new this.serviceModel(newServiceObj);
    const newServiceDoc = await newService.save();
    const imageUrl = await this.cloudinary.uploadImage(
      image,
      newServiceDoc.id.toString(),
    );
    newServiceDoc.backgroundImage = imageUrl;
    const savedService = await newServiceDoc.save();
    const addedService = await this.serviceModel
      .findById(savedService.id)
      .populate('expert');
    const serviceObj = {
      name: addedService.name,
      expert: addedService.expert.name,
      backgroundImage: addedService.backgroundImage,
      id: addedService.id,
    };
    return serviceObj;
  }
}
