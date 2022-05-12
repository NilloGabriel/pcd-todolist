const readline = require('readline-sync')
const db = require('./db')
const util = require('util')

const query = util.promisify(db.connection.query).bind(db.connection)

function getSingleTaskById(getTaskId) {
  getTaskId = readline.questionInt(
    '\nQual o id da tarefa que você quer buscar?\n',
    {
      limitMessage:
        'Desculpe, esse campo aceita apenas números inteiros... Tente novamente...'
    }
  )

  db.connection.connect(async function (err) {
    if (err) {
      console.log('Não há conexão com o banco de dados...')
      throw err
    } else {
      let rowFoundTask = []
      rowFoundTask = await query(
        `SELECT content, isDone FROM todo WHERE id IN (${getTaskId})`
      )
      if (rowFoundTask.length != 0) {
        for (let index = 0; index < rowFoundTask.length; index++) {
          console.log(
            `\n===== TAREFA =====\n\n` +
              'Conteúdo da tarefa:\n ' +
              rowFoundTask[index].content +
              '\nStatus da tarefa:\n ' +
              rowFoundTask[index].isDone
          )
        }
      } else {
        console.log(
          '\nNão existe essa tarefa no banco de dados... Tente novamente...'
        )
      }
    }
    db.connection.end()
  })
}

function getAllTasks() {
  db.connection.connect(async function (err) {
    try {
      let rowAllFoundTasks = []
      rowAllFoundTasks = await query('SELECT * FROM todo')

      if (rowAllFoundTasks != 0) {
        console.log('\n===== TAREFAS =====')
        for (let index = 0; index < rowAllFoundTasks.length; index++) {
          console.log(
            `\n==== Tarefa ${index + 1} ====\n` +
              '\nConteúdo da tarefa:\n ' +
              rowAllFoundTasks[index].content +
              '\nStatus da tarefa:\n ' +
              rowAllFoundTasks[index].isDone
          )
        }
      } else {
        console.log(
          '\nNão existe tarefas no banco de dados... Tente novamente...'
        )
      }
    } catch (error) {
      console.log('Não há conexão com o banco de dados...', error.message)
      throw err
    } finally {
      db.connection.end()
    }
  })
}
