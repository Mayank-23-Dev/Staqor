import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IAttemptCount extends Document {
  user_id: Types.ObjectId;
  challenge_id: Types.ObjectId;
  run_count: number;
  submit_count: number;
  createdAt: Date;
  updatedAt: Date;
}

const AttemptCountSchema = new Schema<IAttemptCount>(
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
    run_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    submit_count: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Unique compound index: one attempt record per user per challenge
AttemptCountSchema.index({ user_id: 1, challenge_id: 1 }, { unique: true });

export const AttemptCount: Model<IAttemptCount> =
  mongoose.models.AttemptCount ||
  mongoose.model<IAttemptCount>("AttemptCount", AttemptCountSchema);
