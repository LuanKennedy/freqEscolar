import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import "./styles.css";

export function Presenca() {
  const [usuario, setUsuario] = useState(null);
  const [dadosProfessor, setDadosProfessor] = useState(null);
  const [alunosTurma, setAlunosTurma] = useState([]);
  const [alunosFaltosos, setAlunosFaltosos] = useState([]);
  const { useGet, usePost } = useApi();

  const handleAlunoClick = (aluno) => {
    let alunoExiste = false;
    alunosFaltosos.forEach((alunoFaltoso) => {
      if (alunoFaltoso == aluno._id) {
        alunoExiste = true;
      }
    });
    if (alunoExiste) {
      return;
    }
    setAlunosFaltosos([...alunosFaltosos, aluno._id]);
  };

  useEffect(() => {
    const dadosUsuario = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(dadosUsuario);
  }, []);

  useEffect(() => {
    if (usuario) {
      obtemDadosProfessorLogado();
    }
  }, [usuario]);

  useEffect(() => {
    if (dadosProfessor) {
      obtemAlunosPorTurma();
    }
  }, [dadosProfessor]);

  useEffect(() => {
    console.log(alunosFaltosos);
  }, [alunosFaltosos]);

  if (!usuario || !dadosProfessor) {
    return <div>Carregando...</div>;
  }

  async function obtemDadosProfessorLogado() {
    const response = await useGet("/professores/" + usuario.idProfessor);
    setDadosProfessor(response.data.body);
  }

  async function obtemAlunosPorTurma() {
    const response = await useGet("/alunos/");
    const alunosTurma = response.data.body.filter(
      (aluno) => aluno.turma._id == dadosProfessor.turma._id
    );
    setAlunosTurma(alunosTurma);
  }

  async function lancaFalta() {
    alunosFaltosos.forEach(async (aluno) => {
      const faltaAlunoData = {
        data: new Date(),
        professor: dadosProfessor._id,
        disciplina: dadosProfessor.disciplina._id,
        aluno,
      };
      await usePost("/faltas", faltaAlunoData);
      alert("Faltas registradas!");
      window.location.href = "/";
    });
  }

  return (
    <div className="container-faltas">
      <h2>Lista de faltas turma: {dadosProfessor.turma.name}</h2>
      <ul className="lista-faltas">
        {alunosTurma.map((aluno) => {
          return (
            <li key={aluno._id} onClick={() => handleAlunoClick(aluno)}>
              {aluno.name}
            </li>
          );
        })}
      </ul>
      <h3>Alunos faltosos:</h3>
      <ul>
        {alunosFaltosos.map((id) => {
          const aluno = alunosTurma.find((aluno) => aluno._id === id);
          return <li key={id}>{aluno.name}</li>;
        })}
      </ul>
      <button onClick={lancaFalta}>Salvar</button>
    </div>
  );
}
