//Implementação utilizando express
const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes')
const app = express()
const port = 5000;

// Configuração do express-session
app.use(session({
    secret: 'Eq221VcA', // Chave secreta para assinar o cookie da sessão
    resave: false, // Evita que a sessão seja regravada no servidor a cada requisição
    saveUninitialized: true, // Não salva sessões vazias (sem dados)
    cookie: { secure: false } // Permite o uso de cookies via HTTP
  }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'controller')));

//para trabalhar com requisições post em node, é necessário o bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', routes);

//Caregando meu sequelize
require('./model/conn')

//Rota o servidor na porta especificada
app.listen(port, () => console.log(`App listening in localhost:${port}`));