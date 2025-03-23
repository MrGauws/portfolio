import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  demoLink: string;
  githubLink: string;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  demoLink: { type: String, required: true },
  githubLink: { type: String, required: true },
});

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
