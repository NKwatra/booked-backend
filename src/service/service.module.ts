import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceController } from './service.controller';
import { Service, ServiceSchema } from './service.schema';
import { ServiceService } from './service.service';

@Module({
  controllers: [ServiceController],
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  providers: [ServiceService],
})
export class ServiceModule {}
