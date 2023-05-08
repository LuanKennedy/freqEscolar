import services from "../services/render"
import controllerTurma from "../controllers/turmaController"
import controllerAluno from "../controllers/alunoController"
import controllerProfessor from "../controllers/professorController"
import controllerDisciplina from "../controllers/disciplinaController";

const appRoutes = express.Router();

appRoutes.get('/', services.homeRoutesT);

appRoutes.get('/add-turma', services.add_turma)

appRoutes.get('/add-disciplina', services.add_disciplina)

appRoutes.get('/add-professor', services.add_professor)

appRoutes.get('/add-aluno', services.add_aluno)


appRoutes.get('/update-turma', services.update_turma)
appRoutes.get('/update-aluno', services.update_aluno)

appRoutes.get('/update-professor', services.update_professor)

appRoutes.get('/update-disciplina', services.update_disciplina)

//API

appRoutes.post('/api/turmas', controllerTurma.create);
appRoutes.get('/api/turmas', controllerTurma.find);
appRoutes.put('/api/turmas/:id', controllerTurma.update);
appRoutes.delete('/api/turmas/:id', controllerTurma.delete);

appRoutes.post('/api/alunos', controllerAluno.create);
appRoutes.get('/api/alunos', controllerAluno.find);
appRoutes.put('/api/alunos/:id', controllerAluno.update);
appRoutes.delete('/api/alunos/:id', controllerAluno.delete);

appRoutes.post('/api/disciplinas', controllerDisciplina.create);
appRoutes.get('/api/disciplinas', controllerDisciplina.find);
appRoutes.put('/api/disciplinas/:id', controllerDisciplina.update);
appRoutes.delete('/api/disciplinas/:id', controllerDisciplina.delete);

appRoutes.post('/api/professores', controllerProfessor.create);
appRoutes.get('/api/professores', controllerProfessor.find);
appRoutes.put('/api/professores/:id', controllerProfessor.update);
appRoutes.delete('/api/professores/:id', controllerProfessor.delete);
