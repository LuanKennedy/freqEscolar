import mongoose from "mongoose";

var usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  idProfessor: {
    type: String,
    required: false,
  },
  senha: {
    type: String,
    requires: true,
  },
  cargo: {
    type: String,
    requires: true,
  },
});

export const mongoUsuario = async () => {
  return mongoose.model("usuarios", usuarioSchema);
};
