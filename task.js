const readline = require('readline-sync')
const db = require('./db')
const util = require('util')

const query = util.promisify(db.connection.query).bind(db.connection)

function getSingleTaskById(getTaskId) {
  console.log('\n===== BUSCAR TAREFA =====')

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
  console.log('\n===== LISTAR TAREFAS =====')

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
    } catch (e) {
      console.log('Não há conexão com o banco de dados...')
      throw err
    } finally {
      db.connection.end()
    }
  })
}

function createTask(newContent, newStatus) {
  console.log('\n===== ADICIONAR TAREFA =====')

  do {
    newContent = readline.question('\nQual o conteúdo da tarefa?\n')

    if (newContent == '') {
      console.log('O texto não pode ser vazio... Tente novamente...')
    }
  } while (newContent == '')

  readline.setDefaultOptions({
    limit: ['1', '2', '3']
  })
  newStatus = readline.question(
    '\nQual o status da tarefa? [1 - Pendente | 2 - Em andamento | 3 - Completo]\n',
    {
      limitMessage:
        'Desculpe, esse campo aceita apenas números inteiros de 1 até 3... Tente novamente...'
    }
  )

  switch (newStatus) {
    case '1':
      newStatus = 'Pendente'
      break
    case '2':
      newStatus = 'Em andamento'
      break
    case '3':
      newStatus = 'Completo'
  }

  db.connection.connect(function (err) {
    if (err) {
      console.log('Não há conexão com o banco de dados...')
      throw err
    } else {
      query(
        `INSERT INTO todo(content, isDone) VALUES ('${newContent}', '${newStatus}')`,
        function (err, result) {
          if (err) {
            console.log(
              'Não foi possível inserir novas tarefas no banco de dados...'
            )
            throw err
          } else {
            console.log(
              `Nova tarefa com o ID ${result.insertId} foi adicionada.`
            )
          }
        }
      )
    }
    db.connection.end()
  })
}

function updateTask(updateTaskId, newContent, newStatus) {
  console.log('\n===== ALTERAR TAREFA =====')

  updateTaskId = readline.questionInt(
    '\nQual o id da tarefa que você quer atualizar?\n',
    {
      limitMessage:
        'Desculpe, esse campo aceita apenas números inteiros... Tente novamente...'
    }
  )

  do {
    newContent = readline.question('\nQual o novo conteúdo da tarefa?\n')

    if (newContent == '') {
      console.log('O texto não pode ser vazio... Tente novamente...')
    }
  } while (newContent == '')

  readline.setDefaultOptions({
    limit: ['1', '2', '3']
  })
  newStatus = readline.question(
    '\nQual o novo status da tarefa? [1 - Pendente | 2 - Em andamento | 3 - Completo]\n',
    {
      limitMessage:
        'Desculpe, esse campo aceita apenas números inteiros de 1 até 3... Tente novamente...'
    }
  )

  switch (newStatus) {
    case '1':
      newStatus = 'Pendente'
      break
    case '2':
      newStatus = 'Em andamento'
      break
    case '3':
      newStatus = 'Completo'
  }

  db.connection.connect(async function (err) {
    if (err) {
      console.log('Não há conexão com o banco de dados...')
      throw err
    } else {
      let rowUpdateTask = []
      ;(rowUpdateTask = await query(
        `SELECT content, isDone FROM todo WHERE id IN (${updateTaskId})`
      )),
        query(
          `UPDATE todo SET content='${newContent}', isDone='${newStatus}' WHERE id='${updateTaskId}'`
        )
      if (rowUpdateTask.length != 0) {
        console.log(`A tarefa com o ID ${updateTaskId} foi atualizada.`)
      } else {
        console.log(
          `\nNão existe essa tarefa no banco de dados com o ID = ${updateTaskId}... Tente novamente...`
        )
      }
    }
    db.connection.end()
  })
}

function deleteTaskById(deleteTaskId) {
  console.log('\n===== DELETAR TAREFA =====')

  deleteTaskId = readline.questionInt(
    '\nQual o id da tarefa que você quer deletar?\n',
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
      let rowUpdateTask = []
      ;(rowUpdateTask = await query(
        `SELECT content, isDone FROM todo WHERE id IN (${deleteTaskId})`
      )),
        query(`DELETE FROM todo WHERE id='${deleteTaskId}'`)
      if (rowUpdateTask.length != 0) {
        console.log(`A tarefa com o ID ${deleteTaskId} foi removida.`)
      } else {
        console.log(
          `\nNão existe essa tarefa no banco de dados com o ID = ${deleteTaskId}... Tente novamente...`
        )
      }
    }
    db.connection.end()
  })
}

module.exports = {
  getSingleTaskById,
  getAllTasks,
  createTask,
  updateTask,
  deleteTaskById
}
