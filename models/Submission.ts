import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IChallengeCode } from "./Challenge";

export interface ISubmission extends Document {
  user_id: Types.ObjectId;
  challenge_id: Types.ObjectId;
  code_submitted: IChallengeCode;
  attempt_type: "run" | "submit";
  score: number;
  passed: boolean;
  groq_response: Record<string, any>;
  is_public: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    challenge_id: {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
      index: true,
    },
    code_submitted: {
      html: { type: String, default: "" },
      css: { type: String, default: "" },
      js: { type: String, default: "" },
    },
    attempt_type: {
      type: String,
      enum: ["run", "submit"],
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    passed: {
      type: Boolean,
      required: true,
      default: false,
    },
    groq_response: {
      type: Schema.Types.Mixed,
      required: true,
    },
    is_public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

SubmissionSchema.index({ user_id: 1, challenge_id: 1, createdAt: -1 });

export const Submission: Model<ISubmission> =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema);
