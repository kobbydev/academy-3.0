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
    firstName: { type: String },
    lastName: { type: String },
    emailAddress: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String, },
    university: { type: String, },
    courseOfStudy: { type: String, },
    cgpa: { type: Number, },
    image: { type: String },
    cv: { type: String },
    app_status: { type: String }
  },
  { timestamps: true }
);

export const userApplication = model('userApplication', applicationSchema);
