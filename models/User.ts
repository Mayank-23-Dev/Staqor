import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password_hash: string;
  role: "free" | "pro" | "admin";
  stats: {
    total_solves: number;
    tracks_completed: string[];
    badges_earned: string[];
  };
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      index: true,
    },
    password_hash: {
      type: String,
      required: [true, "Password hash is required"],
    },
    role: {
      type: String,
      enum: ["free", "pro", "admin"],
      default: "free",
    },
    stats: {
      total_solves: { type: Number, default: 0 },
      tracks_completed: { type: [String], default: [] },
      badges_earned: { type: [String], default: [] },
    },
    stripe_customer_id: { type: String },
    stripe_subscription_id: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
