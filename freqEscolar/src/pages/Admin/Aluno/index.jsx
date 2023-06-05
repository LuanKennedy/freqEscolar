import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import ModalAluno from "../../../components/ModalAluno";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { useApi } from "../../../hooks/useApi";

export default function Aluno() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edit, setEdit] = useState({
    editable: false,
    data: null,
  });
  const [alunos, setAlunos] = useState([]);
  const [faltas, setFaltas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const { useGet, useDelete } = useApi();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  async function resgataAlunos() {
    const response = await useGet("/alunos");
    const alunosResgatados = response.data.body;
    setAlunos(alunosResgatados);
  }

  async function resgataTurmas() {
    const response = await useGet("/turmas");
    const turmasResgatadas = response.data.body;
    setTurmas(turmasResgatadas);
  }

  async function resgataFaltas() {
    const response = await useGet("/faltas");
    const faltasResgatadas = response.data.body;
    console.log(faltasResgatadas);
    setFaltas(faltasResgatadas);
  }

  useEffect(() => {
    resgataAlunos();
    resgataTurmas();
    resgataFaltas();
  }, []);

  const handleRemove = async (id) => {
    const response = await useDelete("/alunos/" + id);
    if (response.status >= 200) {
      await resgataAlunos();
    }
  };

  function handleOpenModal(type, data) {
    if (type == "new") {
      setEdit({
        editable: false,
      });
      onOpen();
    }
    if (type == "edit") {
      setEdit({
        editable: true,
        data,
      });
      onOpen();
    }
  }

  async function handleDownloadReport(id) {
    const faltasAluno = faltas.filter((falta) => {
      return falta.aluno != undefined && falta.aluno._id === id;
    });
    const aluno = alunos.find((aluno) => aluno._id === id);

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Relatório de Faltas", 20, 20);

    doc.setFontSize(16);

    faltasAluno.forEach((falta, index) => {
      doc.text(`Falta ${index + 1}:`, 20, 40 + index * 20);
      doc.text(`Data: ${falta.data}`, 40, 50 + index * 20);
      doc.text(`Disciplina: ${falta.disciplina.name}`, 40, 60 + index * 20);
      doc.text(`Professor: ${falta.professor.name}`, 40, 70 + index * 20);
      doc.text("------------------------------", 20, 80 + index * 20);
    });

    doc.save(`relatorio_faltas_${aluno.name}.pdf`);
  }

  function possuiFalta(id) {
    const faltasAluno = faltas.filter((falta) => {
      return falta.aluno != undefined && falta.aluno._id === id;
    });
    return faltasAluno.length > 0;
  }

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
      flexDirection={"column"}
    >
      <NavbarAdmin />
      <Box maxW={900} w="100%" height={"calc(100vh - 72px)"} py={10}>
        <Button colorScheme="blue" onClick={() => handleOpenModal("new", null)}>
          Novo aluno
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {alunos.map(({ name, _id, emailResponsavel, turma }) => (
                <Tr key={_id} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>

                  {possuiFalta(_id) ? (
                    <Td p={0}>
                      <DownloadIcon
                        fontSize={20}
                        onClick={() => handleDownloadReport(_id)}
                      />
                    </Td>
                  ) : (
                    <Td p={0}></Td>
                  )}

                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() =>
                        handleOpenModal("edit", {
                          name,
                          emailResponsavel,
                          turma,
                          _id,
                        })
                      }
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(_id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        {isOpen && (
          <ModalAluno
            isOpen={isOpen}
            onClose={onClose}
            edit={edit}
            resgataAlunos={resgataAlunos}
            turmas={turmas}
          />
        )}
      </Box>
    </Flex>
  );
}
