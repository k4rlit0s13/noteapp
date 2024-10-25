  +-----------------+
  |     USUARIO     |
  |-----------------|
  | id (PK)         |<----------------+
  | username        |                 |
  | email           |                 |
  | password        |                 |
  +-----------------+                 |
          |                           |
          | FK: userId                |
          |                           |
  +-----------------+                 |
  |      NOTA       |                 |
  |-----------------|                 |
  | id (PK)         |<----------------+
  | userId (FK)     |<----------------+
  | titulo          |                 |
  | contenido       |                 |
  | updatedAt       |                 |
  +-----------------+                 |
          |                           |
          | FK: noteId, userId        |
          |                           |
  +-----------------+                 |
  |    HISTORIAL    |                 |
  |-----------------|                 |
  | id (PK)         |                 |
  | noteId (FK)     |<----------------+
  | userId (FK)     |<----------------*
  | accion          |
  | timestamp       |
  | contenidoAnterior|
  | contenidoNuevo   |
  +-----------------+


--------------------------------------------------------------

db:

erDiagram
    USUARIO ||--o{ NOTA : crea
    USUARIO {
        string id
        string username
        string email
        string password
    }
    NOTA ||--o{ HISTORIAL : tiene
    NOTA {
        string id
        string userId
        string titulo
        string contenido
        date createdAt
        date updatedAt
    }
    HISTORIAL {
        string id
        string noteId
        string userId
        string accion
        date timestamp
        string contenidoAnterior
        string contenidoNuevo
    }

--------------------------------------------------------------


NOTEAPP
├── node_modules
├── server
│   ├── controllers
│   │   ├── controllers.js
│   │   └── usercontroller.js
│   ├── db
│   │   ├── connectmongo
│   │   │   └── connect.js
│   │   ├── data.sql
│   │   ├── estructure.sql
│   │   └── queries.sql
│   ├── routes
│   │   └── userrouter.js
│   ├── versions
│   │   └── version.js
│   └── text.md
├── src
│   ├── components
│   │   ├── home.vue
│   │   ├── index.vue
│   │   └── signup.vue
│   ├── js
│   │   ├── home.js
│   │   ├── main.js
│   │   └── signup.js
│   ├── storage
│   │   ├── font
│   │   └── img
│   ├── views
│   │    ├── home.html
│   │    └── signup.html
│   └── index.html
├── .env
├── .gitignore
├── app.js
├── certificate.crt
├── certificate.csr
├── package-lock.json
├── package.json
├── private.key
├── README.md
└── vite.config.js


