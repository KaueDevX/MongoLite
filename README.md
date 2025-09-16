# mongolitedb

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**mongolitedb** é uma biblioteca Node.js que oferece um banco de dados estilo MongoDB, totalmente **offline/local**, inspirado no **Mongoose**.  
Permite criar **Schemas**, **Models**, validações básicas e realizar operações CRUD em arquivos `.db`.

---

## ⚡ Funcionalidades

- Criar collections (`Coleções`)
- Inserir documentos
- Buscar documentos
- Deletar documentos
- Armazenamento local em arquivo `.db`
- Criar **Schemas** com validações de tipo e obrigatoriedade
- Criar **Models** para collections
- Operações CRUD simples (`insertOne`, `insertMany`, `find`, `findOne`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`)

## 📦 Instalação

```bash
npm install mongolitedb
```

## 🚀 Uso Básico

```js
const mongolitedb = require("mongolitedb");

// Cria ou Abre um banco local
const Database = new mongolitedb("MyDatabase.db");

// Define schema
const userSchema = Database.Schema({
  name: { type: String, required: true },
  age: { type: Number },
});

// Cria model
const Users = Database.model("users", userSchema);

// Insere documento
Users.insertOne({ name: "Alice", age: 25 });

// Busca documento
const result = Users.findOne({ name: "Alice" });
console.log(result);
```

### Database

- `new mongolitedb(filePath)`  
  Cria ou abre um banco de dados local.  
  **Parâmetros:**

  - `filePath` (string): caminho do arquivo `.db`

- `.Schema(definition)`  
  Cria um schema para validar documentos.  
  **Parâmetros:**

  - `definition` (object): objeto com os campos e regras (type, required, min, max, default, unique)

- `.model(name, schema)`  
  Cria um model (collection) baseado em um schema.  
  **Parâmetros:**
  - `name` (string): nome da collection
  - `schema` (Schema): schema previamente criado

---

### Model

- `.insertOne(doc)`  
  Insere um documento único na collection.  
  **Parâmetros:**

  - `doc` (object): documento a ser inserido

- `.insertMany([docs])`  
  Insere múltiplos documentos.  
  **Parâmetros:**

  - `docs` (array): array de documentos

- `.find(filter)`  
  Retorna todos os documentos que batem com o filtro.  
  **Parâmetros:**

  - `filter` (object): objeto com os campos para filtrar

- `.findOne(filter)`  
  Retorna o primeiro documento que bate com o filtro.  
  **Parâmetros:**

  - `filter` (object)

- `.updateOne(filter, update)`  
  Atualiza o primeiro documento que bate com o filtro.  
  **Parâmetros:**

  - `filter` (object): filtro do documento a atualizar
  - `update` (object): campos a atualizar

- `.updateMany([filters], update)`  
  Atualiza múltiplos documentos que batem com os filtros.  
  **Parâmetros:**

  - `filters` (array de objects)
  - `update` (object)

- `.deleteOne(filter)`  
  Remove o primeiro documento que bate com o filtro.  
  **Parâmetros:**

  - `filter` (object)

- `.deleteMany([filters])`  
  Remove múltiplos documentos que batem com os filtros.  
  **Parâmetros:**
  - `filters` (array de objects)
