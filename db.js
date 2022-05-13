// Importação do módulo mysql
const mysql = require('mysql')

// Configuração da conexão com o banco
const connection = mysql.createConnection({
  host: '', // O host do banco. localhost
  user: '', // Usuário do banco criado anteriormente. <username>
  password: '', // A senha do usuário do banco. <password>
  database: '' // O banco de dados ao qual a aplicação irá se conectar.
})

module.exports = { connection }
