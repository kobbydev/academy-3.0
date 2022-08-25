import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Schema for user signup
const userSchema = new Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    emailAddress: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    password: { type: String, require: true },
    salt: { type: String },
    role: { type: String },
    is_admin: { type: Boolean },
    is_applied: { type: Boolean }
  },
  { timestamps: true }
);

export const User = model('User', userSchema);

const applicationSchema = new Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    emailAddress: { type: String, require: true },
    dateOfBirth: { type: Date },
    address: { type: String, require: true },
    university: { type: String, require: true },
    courseOfStudy: { type: String, require: true },
    cgpa: { type: Number, require: true },
    image: { type: String, require: true },
    cv: { type: String, require: true },
    app_status: { type: String }
  },
  { timestamps: true }
);

export const userApplication = model('userApplication', applicationSchema);
