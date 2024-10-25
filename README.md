URI: 
mongodb://root:campus2023@localhost:27017/
(recordar poner la de atlas para poder dejarlo desplegado)
URIATLAS:
mongodb+srv://kadavzu:carlos123@clustercarlos.qb1yv8u.mongodb.net/


.env:
FRONTEND_PORT=3000
BACKEND_PORT=5000
MONGODB_URI=mongodb://root:campus2023@localhost:27017/noteappdb
MONGODB_DB_NAME=noteappdb



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


correr:
npm run dev


## API Documentation: 

Create User

### Endpoint
```
POST /api/v1/users/createuser
```

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

