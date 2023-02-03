import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    const usersData = await this.userModel.find();
    if (!usersData || usersData.length == 0) {
        console.log("Error: no data");
    }
    return usersData;
  }

  async findOne(id: string): Promise<User> {
    if (mongoose.Types.ObjectId.isValid(id)) {
          const userData = await this.userModel.findById(id);
    if (!userData) {
        console.log("Error: no data");
    }
    return userData;
    }else {
      console.log("Error: the id is not in a valid format");
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id,updateUserDto);
    return updatedUser;
  }

  async remove(id: string) {
    const removedUser = await this.userModel.findByIdAndDelete(id);
    return removedUser;
  }
  
}
