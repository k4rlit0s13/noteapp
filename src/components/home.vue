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
                <div class="header">
                    <i class="fas fa-arrow-left" @click="closeModal"></i>
                </div>
                <div class="content">
                    <input type="text" v-model="selectedNote.title" class="title-input" placeholder="Note Title" />
                    <textarea v-model="selectedNote.content" placeholder="Content"></textarea>
                </div>
                <div class="modal-actions">
                    <button @click="showSaveModal = true">Save Changes</button>
                </div>
            </div>
        </div>

        <!-- Confirmation modal for saving changes -->
        <div class="modal" v-if="showSaveModal">
            <div class="modal-content">
                <i class="fas fa-info-circle"></i>
                <p>Save changes?</p>
                <div class="buttons">
                    <button class="discard" @click="showSaveModal = false">Discard</button>
                    <button class="save" @click="confirmSave">Save</button>
                </div>
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
            notes: [],
            isModalVisible: false,
            selectedNote: { title: '', content: '', _id: '' },
            showSaveModal: false,
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
    width: 90%;
    max-width: 600px;
    border-radius: 10px;
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
}

.title-input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #4a4a4a;
    color: white;
    margin-bottom: 10px;
}

.content textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #4a4a4a;
    color: white;
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
    background-color: #3a3a3a;
    color: white;
    cursor: pointer;
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

    .notes-list {
        display: block;
        padding: 0 10px;
    }

    .note {
        width: calc(100% - 20px);
        margin: 10px 0;
    }
}

/* Style for the save confirmation modal */
.modal .buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.modal .buttons button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.modal .buttons .discard {
    background-color: #f44336;
    color: white;
}

.modal .buttons .save {
    background-color: #4CAF50;
    color: white;
}
</style>
