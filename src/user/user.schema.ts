import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Organization } from '../organization/organization.schema';
import { UserType } from './enums/user-type.enum';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document<any, any, User>;

@Schema()
export class User {
  @Prop({ required: true, trim: true })
  name: string;
  @Prop({ lowercase: true, required: true, unique: true, trim: true })
  email: string;
  @Prop({ required: true, enum: UserType })
  userType: string;
  @Prop()
  profilePic: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'organization' }],
  })
  organizations: Organization[];
}

export const UserSchema = SchemaFactory.createForClass(User);
