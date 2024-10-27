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
                <div class="note" v-for="note in notes" :key="note._id" :style="{ backgroundColor: getRandomColor() }"
                    @click="openModal(note)">
                    <h2>{{ note.title }}</h2>
                    <p>{{ truncateContent(note.content) }}</p>
                </div>
            </div>
        </div>

        <!-- Modal for editing note -->
        <div class="modal" v-if="isModalVisible">
            <div class="modal-content">
                <div class="header">
                    <i class="fas fa-arrow-left" @click="closeModal"></i>
                </div>
                <div class="content">
                    <input type="text" v-model="selectedNote.title" class="title-input" placeholder="Note Title" />
                    <textarea v-model="selectedNote.content" placeholder="Content"></textarea>
                </div>
                <div class="modal-actions">
                    <button class="save-button" @click="showSaveModal = true">Save Changes</button>
                </div>
            </div>
        </div>

        <!-- Confirmation modal for saving changes -->
        <div class="modal" v-if="showSaveModal">
            <div class="modal-content">
                <div class="icon-message">
                    <i class="fas fa-info-circle"></i>
                    <p>Save changes?</p>
                </div>
                <div class="buttons">
                    <button class="discard" @click="showSaveModal = false">Discard</button>
                    <button class="save" @click="confirmSave">Save</button>
                </div>
            </div>
        </div>

        <!-- Modal for creating a new note -->
        <div class="modal" v-if="isCreateModalVisible">
            <div class="modal-content">
                <div class="header">
                    <i class="fas fa-arrow-left" @click="closeCreateModal"></i>
                    <h2>Create a New Note</h2>
                </div>
                <div class="content">
                    <input type="text" v-model="newNote.title" class="title-input" placeholder="Note Title" />
                    <textarea v-model="newNote.content" placeholder="Content"></textarea>
                </div>
                <div class="modal-actions">
                    <button class="save-button" @click="createNote">Create Note</button>
                </div>
            </div>
        </div>

        <div class="add-note" @click="openCreateModal">
            <i class="fas fa-plus"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            notes: [],
            isModalVisible: false,
            selectedNote: { title: '', content: '', _id: '' },
            showSaveModal: false,
            isCreateModalVisible: false,
            newNote: { title: '', content: '' },
        };
    },
    mounted() {
        const token = this.getCookie('auth_token');
        if (!token) {
            window.location.href = '../views/index.html';
        } else {
            this.fetchUserNotes();
        }
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            return parts.length === 2 ? parts.pop().split(';').shift() : null;
        },
        async fetchUserNotes() {
            try {
                const response = await fetch('https://localhost:5000/api/v1/notes/getUserNotes', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    this.notes = await response.json();
                } else {
                    console.error('Error fetching notes:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        },
        truncateContent(content) {
            return content.length > 30 ? content.slice(0, 30) + '...' : content;
        },
        getRandomColor() {
            const colors = ['#ffb6c1', '#ffcccb', '#90ee90', '#ffffe0', '#add8e6'];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        openModal(note) {
            this.selectedNote = { ...note };
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        async confirmSave() {
            await this.updateNote();
            this.showSaveModal = false;
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
                        userId: this.getCookie('auth_token'),
                        title: this.selectedNote.title,
                        content: this.selectedNote.content,
                    }),
                });
                if (response.ok) {
                    this.notes = this.notes.map(note =>
                        note._id === this.selectedNote._id ? { ...note, content: this.selectedNote.content, title: this.selectedNote.title } : note
                    );
                    this.closeModal();
                } else {
                    console.error('Error updating note:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating note:', error);
            }
        },
        openCreateModal() {
            this.isCreateModalVisible = true;
            this.newNote = { title: '', content: '' }; // Reset fields
        },
        closeCreateModal() {
            this.isCreateModalVisible = false;
        },
        async createNote() {
            if (!this.newNote.title || !this.newNote.content) {
                alert('Please fill in both the title and content.');
                return;
            }

            try {
                const response = await fetch('https://localhost:5000/api/v1/notes/createnote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Asegúrate de incluir esta línea
                    body: JSON.stringify({
                        userId: this.getCookie('auth_token'), // Asegúrate de que esto sea correcto
                        title: this.newNote.title,
                        content: this.newNote.content,
                    }),
                });
                if (response.ok) {
                    const newNote = await response.json();
                    this.notes.push(newNote);
                    this.closeCreateModal();
                    this.fetchUserNotes(); // Refresh the notes list
                } else {
                    console.error('Error creating note:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating note:', error);
            }
        }
        ,
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
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
    /* background-color: red; */
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Dos columnas en pantallas grandes */
    gap: 15px; /* Espaciado entre los cubos */
    width: 100vw;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center; /* Centra horizontalmente los elementos en el grid */
}

/* Ajuste para las notas */
.note {
    height: 150px; /* Altura fija para las notas */
    width: 90vw;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centrar verticalmente */
    justify-content: center; /* Centrar horizontalmente */
    border-radius: 10px;
    color: black;
    text-align: center;
    margin: 5px; /* Margen para separación */
}

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
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #3a3a3a;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title-input, .content textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #4a4a4a;
    color: white;
    margin: 10px 0;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.modal-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #2db64f;
    color: white;
    cursor: pointer;
}

.modal-actions button:hover {
    background-color: #248d3e;
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

/* Media queries */
@media (max-width: 600px) {
    .header h1 {
        font-size: 1.5em;
    }

    .header .icons i {
        padding: 8px;
    }

    .container {
        grid-template-columns: 1fr; /* Una columna en móviles */
        padding: 0; /* Ajustar el padding si es necesario */
    }

    .note {
        height: 150px; /* Ajusta la altura si es necesario */
        margin: 10px 0; /* Margen vertical en móviles */
    }

    .modal-content {
        width: 90%;
    }
}

/* Modal de confirmación */
.icon-message {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.icon-message i {
    margin-right: 10px;
}

.buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.buttons button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    border: none;
}

.buttons .discard {
    background-color: #dc3545;
}

.buttons .save {
    background-color: #38b64d;
}

.buttons .discard:hover {
    background-color: #c82333;
}

.buttons .save:hover {
    background-color: #309941;
}
</style>
