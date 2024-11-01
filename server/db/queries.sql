#   Queries mongodb

**Crear Usuario**  
Método HTTP: POST  
Endpoint: `/users`  
Descripción: Crea un nuevo usuario y devuelve un token JWT.  
```plaintext
db.USER.insertOne({
  username: "Carlos",
  email: "john@example.com",
  password: "password123"
});
```

**Iniciar Sesión**  
Método HTTP: POST  
Endpoint: `/users/login`  
Descripción: Permite a un usuario iniciar sesión y obtener un token JWT.  
```plaintext

```

**Cerrar Sesión (opcional)**  
Método HTTP: POST  
Endpoint: `/users/logout`  
Descripción: Permite a un usuario cerrar sesión.  
```plaintext

```

**Crear Nota**  
Método HTTP: POST  
Endpoint: `/notes`  
Descripción: Crea una nueva nota.  
```plaintext
const carlosId = db.USER.findOne({ username: "Carlos" })._id;

db.NOTE.insertOne({
  userId: ObjectId(carlosId),  
  title: "Título de la Nota",
  content: "Contenido de la nota.",
  createdAt: new Date("2023-01-01T10:00:00"), //fecha y hora actuales dinamicas 
  updatedAt: new Date("2023-01-01T10:00:00") //fecha y hora actuales dinamicas 
});
```

**Obtener Todas las Notas**  
Método HTTP: GET  
Endpoint: `/notes`  
Descripción: Obtiene una lista de todas las notas.  
```plaintext
// Paso 1: Obtener el correo del usuario deseado
const userEmail = "karlitos@gmail.com"; // Reemplaza con el correo del usuario que buscas

// Paso 2: Buscar el usuario por correo y obtener su _id
const user = db.USER.findOne({ email: userEmail });

if (user) {
    const userId = user._id;

    // Paso 3: Usar el ID del usuario para buscar todas las notas asociadas en la colección NOTE
    const notes = db.NOTE.find({ userId: userId });
    
    // Mostrar las notas encontradas
    print(notes); // o cualquier otra forma de manejar los datos
} else {
    print("Usuario no encontrado");
}
```

**Obtener Nota Específica**  
Método HTTP: GET  
Endpoint: `/notes/{id}`  
Descripción: Obtiene los detalles de una nota específica.  
```plaintext

```

**Actualizar Nota**  
Método HTTP: PUT  
Endpoint: `/notes/{id}`  
Descripción: Actualiza una nota existente.  
```plaintext

```

**Eliminar Nota**  
Método HTTP: DELETE  
Endpoint: `/notes/{id}`  
Descripción: Elimina una nota específica.  
```plaintext

```

**Buscar Notas**  
Método HTTP: GET  
Endpoint: `/notes/search`  
Descripción: Busca notas por título o contenido.  
```plaintext

```

**Obtener Historial de Cambios de Nota**  
Método HTTP: GET  
Endpoint: `/notes/{id}/history`  
Descripción: Obtiene el historial de cambios de una nota específica. **(solo admin)**  
```plaintext

```

**Crear Nueva Versión de Nota**  
Método HTTP: POST  
Endpoint: `/notes/{id}/history`  
Descripción: Guarda una nueva versión de una nota. **(Sin interfaz gráfica)**  
```plaintext

```

**Actualizar Usuario (opcional)**  
Método HTTP: PUT  
Endpoint: `/users/{id}`  
Descripción: Actualiza la información del usuario específico **(solo admin).**  
```plaintext

```

**Eliminar Usuario (opcional)**  
Método HTTP: DELETE  
Endpoint: `/users/{id}`  
Descripción: Elimina un usuario específico **(solo admin).**  
```plaintext

```

