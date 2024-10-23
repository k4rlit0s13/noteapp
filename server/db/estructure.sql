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
            bsonType: "string"
          },
          description: "Array of previous content versions of the note"
        },
        newContent: {
          bsonType: "string",
          description: "New content of the note"
        }
      }
    }
  }
});


