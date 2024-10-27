<template>
    <div>
        <div class="header">
            <h1>Notes</h1>
            <div class="icons">
                <i class="fas fa-search"></i>
                <i class="fas fa-info-circle"></i>
            </div>
        </div>

        <div class="container">
            <div class="content" v-if="!notes.length">
                <img alt="Illustration of a person standing next to a large notepad and pencil"
                    src="../storage/img/note.svg" />
                <p>Create your first note!</p>
            </div>

            <div class="notes-list" v-if="notes.length">
                <div class="note" v-for="note in notes" :key="note._id" :style="{ backgroundColor: getRandomColor() }" @click="openModal(note)">
                    <h2>{{ note.title }}</h2>
                    <p>{{ truncateContent(note.content) }}</p>
                </div>
            </div>
        </div>

        <!-- Modal for editing note -->
        <div class="modal" v-if="isModalVisible">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>Edit Note</h2>
                <input v-model="selectedNote.title" placeholder="Title" />
                <textarea v-model="selectedNote.content" placeholder="Content"></textarea>
                <button @click="updateNote">Save Changes</button>
            </div>
        </div>

        <div class="add-note" @click="addNote">
            <i class="fas fa-plus"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            notes: [], // Array to store notes
            isModalVisible: false, // Controls modal visibility
            selectedNote: { title: '', content: '', _id: '' }, // Selected note
        };
    },
    mounted() {
        const token = this.getCookie('auth_token');
        if (!token) {
            window.location.href = '../views/index.html';
        } else {
            this.fetchUserNotes(); // Fetch user notes
        }
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            return parts.length === 2 ? parts.pop().split(';').shift() : null; // Return null if not found
        },
        async fetchUserNotes() {
            try {
                const response = await fetch('https://localhost:5000/api/v1/notes/getUserNotes', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in request
                });
                if (response.ok) {
                    this.notes = await response.json(); // Store notes in state
                } else {
                    console.error('Error fetching notes:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        },
        truncateContent(content) {
            return content.length > 30 ? content.slice(0, 30) + '...' : content; // Truncate content if long
        },
        getRandomColor() {
            const colors = ['#ffb6c1', '#ffcccb', '#90ee90', '#ffffe0', '#add8e6'];
            return colors[Math.floor(Math.random() * colors.length)]; // Randomly select color from array
        },
        openModal(note) {
            this.selectedNote = { ...note }; // Clone selected note
            this.isModalVisible = true; // Show modal
        },
        closeModal() {
            this.isModalVisible = false; // Close modal
        },
        async updateNote() {
            try {
                const response = await fetch('https://localhost:5000/api/v1/notes/updatenote', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        noteId: this.selectedNote._id,
                        userId: this.getCookie('auth_token'), // Ensure userId is correctly obtained
                        title: this.selectedNote.title,
                        content: this.selectedNote.content,
                    }),
                });
                if (response.ok) {
                    this.notes = this.notes.map(note =>
                        note._id === this.selectedNote._id ? { ...note, title: this.selectedNote.title, content: this.selectedNote.content } : note
                    );
                    this.closeModal(); // Close modal after update
                } else {
                    console.error('Error updating note:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating note:', error);
            }
        },
        addNote() {
            console.log('Add Note clicked');
        },
    },
};
</script>

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

.notes-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Cambiado a un mínimo de 150px */
    gap: 15px; /* Espaciado aumentado entre notas */
}

/* Cambios en la nota para que tenga un margen interno */
.note {
    padding: 15px;
    border-radius: 10px;
    color: black;
    text-align: center;
    cursor: pointer; /* Indicate clickable */
    margin: 5px; /* Añadido margen entre las notas */
}

/* Modal styles */
.modal {
    display: flex;
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
    background-color: #3a3a3a;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
}

.close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

/* Media queries */
@media (max-width: 600px) {
    .header h1 {
        font-size: 1.5em;
    }

    .header .icons i {
        padding: 8px;
    }

    .content p {
        font-size: 1em;
    }

    .add-note {
        width: 50px;
        height: 50px;
    }

    .add-note i {
        font-size: 1.5em;
    }

    .notes-list {
        display: block; /* Cambia a bloque en pantallas pequeñas */
        padding: 0 10px; /* Añadido padding para que no se salgan del margen */
    }

    .note {
        width: calc(100% - 20px); /* Resta el margen */
        margin: 10px 0; /* Espacio vertical entre notas */
    }
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
</style>
