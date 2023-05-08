import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

const ModalProf = ({
  isOpen,
  onClose,
  edit,
  disciplinas,
  turmas,
  resgataProfessores,
}) => {
  const [name, setName] = useState(edit.data ? edit.data.name : "");
  const [email, setEmail] = useState(edit.data ? edit.data.email : "");
  const [senha, setSenha] = useState(edit.data ? edit.data.senha : "");
  const [disciplina, setDisciplina] = useState(
    edit.data ? edit.data.disciplina._id : ""
  );
  const [turma, setTurma] = useState(edit.data ? edit.data.turma._id : "");
  const { usePost, usePut } = useApi();

  const handleSave = async () => {
    if (!name || !email || !senha || !disciplina || !turma) return;
    await usePost("/professores/", {
      name,
      email,
      senha,
      disciplina,
      turma,
    });
    resgataProfessores();
    onClose();
  };

  const handleUpdate = async () => {
    if (!name || !email || !senha || !disciplina || !turma) return;
    await usePut("/professores/" + edit.data._id, {
      name,
      email,
      senha,
      disciplina,
      turma,
    });
    resgataProfessores();
    onClose();
  };

  useEffect(() => {
    console.log(turmas);
  }, []);

  const handleForm = async () => {
    if (edit.editable) {
      await handleUpdate();
    } else {
      await handleSave();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Professores</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Disciplina</FormLabel>
                <Select
                  value={disciplina}
                  onChange={(e) => setDisciplina(e.target.value)}
                >
                  <option value={""} disabled>
                    Selecione uma disciplina
                  </option>
                  {disciplinas.map((disciplina) => {
                    return (
                      <option value={disciplina._id}>{disciplina.name}</option>
                    );
                  })}
                </Select>
              </Box>
              <Box>
                <FormLabel>Turma</FormLabel>
                <Select
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                >
                  <option value={""} disabled>
                    Selecione uma turma
                  </option>
                  {turmas.map((turma) => {
                    return <option value={turma._id}>{turma.name}</option>;
                  })}
                </Select>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleForm}>
              {edit.editable ? "Atualizar" : "Salvar"}
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalProf;
