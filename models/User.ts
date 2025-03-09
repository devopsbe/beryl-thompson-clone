import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'user' | 'admin';
  emailVerified?: Date;
  accounts?: { provider: string; providerAccountId: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: false,
      minlength: [6, 'Password should be at least 6 characters long'],
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    accounts: [new Schema({
      provider: { type: String },
      providerAccountId: { type: String },
    }, { _id: false })],
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate model compilation error in development with hot reloading
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User; 