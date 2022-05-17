# PCD Todolist

Uma aplicação simples de lista de afazeres que executa apenas na interface linha de comando (cli).

## Pré-requesitos

Você precisa de um servidor mysql instalado e configurar um usuário apropriado para executar o projeto. Também é preciso ter o nodejs instalado.

### Instalando e Configurando o MYSQL no Linux (Debian-based)

Instale o MYSQL:

```shell
sudo apt install mysql-server
```

Inicie o servidor do MYSQL:

```shell
sudo /etc/init.d/mysql start
```

Logo depois de iniciar o servidor do MySQL, execute os prompts de segurança do mysql, basta digita o comando:

```shell
sudo mysql_secure_installation
```

Faça login como root e adicione um usuário:

```shell
sudo mysql -u root -p
```

```shell
$ mysql -uroot
mysql> CREATE USER '<username>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
```

Após criar o usuário preencha o <'username'> e o <'password'> no arquivo [db.js](https://github.com/XatubaPox/pcd-todolist/blob/main/db.js).

Conceda privilégios para esse usuário (pode conceder menos privilégios se quiser):

```shell
mysql> GRANT ALL PRIVILEGES ON *.* TO '<username>'@'localhost' WITH GRANT OPTION;
```

Saia do usuário root, logue com o usuário que acabou de criar, crie um banco de dados e use (comando USE) o banco de dados para executar operações SQL dentro dele:

```shell
mysql> quit
$ mysql -u <username> -p
Enter password: ***
mysql> CREATE DATABASE pcdtodolist;
mysql> USE pcdtodolist;
```

Crie uma tabela para as tarefas com o seguinte comando:

```shell
mysql> CREATE TABLE todo (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> content VARCHAR(500) NOT NULL,
    -> isDone VARCHAR(30) NOT NULL,
    -> PRIMARY KEY (id)
    -> );
```

## Instalando dependências do projeto

```shell
$ npm i
```

## Rodando o projeto

```shell
$ node app.js
```
