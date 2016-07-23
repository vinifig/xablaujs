# XablauJS
XablauJS é um "Headless CMS" feito em Node.js com MongoDB

## Instalação

``` sh
mkdir [project-folder]
cd [project-folder]
npm install xablaujs
```

## Modo de Uso

``` js
'use strict';
const xablau = require('xablaujs');

// Instância do Server
const app = xablau.Server();

// Schemas do Mongoose http://mongoosejs.com/docs/guide.html
var exampleSchema = xablau.Schema({
    name: String
});

// xablau.structs.add(pontoDeAcesso, Schema)
xablau.structs.add('example', exampleSchema)

// xablau.init(db_confs, server);
xablau.init({server: 'localhost', port: 32900, dbname: 'xablau'}, app);

// app.listen(port)
app.listen(8080)

```

### Xablau.init(conf : Object, server : Xablau.Server)
É passado como primeiro parâmetro um objeto que pode conter os atributos `server`, `port`, `dbname`, `user`, `password` referentes ao servidor do `MongoDB`.
O segundo parametro, é a instância do ser servidor.

### Xablau.structs.add(pontoDeAcesso : String, schema : Xablau.Schema)
Adiciona um novo ponto nas URLs do seu Servidor e associa com um Schema.

### Xablau.structs.remove(pontoDeAcesso : String)
Remove um ponto das URLs do seu Servidor.

### Xablau.structs.list()
Lista os pontos de acesso.

### Xablau.structs.remove(urlDeAcesso : String, schema : Xablau.Schema)

### Xablau.Server.listen(port : int)
É passado como parâmetro a porta em que o servidor deve ser iniciado.


## Endpoints

| METHOD |         ENDPOINT         |        USAGE       |      RETURNS     |
|:------:|:------------------------:|:------------------:|:----------------:|
|   GET  | /{pontoDeAcesso}         |   Busca todos os itens da estrutura   |     schema[]      |
|   GET  | /{pontoDeAcesso}/{parametro}/{valor}        |   Busca todos os itens da estrutura com os parametro passados   |     schema[]      |
|  POST  | /{pontoDeAcesso}/        |   Insere um novo item   |     Result      |
| DELETE | /{pontoDeAcesso}         |   Remove todos os itens da estrutura com os parametro passados no cabeçalho   |     Result      |


### Delete

#### /{pontoDeAcesso}

Nos pontos de acesso de inserção devem ser passados N parametros por cabeçalho, sendo N o numero de campos da sua estrutura:

`campo1` : Valor do campo1

`campo2` : Valor do campo2

...

`campon` : valor do campon


### Delete

#### /{pontoDeAcesso}

Nos pontos de acesso de remoção devem ser passados dois parametros no cabeçalho da requisição:

`param` : Nome do campo para a consulta

`value` : Valor do campo para a consulta
