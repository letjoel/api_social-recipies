import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, GroupDocument } from "./schemas/group.schema";
import mongoose from 'mongoose';
@Injectable()
export class GroupService {

  constructor( 
    @InjectModel(Group.name) private readonly groupModel: Model<Group>, 
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const newGroup = new this.groupModel(createGroupDto);
    return await newGroup.save();
  }

  async findAll(): Promise<Group[]> {
    const groupsData = await this.groupModel.find()
      .populate({ path: 'recepies._id' })
      .setOptions({ sanitizeFilter: true })
      .exec();
    if (!groupsData || groupsData.length == 0) {
        console.log("Error: no data");
    }
    return groupsData;
  }


  async findOne(id: string): Promise<Group> {
    if (mongoose.Types.ObjectId.isValid(id)) {
        const groupData = await this.groupModel.findById(id)
      
      if (!groupData) {
          console.log("Error: no data");
      }
      return groupData;
    }
      else {
          console.log("Error: the id is not in a valid format");
      }
  }


  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const updatedGroup = await this.groupModel.findByIdAndUpdate(id,updateGroupDto);
    return updatedGroup;
  }

  async remove(id: string) {
    const removedGroup = await this.groupModel.findByIdAndDelete(id);
    return removedGroup;
  }


}
