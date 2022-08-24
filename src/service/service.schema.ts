import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import * as mongoose from 'mongoose';
import { Organization } from '../organization/organization.schema';

export type ServiceDocument = Service & mongoose.Document<any, any, Service>;

@Schema()
export class Service {
  @Prop({ required: true, trim: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  expert: User;
  @Prop({ required: true })
  backgroundImage: string;
  @Prop({ required: true, type: [Number] })
  availableDays: number[];
  @Prop([String])
  holidays: string[];
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  schedule: { [key: string]: Array<{ startTime: string; endTime: string }> };
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organization',
  })
  organization: Organization;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
