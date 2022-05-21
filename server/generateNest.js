const execSync = require('child_process').execSync;


let entity = process.argv[2]
const output = execSync(`cd src && mkdir ${entity} && nest g module ${entity} && nest g service ${entity} && nest g controller ${entity}`, {encoding: 'utf-8'});


