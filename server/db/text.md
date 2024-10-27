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











design view de los cubos:
<html>
<head>
    <title>Notes</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #1c1c1c;
            color: white;
        }
        .header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 20px;
            box-sizing: border-box;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
        }
        .header .icons {
            display: flex;
            gap: 10px;
        }
        .header .icons i {
            font-size: 20px;
            cursor: pointer;
        }
        .container {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
        }
        .note {
            background-color: #ffb6c1;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 10px;
            color: black;
        }
        .note:nth-child(2) {
            background-color: #ffcccb;
        }
        .note:nth-child(3) {
            background-color: #90ee90;
        }
        .note:nth-child(4) {
            background-color: #ffffe0;
        }
        .note:nth-child(5) {
            background-color: #add8e6;
        }
        .add-note {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #333;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            cursor: pointer;
        }
        @media (min-width: 768px) {
            .container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 10px;
                width: 100%;
            }
            .note {
                height: 150px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                margin-bottom: 0;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Notes</h1>
        <div class="icons">
            <i class="fas fa-search"></i>
            <i class="fas fa-info-circle"></i>
        </div>
    </div>
    <div class="container">
        <div class="note" style="background-color: #ffb6c1;">UI concepts worth exsisting</div>
        <div class="note" style="background-color: #ffcccb;">Book Review : The Design of Everyday Things by Don Norman</div>
        <div class="note" style="background-color: #90ee90;">Animes produced by Ufotable</div>
        <div class="note" style="background-color: #ffffe0;">Mangas planned to read</div>
        <div class="note" style="background-color: #add8e6;">Awesome tweets collection</div>
    </div>
    <div class="add-note">
        <i class="fas fa-plus"></i>
    </div>
</body>
</html>






crear note:
<html>
<head>
    <title>Web Page</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body {
            background-color: #2b2b2b;
            color: #b0b0b0;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            height: 100vh;
        }
        .header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 10px 20px;
            box-sizing: border-box;
        }
        .header i {
            font-size: 24px;
            color: #b0b0b0;
        }
        .container {
            text-align: left;
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
        }
        .title {
            font-size: 48px;
            margin: 20px 0;
        }
        .subtitle {
            font-size: 24px;
            color: #b0b0b0;
        }
    </style>
</head>
<body>
    <div class="header">
        <i class="fas fa-arrow-left"></i>
        <div>
            <i class="fas fa-eye"></i>
            <i class="fas fa-save" style="margin-left: 20px;"></i>
        </div>
    </div>
    <div class="container">
        <div class="title">Title</div>
        <div class="subtitle">Type something...</div>
    </div>
</body>
</html>






design view del edit note:
<html>
<head>
    <title>Book Review</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body {
            background-color: #1c1c1c;
            color: #ffffff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 50%;
            margin: 0 auto;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            width: 100%;
        }
        .header i {
            background-color: #3a3a3a;
            padding: 10px;
            border-radius: 10px;
            font-size: 20px;
        }
        .content h1 {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        .content p:last-child {
            font-style: italic;
        }
        @media (max-width: 768px) {
            .container {
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <i class="fas fa-arrow-left"></i>
            <div>
                <i class="fas fa-eye"></i>
                <i class="fas fa-clone"></i>
            </div>
        </div>
        <div class="content">
            <h1>Book Review : The Design of Everyday Things by Don Norman</h1>
            <p>The Design of Everyday Things is required reading for anyone who is interested in the user experience. I personally like to reread it every year or two.</p>
            <p>Norman is aware of the durability of his work and the applicability of his principles to multiple disciplines.</p>
            <p>If you know the basics of design better than anyone else, you can apply them flawlessly anywhere.</p>
        </div>
    </div>
</body>
</html>



design alert save changes:
<html>
<head>
    <title>Save Changes</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body {
            background-color: #333;
            color: #fff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .modal {
            background-color: #000;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            width: 300px;
        }
        .modal i {
            font-size: 30px;
            color: #888;
            margin-bottom: 10px;
        }
        .modal p {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .modal .buttons {
            display: flex;
            justify-content: space-around;
        }
        .modal .buttons button {
            padding: 10px 20px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            flex: 1;
            margin: 0 5px;
        }
        .modal .buttons .discard {
            background-color: red;
            color: white;
        }
        .modal .buttons .save {
            background-color: green;
            color: white;
        }
    </style>
</head>
<body>
    <div class="modal">
        <i class="fas fa-info-circle"></i>
        <p>Save changes?</p>
        <div class="buttons">
            <button class="discard">Discard</button>
            <button class="save">Save</button>
        </div>
    </div>
</body>
</html>



search view:
<html>
<head>
    <style>
        body {
            background-color: #1c1c1c;
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .search-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        .search-input {
            width: 100%;
            padding: 10px 40px 10px 20px;
            border-radius: 20px;
            border: none;
            outline: none;
            font-size: 16px;
            background-color: #333;
            color: #ccc;
        }
        .search-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #ccc;
            cursor: pointer;
        }
        @media (min-width: 768px) {
            .search-container {
                width: 50%;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <div class="search-container">
        <input type="text" class="search-input" placeholder="Search by the keyword...">
        <i class="fas fa-times search-icon"></i>
    </div>
</body>
</html>


view search note not found:
<html>
 <head>
  <title>
   File Not Found
  </title>
  <style>
   body {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #1c1c1c;
            font-family: Arial, sans-serif;
            color: #ffffff;
        }
        .search-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #3a3a3a;
            border-radius: 20px;
            padding: 10px 20px;
            margin-top: 20px;
            width: 80%;
            max-width: 400px;
        }
        .search-bar input {
            background: none;
            border: none;
            outline: none;
            color: #ffffff;
            font-size: 16px;
            width: 100%;
        }
        .search-bar .close-icon {
            margin-left: 10px;
            color: #ffffff;
            cursor: pointer;
        }
        .image-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
        }
        .image-container img {
            width: 300px;
        }
        .message {
            font-size: 16px;
            margin-top: 20px;
            text-align: center;
        }
  </style>
 </head>
 <body>
  <div class="search-bar">
   <input placeholder="Food Recipe" type="text" value="Food Recipe"/>
   <span class="close-icon">
    ×
   </span>
  </div>
  <div class="image-container">
   <img alt="Two people searching for a file with a magnifying glass and a question mark" height="200" src="https://storage.googleapis.com/a1aa/image/7qq02nR00sZRPBUC1KJy5qHvwdVolDO6nkgejGGBgwd4yh1JA.jpg" width="300"/>
   <div class="message">
    File not found. Try searching again.
   </div>
  </div>
 </body>
</html>