const axios = require('axios')

exports.homeRoutesT = (req, res) =>{
    axios.get('https://ads-mackenzie.herokuapp.com/api/turmas')
    .then(function(response){
        res.render('index', { turmas : response.data});
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.homeRoutesD = (req, res) =>{
    axios.get('https://ads-mackenzie.herokuapp.com/api/disciplinas')
    .then(function(response){
        res.render('/', { disciplina : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.add_turma = (req, res) =>{
    res.render('add_turma')
}

exports.add_aluno = (req, res) =>{
    res.render('add_aluno')
}

exports.add_professor = (req, res) =>{
    res.render('add_professor')
}

exports.add_disciplina = (req, res) =>{
    res.render('add_disciplina')
}

exports.update_disciplina = (req, res) =>{
    axios.get('https://ads-mackenzie.herokuapp.com/api/disciplinas', { params : { id : req.query.id }})
    .then(function(disciplinaData){
        res.render("update_disciplina", { disciplina : disciplinaData.data})
    })
    .catch(err =>{
        res.send(err);
    })
    res.render('update_disciplina')
}

exports.update_turma = (req, res) =>{
    axios.get('https://ads-mackenzie.herokuapp.com/api/turmas', { params : { id : req.query.id }})
    .then(function(turmadata){
        res.render("update_turma", { turma : turmadata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}
exports.update_professor = (req, res) =>{
    axios.get('https://ads-mackenzie.herokuapp.com/api/professores', { params : { id : req.query.id }})
    .then(function(professordata){
        res.render("update_professor", { professor : professordata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}
exports.update_aluno = (req, res) =>{
    axios.get('https://ads-mackenzie.herokuapp.com/api/alunos', { params : { id : req.query.id }})
    .then(function(alunodata){
        res.render("update_aluno", { aluno : alunodata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}

