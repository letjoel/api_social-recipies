import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import mongoose, { Model } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './schemas/notification.schema';


@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>,
  ) {}

  //Pending: only admin of a group can do that
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(createNotificationDto: CreateNotificationDto) {
    const newNotification = new this.notificationModel(createNotificationDto);
    return await newNotification.save();
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<Notification[]> {
    const notificationsData = await this.notificationModel.find();
    if (!notificationsData || notificationsData.length == 0) {
      console.log("Error: no data");
    }
    return notificationsData;
  }

  //Pending: only if user is subscribed can do that
  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(id: string) {
    if (mongoose.Types.ObjectId.isValid(id)) {
    const singleNotificationData = await this.notificationModel.findById(id)
    return singleNotificationData;
    }
  }

  //Pending: only group admin can do that
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const updatedNotification = await this.notificationModel.findByIdAndUpdate(id,updateNotificationDto);

    return updatedNotification;
  }

  //Pending: only group admin can do that
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(id: string) {
    const removedNotification = await this.notificationModel.findByIdAndDelete(id)
    return removedNotification;
  }

}
