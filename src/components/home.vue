<template>
    <div>
        <div class="header">
            <h1 v-if="!isSearchVisible || windowWidth > 600">Notes</h1>
            <div class="search-container" v-if="isSearchVisible">
                <input type="text" class="search-input" placeholder="Search by keyword..." v-model="searchTerm"
                    @input="filterNotes" />
                <i class="fas fa-times search-icon" @click="toggleSearchVisibility"></i>
            </div>
            <i class="fas fa-search" @click="toggleSearchVisibility" v-if="!isSearchVisible"></i>
        </div>

        <div class="container">
            <div class="notes-list" v-if="filteredNotes.length">
                <div class="note" v-for="note in filteredNotes" :key="note._id"
                    :style="{ backgroundColor: getRandomColor() }" @click="openModal(note)">
                    <h2>{{ note.title }}</h2>
                    <p>{{ truncateContent(note.content) }}</p>
                </div>
            </div>

            <div class="no-results" v-if="!hasResults && searchTerm">
                <div class="image-container">
                    <img alt="No results found" height="200"
                        src="../storage/img/notfound.svg"
                        width="300" />
                    <div class="message">
                        No results found. Try searching again.
                    </div>
                </div>
            </div>

            <div class="content" v-if="!notes.length && !isSearchVisible">
                <img alt="Illustration of a person standing next to a large notepad and pencil"
                    src="../storage/img/note.svg" />
                <p>Create your first note!</p>
            </div>
        </div>

        <div class="add-note" @click="openCreateModal">
            <i class="fas fa-plus"></i>
        </div>

        <!-- Modal to view/edit a note -->
        <div class="modal" v-if="isModalVisible">
            <div class="modal-content">
                <h2>Edit Note</h2>
                <input type="text" v-model="selectedNote.title" class="title-input" placeholder="Note Title">
                <textarea v-model="selectedNote.content" placeholder="Content" rows="4"></textarea>
                <div class="modal-actions">
                    <button @click="confirmSave">Save</button>
                    <button @click="closeModal">Cancel</button>
                </div>
            </div>
        </div>

        <!-- Modal to create a new note -->
        <div class="modal" v-if="isCreateModalVisible">
            <div class="modal-content">
                <h2>Create Note</h2>
                <input type="text" v-model="newNote.title" class="title-input" placeholder="Note Title">
                <textarea v-model="newNote.content" placeholder="Content" rows="4"></textarea>
                <div class="modal-actions">
                    <button @click="createNote">Create</button>
                    <button @click="closeCreateModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            notes: [],
            filteredNotes: [],
            searchTerm: '',
            isSearchVisible: false,
            isModalVisible: false,
            selectedNote: { title: '', content: '', _id: '' },
            isCreateModalVisible: false,
            newNote: { title: '', content: '' },
            windowWidth: window.innerWidth,
        };
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        const token = this.getCookie('auth_token');
        if (!token) {
            window.location.href = '../views/index.html';
        } else {
            this.fetchUserNotes();
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
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
                    this.filteredNotes = this.notes;
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
            this.isModalVisible = false;
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
                        title: this.selectedNote.title,
                        content: this.selectedNote.content,
                    }),
                });
                if (response.ok) {
                    this.notes = this.notes.map(note =>
                        note._id === this.selectedNote._id
                            ? { ...note, content: this.selectedNote.content, title: this.selectedNote.title }
                            : note
                    );
                    this.fetchUserNotes();
                } else {
                    console.error('Error updating note:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating note:', error);
            }
        },
        openCreateModal() {
            this.isCreateModalVisible = true;
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
                    credentials: 'include',
                    body: JSON.stringify(this.newNote),
                });
                if (response.ok) {
                    const newNote = await response.json();
                    this.notes.push(newNote);
                    this.closeCreateModal();
                    this.fetchUserNotes();
                } else {
                    console.error('Error creating note:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating note:', error);
            }
        },
        filterNotes() {
            if (!this.searchTerm) {
                this.filteredNotes = this.notes;
                return;
            }

            const term = this.searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            this.filteredNotes = this.notes.filter(note =>
                note.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(term)
            );
        },
        toggleSearchVisibility() {
            this.isSearchVisible = !this.isSearchVisible;
            if (!this.isSearchVisible) {
                this.filteredNotes = this.notes;
            }
        }
    },
    computed: {
        hasResults() {
            return this.filteredNotes.length > 0;
        }
    }
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
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
}

.note {
    padding: 15px;
    border-radius: 10px;
    color: black;
    text-align: center;
    cursor: pointer;
    margin: 5px;
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
    /* Centrar contenido */
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header i {
    background-color: #3a3a3a;
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
}

.content {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Centrar título y contenido */
}

.title-input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #4a4a4a;
    color: white;
    margin: 10px;
}

.content textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #4a4a4a;
    color: white;
    margin: 10px;
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
    /* Cambiar color de fondo */
    color: white;
    cursor: pointer;
}

.modal-actions button:hover {
    background-color: #248d3e;
    /* Color al pasar el ratón */
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

.image-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.message {
    font-size: 16px;
    margin-top: 20px;
    text-align: center;
}



/* Media queries */
@media (max-width: 600px) {
    .header h1 {
        font-size: 1.5em;
    }

    .header .icons i {
        padding: 8px;
    }

    .notes-list {
        display: block;
        padding: 0;
    }

    .note {
        margin: 10px 0;
        text-align: left;
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
    /* Color de fondo para el botón de descartar */
}

.buttons .save {
    background-color: #38b64d;
    /* Color de fondo para el botón de guardar */
}

.buttons .discard:hover {
    background-color: #c82333;
    /* Color al pasar el ratón */
}

.buttons .save:hover {
    background-color: #309941;
    /* Color al pasar el ratón */
}
</style>
