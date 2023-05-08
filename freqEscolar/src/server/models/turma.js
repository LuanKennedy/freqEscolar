import mongoose from "mongoose";

export const turmaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const mongoTurma = async () => {
  return mongoose.model("turmas", turmaSchema);
};
