import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Admin sign up schema
const adminSchema = new Schema(
  {
    profileImage: { type: String },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    emailAddress: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    password: { type: String, require: true },
    salt: { type: String },
    role: { type: String },
    is_admin: { type: Boolean },
    country: { type: String, require: true },
    address: { type: String, require: true }
  },
  { timestamps: true }
);

export const Admin = model('Admin', adminSchema);

// admin create application schema
const adminApplicationsSchema = new Schema(
  {
    link: { type: String, require: true },
    dateOfApplication: { type: Date, require: true },
    batchId: { type: String, require: true },
    instructions: { type: String },
    applicationFile: { type: String }
  },
  { timestamps: true }
);

export const adminApplication = model('adminApplication', adminApplicationsSchema);
// export { adminApplication as default };

// Schema for creating assessment by the admin
const createAssessmentSchema = new Schema({
  question: { type: String, require: true },
  optionA: { type: String, require: true },
  optionB: { type: String, require: true },
  optionC: { type: String, require: true },
  optionD: { type: String, require: true },
  correctAnswer: { type: String, required: true }
});

export const createAssessment = model('createAssessment', createAssessmentSchema);
