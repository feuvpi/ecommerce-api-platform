import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ default: new Types.ObjectId(), type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;

  toJSON() {
    const { __v, password, ...object } = this.toJSON();
    object.id = this._id;
    return object;
  }
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
