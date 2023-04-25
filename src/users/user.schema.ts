import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  comparePassword(password: string): Promise<boolean>;
}

// Define a Mongoose schema for the User model
@Schema()
export class User {
  @Prop({ default: new Types.ObjectId(), type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  // Use the "select: false" option to prevent this property from being included
  // in query results by default (for security reasons)
  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;

  // Define a custom toJSON method to remove the version field and password
  // field from the serialized object and replace the _id field with an id field
  toJSON() {
    const { __v, password, ...object } = this.toJSON();
    object.id = this._id;
    return object;
  }
}

// Define a UserDocument type based on the User model and Mongoose's Document type
//export type UserDocument = User & Document;

// Use the SchemaFactory to create a Mongoose schema from the User class
export const UserSchema = SchemaFactory.createForClass(User);

// Define a pre-save hook to hash the password before it is saved to the database
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Define a comparePassword method on the User model to check if a given password
// matches the hashed password in the database
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};
