use notesappdb


db.createCollection("USER", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "password"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "User ID (automatically generated)"
        },
        username: {
          bsonType: "string",
          description: "Username"
        },
        email: {
          bsonType: "string",
          description: "User email"
        },
        password: {
          bsonType: "string",
          description: "User password"
        }
      }
    }
  }
});


db.createCollection("NOTE", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "title", "content", "createdAt", "updatedAt"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Note ID (automatically generated)"
        },
        userId: {
          bsonType: "objectId",
          description: "ID of the user who created the note"
        },
        title: {
          bsonType: "string",
          description: "Note title"
        },
        content: {
          bsonType: "string",
          description: "Note content"
        },
        createdAt: {
          bsonType: "date",
          description: "Note creation date"
        },
        updatedAt: {
          bsonType: "date",
          description: "Note update date"
        },
        visualization: {
          bsonType: "bool",
          description: "Indicates if the note has been visualized"
        }
      }
    }
  }
});



db.createCollection("HISTORY", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["noteId", "userId", "action", "timestamp", "previousContent", "newContent"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "History ID (automatically generated)"
        },
        noteId: {
          bsonType: "objectId",
          description: "ID of the associated note"
        },
        userId: {
          bsonType: "objectId",
          description: "ID of the user who performed the action"
        },
        action: {
          bsonType: "string",
          description: "Action performed"
        },
        timestamp: {
          bsonType: "date",
          description: "Date and time of the action"
        },
        previousContent: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["title", "content", "updatedAt"],
            properties: {
              title: {
                bsonType: "string",
                description: "Previous title of the note"
              },
              content: {
                bsonType: "string",
                description: "Previous content of the note"
              },
              updatedAt: {
                bsonType: "date",
                description: "Previous update date of the note"
              }
            }
          },
          description: "Array of previous content versions of the note, including title, content, and update date"
        },
        newContent: {
          bsonType: "string",
          description: "New content of the note"
        }
      }
    }
  }
});




db.NOTE.updateOne( 
  { _id: ObjectId("671bceb5c65009f39cce9725") },
  { $set: { visualization: false } }
)

listo tenemos la consulta funcionando