'use strict';
const xablau = require('xablaujs');

const app = xablau.Server();

// adding api structure datas in xablaujs
var kittySchema = xablau.Schema({
    name: String
});

xablau.structs.add('kitty', kittySchema)

// init with db_info
xablau.init({server: 'localhost', port: 32900, dbname: 'xablau'}, app);

app.listen(8080)
