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
│   └── router
│      
├── src
│   ├── components
│   │   ├── index.vue
│   │   └── home.vue
│   ├── js
│   │   ├── main.js
│   │   └── home.js
│   └── views
│       ├── index.html
│       └── home.html
├── .gitignore
├── app.js
├── .env
├── package-lock.json
├── package.json
└── vite.config.js 