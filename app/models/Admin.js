import mongoose from 'mongoose';

const { Schema, model } = mongoose;

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

const adminApplication = model('adminApplication', adminApplicationsSchema);
export { adminApplication as default };
