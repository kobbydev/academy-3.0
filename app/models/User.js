import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    emailAddress: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    password: { type: String, require: true },
    salt: { type: String }
  },
  { timestamps: true }
);

// eslint-disable-next-line import/prefer-default-export
export const User = model('User', userSchema);
