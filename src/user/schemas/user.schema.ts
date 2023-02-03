import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/auth/models/role.enum";

export type UserDocument = User & Document;

@Schema()
export class Favorites{
    @Prop()
    _id: string; 
}

@Schema()
export class Badges{
    @Prop()
    name: string;
}


@Schema()
export class Notification_list{
    @Prop()
    name: string;
}

@Schema()
export class Groups{
    @Prop()
    name: string;
}

@Schema()
export class User {
    @Prop({ required: true })
    fisrt_name: string;

    @Prop()
    last_name: string;

    @Prop({ required: true })
    user_name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: Role.USER })
    role: Role;

    @Prop([Object])
    favorites: Array<Favorites>;

    @Prop()
    address: string;

    @Prop([Object])
    badges: Array<Badges>;

    @Prop([Object])
    notifications_list: Array<Notification_list>;

    @Prop([Object])
    groups: Array<Groups>;

}

export const UserSchema = SchemaFactory.createForClass(User);