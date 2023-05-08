import {
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useApi } from "../hooks/useApi";

const ModalAluno = ({ isOpen, onClose, edit, resgataAlunos }) => {
  const [name, setName] = useState(edit.data ? edit.data.name : "");
  const { usePost, usePut } = useApi();

  const handleSave = async () => {
    if (!name) return;
    await usePost("/alunos/", {
      name,
    });
    resgataAlunos();
    onClose();
  };

  const handleUpdate = async () => {
    if (!name) return;
    await usePut("/alunos/" + edit.data._id, {
      name,
    });
    resgataAlunos();
    onClose();
  };

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
          <ModalHeader>Cadastro de Alunos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              {edit.data && (
                <Input disabled={true} type="text" value={edit.data._id} />
              )}
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleForm}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAluno;
