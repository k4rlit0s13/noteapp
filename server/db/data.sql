use notesappdb


// Insertar usuarios
db.USER.insertMany([
    {
        username: "john_doe",
        email: "john@example.com",
        password: "password123"
    },
    {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password456"
    },
    {
        username: "alice_jones",
        email: "alice@example.com",
        password: "password789"
    }
]);

// Obtener los IDs de los usuarios recién insertados
const johnId = db.USER.findOne({ username: "john_doe" })._id;
const janeId = db.USER.findOne({ username: "jane_smith" })._id;
const aliceId = db.USER.findOne({ username: "alice_jones" })._id;

// Insertar notas
db.NOTE.insertMany([
    {
        userId: johnId,
        title: "First Note by John",
        content: "This is the content of John's first note.",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-01")
    },
    {
        userId: johnId,
        title: "Second Note by John",
        content: "This is the content of John's second note.",
        createdAt: new Date("2023-01-02"),
        updatedAt: new Date("2023-01-02")
    },
    {
        userId: janeId,
        title: "First Note by Jane",
        content: "This is the content of Jane's first note.",
        createdAt: new Date("2023-01-03"),
        updatedAt: new Date("2023-01-03")
    },
    {
        userId: aliceId,
        title: "First Note by Alice",
        content: "This is the content of Alice's first note.",
        createdAt: new Date("2023-01-04"),
        updatedAt: new Date("2023-01-04")
    },
    {
        userId: aliceId,
        title: "Second Note by Alice",
        content: "This is the content of Alice's second note.",
        createdAt: new Date("2023-01-05"),
        updatedAt: new Date("2023-01-05")
    }
]);

// Obtener los IDs de las notas recién insertadas
const note1Id = db.NOTE.findOne({ title: "First Note by John" })._id;
const note2Id = db.NOTE.findOne({ title: "Second Note by John" })._id;
const note3Id = db.NOTE.findOne({ title: "First Note by Jane" })._id;
const note4Id = db.NOTE.findOne({ title: "First Note by Alice" })._id;
const note5Id = db.NOTE.findOne({ title: "Second Note by Alice" })._id;

// Insertar historial
db.HISTORY.insertMany([
    {
        noteId: note1Id,
        userId: johnId,
        action: "created",
        timestamp: new Date("2023-01-01T10:00:00"),
        previousContent: [],
        newContent: "This is the content of John's first note."
    },
    {
        noteId: note2Id,
        userId: johnId,
        action: "created",
        timestamp: new Date("2023-01-02T11:00:00"),
        previousContent: [],
        newContent: "This is the content of John's second note."
    },
    {
        noteId: note3Id,
        userId: janeId,
        action: "created",
        timestamp: new Date("2023-01-03T12:00:00"),
        previousContent: [],
        newContent: "This is the content of Jane's first note."
    },
    {
        noteId: note4Id,
        userId: aliceId,
        action: "created",
        timestamp: new Date("2023-01-04T13:00:00"),
        previousContent: [],
        newContent: "This is the content of Alice's first note."
    },
    {
        noteId: note5Id,
        userId: aliceId,
        action: "created",
        timestamp: new Date("2023-01-05T14:00:00"),
        previousContent: [],
        newContent: "This is the content of Alice's second note."
    }
]);
