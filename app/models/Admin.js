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

export const adminApplication = model('adminApplication', adminApplicationsSchema);
// export { adminApplication as default };

// Schema for creating assessment by the admin
const createAssessmentSchema = new Schema({
  assessmentFile: { type: String },
  questions: { type: String, require: true },
  optionA: { type: String, require: true },
  optionB: { type: String, require: true },
  optionC: { type: String, require: true },
  optionD: { type: String, require: true }
});

export const createAssessment = model('createAssessment', createAssessmentSchema);
