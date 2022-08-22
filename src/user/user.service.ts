import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddAdminDto } from './dtos/add-admin.dto';
import { UserType } from './enums/user-type.enum';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addAdmin(user: AddAdminDto) {
    /**
     * Search for existing user with given email
     */
    const existingUser = await this.userModel.findOne({ email: user.email });
    let savedUser;
    /**
     * If not found add the new user
     * else push orgId to list of organization
     */
    if (existingUser) {
      savedUser = await this.userModel.findByIdAndUpdate(
        existingUser.id,
        {
          $push: { organizations: user.organization },
        },
        { new: true },
      );
    } else {
      const newUser = {
        name: user.name,
        email: user.email,
        organizations: [user.organization],
        userType: UserType.ADMIN,
      };
      const userDoc = new this.userModel(newUser);
      savedUser = userDoc.save();
    }
    return savedUser;
  }
}
