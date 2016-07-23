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

// xablau.structs.add(urlDeAcesso, Schema)
xablau.structs.add('example', exampleSchema)

// xablau.init(db_confs, server);
xablau.init({server: 'localhost', port: 32900, dbname: 'xablau'}, app);

// app.listen(port)
app.listen(8080)

```

### Xablau.init(conf : Object, server : Xablau.Server)
É passado como primeiro parâmetro um objeto que pode conter os atributos `server`, `port`, `dbname`, `user`, `password` referentes ao servidor do `MongoDB`.
O segundo parametro, é a instância do ser servidor.

### Xablau.Server.listen(port : int)
É passado como parâmetro a porta em que o servidor deve ser iniciado.
