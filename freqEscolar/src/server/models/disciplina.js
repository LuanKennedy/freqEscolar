import mongoose from "mongoose";

export const disciplinaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  horario: {
    type: Date,
    required: false,
  },
});

export const mongoDisciplina = async () => {
  return mongoose.model("disciplinas", disciplinaSchema);
};
