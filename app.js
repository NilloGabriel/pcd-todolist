function printMainMenu() {
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

  console.log('Escolha uma opção:\n')
  for (let index = 0; index < menuOptions.length; index++) {
    console.log(`${index + 1}. ${menuOptions[index]}.`)
  }
}

printMainMenu()
