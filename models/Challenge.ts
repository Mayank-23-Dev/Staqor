import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRubricItem {
  id: string;
  name: string;
  weight: number;
  criteria: string;
}

export interface IChallengeCode {
  html: string;
  css: string;
  js: string;
}

export interface IChallenge extends Document {
  slug: string;
  title: string;
  track: "html-css" | "javascript" | "react" | "vue";
  difficulty: "easy" | "medium" | "hard";
  spec_markdown: string;
  starter_code: IChallengeCode;
  model_solution: IChallengeCode;
  rubric: IRubricItem[];
  design_spec?: {
    brand_primary?: string;
    requirements?: string[];
  };
  is_active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const RubricItemSchema = new Schema<IRubricItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    criteria: { type: String, required: true },
  },
  { _id: false }
);

const ChallengeCodeSchema = new Schema<IChallengeCode>(
  {
    html: { type: String, default: "" },
    css: { type: String, default: "" },
    js: { type: String, default: "" },
  },
  { _id: false }
);

const ChallengeSchema = new Schema<IChallenge>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    track: {
      type: String,
      enum: ["html-css", "javascript", "react", "vue"],
      required: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
      index: true,
    },
    spec_markdown: { type: String, required: true },
    starter_code: { type: ChallengeCodeSchema, required: true },
    model_solution: { type: ChallengeCodeSchema, required: true },
    rubric: { type: [RubricItemSchema], required: true },
    design_spec: {
      brand_primary: { type: String },
      requirements: { type: [String], default: [] },
    },
    is_active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Challenge: Model<IChallenge> =
  mongoose.models.Challenge ||
  mongoose.model<IChallenge>("Challenge", ChallengeSchema);
