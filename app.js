const read = require('readline-sync')
const tasks = require('./task')

function mainMenu() {
  const title = '\n===== PCD - TODO LIST ====='
  const author = "===== Gabriel D'Nillo =====\n"
  const menuOptions = [
    'Adicionar uma tarefa',
    'Editar uma tarefa',
    'Listar tarefas',
    'Buscar tarefa',
    'Deletar uma tarefa',
    'Sair do programa'
  ]

  console.log(title)
  console.log(author)

  for (let index = 0; index < menuOptions.length; index++) {
    console.log(`${index + 1}. ${menuOptions[index]}.`)
  }

  input = read.questionInt('\nEscolha uma opção:\n', {
    limitMessage:
      'Desculpe, esse campo aceita apenas números inteiros de 1 até 6... Tente novamente...'
  })
  switch (input) {
    case 1:
      tasks.createTask()
      break
    case 2:
      tasks.updateTask()
      break
    case 3:
      tasks.getAllTasks()
      break
    case 4:
      tasks.getSingleTaskById()
      break
    case 5:
      tasks.deleteTaskById()
      break
    case 6:
      console.log('O programa fechou...')
      process.exit()
    default:
      console.log(
        'Desculpe, esse campo aceita apenas números inteiros de 1 até 6... Tente novamente...'
      )
  }
}

mainMenu()
