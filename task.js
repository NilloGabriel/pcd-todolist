const readline = require('readline-sync')
const db = require('./db')
const util = require('util')

const query = util.promisify(db.connection.query).bind(db.connection)
