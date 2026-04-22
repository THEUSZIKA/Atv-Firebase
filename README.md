#  Projeto Firebase - Controle de Acesso por Cargo

##  Descrição

Aplicação web utilizando Firebase para autenticação e controle de acesso baseado em cargos (**admin** e **user**).

---

## 🗄️ Estrutura do Banco (Realtime Database)

```json
{
  "users": {
    "uid": {
      "email": "user@email.com",
      "role": "user | admin"
    }
  },
  "admin-data": {
    "segredo": "Apenas administradores podem acessar"
  },
  "user-data": {
    "uid": {
      "dados": "Dados específicos do usuário"
    }
  }
}
```

###  Explicação

* **/users** → Armazena os usuários cadastrados e seus cargos
* **/admin-data** → Dados restritos apenas para administradores
* **/user-data** → Dados individuais de cada usuário

---

##  Regras de Segurança

* Usuários só podem acessar seus próprios dados
* Apenas usuários com cargo **admin** podem acessar `/admin-data`
* Controle feito através do campo `role` no banco

---

##  Funcionalidades

* Cadastro e login com Firebase 
* Armazenamento do cargo do usuário
* Interface separada para **admin** e **user**
* Controle de acesso baseado em regras do Firebase

---

##  Tecnologias

* JavaScript
* Firebase Authentication
* Firebase Realtime Database

---
