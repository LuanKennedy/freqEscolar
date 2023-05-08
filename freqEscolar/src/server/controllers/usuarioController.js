import express from "express";
import { mongoUsuario } from "../models/usuario.js";

export const usuarioRouter = express.Router();

usuarioRouter.post("/cadastro", cadastraUsuario);
usuarioRouter.post("/login", efetuaLogin);

const usuario = await mongoUsuario();

async function cadastraUsuario(req, res) {
  if (!req.body) {
    res.status(400).send({ msg: "Content can not be emtpy!" });
    return;
  }
  const usuarioCriado = await usuario.create({
    email: req.body.email,
    senha: req.body.senha,
    cargo: req.body.cargo,
    idProfessor: req.body.idProfessor,
  });
  res.json({
    body: {
      msg: "Usuario cadastrado!",
      data: usuarioCriado,
    },
  });
}

async function efetuaLogin(req, res) {
  if (!req.body) {
    res.status(400).send({ msg: "Content can not be emtpy!" });
    return;
  }
  const usuarioEncontradoPorEmail = await usuario.findOne({
    email: req.body.email,
  });

  if (!usuarioEncontradoPorEmail) {
    return res.status(500).json({
      msg: "Usuário não existe com esse e-mail",
    });
  }

  const usuarioRecebido = {
    email: req.body.email,
    senha: req.body.senha,
  };

  if (
    usuarioRecebido.email != usuarioEncontradoPorEmail.email ||
    usuarioRecebido.senha != usuarioEncontradoPorEmail.senha
  ) {
    return res.status(401).json({
      msg: "Dados incorretos para o login",
    });
  }

  res.json({
    body: {
      msg: "Login efetuado com sucesso!",
      data: usuarioEncontradoPorEmail,
    },
  });
}
