import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization &
  Document<any, any, Organization>;

@Schema({
  timestamps: true,
})
export class Organization {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  address: string;

  @Prop({ required: true })
  brandLogo: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
