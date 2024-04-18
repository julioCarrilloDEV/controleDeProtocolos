const path = require('path')
//Implementação utilizando express
const express = require('express');
//Carrega para a variável os recursos do express
const app = express ()
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const port = 5000;


app.use(express.static(path.join(__dirname, 'public')));
//Define o padrão .ejs como template engine. 
app.set('view engine', 'ejs');

//para trabalhar com requisições post em node, é necessário o bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

//Caregando meu sequelize
require('./model/conn')

//Rota o servidor na porta especificada
app.listen(port, () => console.log(`App listening in localhost:${port}`));