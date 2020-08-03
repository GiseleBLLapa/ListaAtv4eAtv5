const express = require('express'); //importa o módulo Express
const app = express(); //cria uma aplicação Express
app.use(express.json()); //para decodificar application/json
// para decodificar application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//definição da rota para a raiz
//acesso usando http://localhost:3000/
app.get('/', function (req, res) {
    res.send('Caminho raiz'); // Ok
});
//acesso usando http://localhost:3000/somar/5/10/
app.get('/somar/:cinco/:dez/', function (req, res) {
    let cinco = Number(req.params.cinco);
    let dez = Number(req.params.dez);
    let soma = cinco + dez;
    res.send(soma.toString()); // ok
});
//acesso usando curl -X GET -d "x=12&y=4" http://localhost:3101/diff
app.get('/diff', function (req, res) {
    let { x, y } = req.body;
    let diff = (x - y);
    res.send("Get" + " => " + diff.toString());  //Ok
});
//acesso usando curl -X POST -d "x=12&y=4" http://localhost:3101/diff
app.post('/diff', function (req, res) {
    let { x, y } = req.body;
    let diff = (x - y);
    res.send("Post" + " => " + diff.toString());  //Ok
});

// curl -X POST -d "x=12" http://localhost:3101/diff/4
app.post('/diff/:quatro/', function (req, res) {
    let quatro = Number(req.params.quatro);
    let { x } = req.body;
    let diff = (quatro - x);
    res.send("Post" + " => " + diff.toString());  //Ok
});

// curl -X GET -d "b=2&e=5" http://localhost:3101/pow
// curl -X POST -d "b=2&e=5" http://localhost:3101/pow
// curl -X PUT -d "b=2&e=5" http://localhost:3101/pow
// curl -X DELETE -d "b=2&e=5" http://localhost:3101/pow
app.all('/pow/', function (req, res) {
    let { b, e } = req.body;
    let expo = (b ** e);
    res.send("All" + " => " + expo.toString());  //Ok
});

// curl http://localhost:3101/texto.txt
app.get('/texto.txt', function (req, res) {
    const readline = require('readline')
    const fs = require('fs')
    const readable = fs.createReadStream('../public/texto.txt')   // ok
    const rl = readline.createInterface({
        input: readable
    });
    rl.on('line', (line) => {
        res.send(line);

    });
});

// curl http://localhost:3101/arquivo/txt
app.all('/arquivo/txt', function (req, res) {
    const readline = require('readline')
    const fs = require('fs')
    const readable = fs.createReadStream('../public/texto.txt')   // ok
    const rl = readline.createInterface({
        input: readable
    });
    rl.on('line', (line) => {
        res.send(line);

    });
});

//aceita qualquer método HTTP e URL 
app.use(function (req, res) {
    res.send('Caminho inexistente');   // ok
});

//define a porta e a função callback a ser executada após o servidor iniciar
app.listen(3101, function () {
    console.log("Servidor rodando na porta 3101...");
});