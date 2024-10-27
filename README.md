URI: 
mongodb://root:campus2023@localhost:27017/
(recordar poner la de atlas para poder dejarlo desplegado)
URIATLAS:
mongodb+srv://kadavzu:carlos123@clustercarlos.qb1yv8u.mongodb.net/


.env:

// atlas
FRONTEND_PORT=3000
BACKEND_PORT=5000
MONGODB_URI=mongodb+srv://kadavzu:carlos123@clustercarlos.qb1yv8u.mongodb.net/notesappdb
MONGODB_DB_NAME=notesappdb
JWT_SECRET=tu_clave_secreta

//local
FRONTEND_PORT=3000
BACKEND_PORT=5000
MONGODB_URI=mongodb://root:campus2023@localhost:27017/noteappdb
MONGODB_DB_NAME=notesappdb
JWT_SECRET=tu_clave_secreta



dependencias: instalar todas

npm i

dependencias: instalar una a una si es posible

npm install vue
npm install cors
npm install dotenv
npm install express
npm install mongodb
npm install mongoose
npm install vite --save-dev
npm install @vitejs/plugin-vue --save-dev
npm install concurrently --save-dev
npm install jsonwebtoken
npm install https fs
npm install cross-env --save-dev
npm install bcrypt
npm install axios cookiejs
npm i cookie-parser

correr:
npm run dev


## API Documentation: 



find user

https://localhost:5000/api/v1/users/authenticate


esta no funciona en testeo de api debido a sus diferentes dependencias con el front y que verifica que la cookie creada contiene los datos y verifica en la db los datos del token y encritpados.




find notes

https://localhost:5000/api/v1/notes/getUserNotes 

no funciona en normal, es neseario una cookie que se crea al logear en el navegador



Create User

### Endpoint

https://localhost:5000/api/v1/users/createuser

**Método:** `POST`  
**Ruta:** `/api/v1/notes/createuser`  

### Description
Este endpoint permite crear un nuevo usuario en la base de datos. Al crear un usuario, se genera un token JWT que se devuelve en la respuesta. Este token puede ser utilizado para autenticación en futuras solicitudes.

### Request Headers
- `Content-Type: application/json`

### Request Body
Debes enviar un JSON con los siguientes campos:

| Field     | Type   | Required | Description                      |
|-----------|--------|----------|----------------------------------|
| username  | String | Yes      | El nombre de usuario del nuevo usuario. Debe ser único. |
| email     | String | Yes      | La dirección de correo electrónico del nuevo usuario. Debe ser única. |
| password  | String | Yes      | La contraseña del nuevo usuario. |

#### Example Request Body
```json
{
  "username": "caliche",
  "email": "carlos@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response
- **Code**: 201 Created
- **Content**:
```json
{
  "message": "User created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWI4YzQ0NTUwNDMwMzZlNDQxYzk2ZSIsImlhdCI6MTcyOTg1ODYyOCwiZXhwIjoxNzI5ODYyMjI4fQ.WW0nJLPHBa9vFsYbjz0LvZlY_-oFSMd8H1Ca07oOxks"
}
```

#### Error Responses
- **Code**: 400 Bad Request
  - **Content**:
  ```json
  {
    "error": "Username already exists"
  }
  ```
  - **Description**: Se produce si el nombre de usuario ya está en uso.

- **Code**: 400 Bad Request
  - **Content**:
  ```json
  {
    "error": "Email already exists"
  }
  ```
  - **Description**: Se produce si la dirección de correo electrónico ya está en uso.

- **Code**: 400 Bad Request
  - **Content**:
  ```json
  {
    "error": "All fields are required and must be strings."
  }
  ```
  - **Description**: Se produce si algún campo está vacío o no es una cadena.

- **Code**: 500 Internal Server Error
  - **Content**:
  ```json
  {
    "error": "Error creating user"
  }
  ```
  - **Description**: Se produce si hay un error en el servidor al intentar crear el usuario.

### Notes
- Asegúrate de que los campos `username` y `email` sean únicos al intentar crear un nuevo usuario.
- El token JWT se utiliza para autenticar al usuario en futuras solicitudes a la API.






















#### 1. Crear Nota (createNote)

https://localhost:5000/api/v1/notes/createnote

**Método:** `POST`  
**Ruta:** `/api/v1/notes/createnote`  

##### Descripción
Crea una nueva nota y registra el historial de la acción.

##### Parámetros del Cuerpo de la Solicitud
```json
{
  "userId": "ObjectId", // ID del usuario que crea la nota (requerido)
  "title": "string",    // Título de la nota (requerido)
  "content": "string"   // Contenido de la nota (requerido)
}
```

##### Respuesta Exitosa
- **Código:** `201 Created`
- **Cuerpo:**
```json
{
  "message": "Note created successfully",
  "token": "JWT_TOKEN" // Token JWT generado para la nueva nota
}
```

##### Respuestas de Error
- **Código:** `400 Bad Request`
  - **Cuerpo:**
  ```json
  {
    "error": "User ID, title, and content are required"
  }
  ```

- **Código:** `404 Not Found`
  - **Cuerpo:**
  ```json
  {
    "error": "User not found"
  }
  ```

- **Código:** `500 Internal Server Error`
  - **Cuerpo:**
  ```json
  {
    "message": "Error al crear la nota"
  }
  ```

---

#### 2. Actualizar Nota (updateNote)

https://localhost:5000/api/v1/notes/updatenote

**Método:** `PUT`  
**Ruta:** `/api/v1/notes/updatenote`  

##### Descripción
Actualiza una nota existente y registra el historial de la acción.

##### Parámetros del Cuerpo de la Solicitud
```json
{
  "noteId": "ObjectId", // ID de la nota a actualizar (requerido)
  "userId": "ObjectId", // ID del usuario que realiza la actualización (requerido)
  "title": "string",     // Título de la nota (opcional)
  "content": "string"    // Contenido de la nota (opcional)
}
```

##### Respuesta Exitosa
- **Código:** `200 OK`
- **Cuerpo:**
```json
{
  "message": "Note updated successfully",
  "token": "JWT_TOKEN" // Token JWT generado para la nota actualizada
}
```

##### Respuestas de Error
- **Código:** `400 Bad Request`
  - **Cuerpo:**
  ```json
  {
    "error": "Note ID and User ID are required"
  }
  ```

- **Código:** `404 Not Found`
  - **Cuerpo:**
  ```json
  {
    "error": "Note not found"
  }
  ```

- **Código:** `500 Internal Server Error`
  - **Cuerpo:**
  ```json
  {
    "message": "Error updating note"
  }
  ```

---

Si necesitas más modificaciones o información, ¡avísame!

