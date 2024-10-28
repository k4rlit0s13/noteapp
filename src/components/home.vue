<template>
    <div>
        <div class="header">
            <h1>Notes</h1>
            <div class="icons">
                <i class="fas fa-search" @click="toggleSearchBar"></i>
                <i class="fas fa-info-circle"></i>
            </div>
        </div>

        <!-- Search Bar -->
        <div id="search-container" class="search-container" v-if="isSearchBarVisible">
            <input 
                type="text" 
                id="search-input" 
                class="search-input" 
                v-model="searchQuery" 
                placeholder="Search by the keyword..." 
                @input="filterNotes"
            />
            <i class="fas fa-times search-icon" id="search-icon" @click="clearSearch"></i>
        </div>

        <div class="container">
            <!-- Show not found image if there are no results after filtering -->
            <div v-if="noResults" id="not-found">
                <div class="image-container">
                    <img alt="Not Found" src="../storage/img/notfound.svg" />
                    <div class="message">File not found. Try searching again.</div>
                </div>
            </div>

            <div class="notes-list" v-if="filteredNotes.length">
                <div class="note" 
                    v-for="(note, index) in filteredNotes" 
                    :key="note._id"
                    :style="{ backgroundColor: getColor(index) }"
                    @click="openModal(note)"
                >
                    <h2>{{ note.title }}</h2>
                    <p>{{ truncateContent(note.content) }}</p>
                </div>
            </div>

            <!-- Show this message if there are no notes at all -->
            <div v-if="!notes.length && !isSearchBarVisible">
                <img alt="Illustration of a person standing next to a large notepad and pencil"
                    src="../storage/img/note.svg" />
                <p>Create your first note!</p>
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
            filteredNotes: [],
            isModalVisible: false,
            selectedNote: { title: '', content: '', _id: '' },
            showSaveModal: false,
            isCreateModalVisible: false,
            newNote: { title: '', content: '' },
            isSearchBarVisible: false,
            searchQuery: '',
            noResults: false,
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
                    this.filteredNotes = this.notes; // Initialize with all notes
                } else {
                    console.error('Error fetching notes:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        },
        filterNotes() {
            const query = this.searchQuery.toLowerCase().trim();
            this.filteredNotes = this.notes.filter(note => 
                note.title.toLowerCase().includes(query)
            );
            this.noResults = this.filteredNotes.length === 0 && this.searchQuery !== '';
        },
        toggleSearchBar() {
            this.isSearchBarVisible = !this.isSearchBarVisible;
            if (!this.isSearchBarVisible) {
                this.clearSearch();
            }
        },
        clearSearch() {
            this.searchQuery = '';
            this.filterNotes();
            this.isSearchBarVisible = false;
        },
        truncateContent(content) {
            return content.length > 30 ? content.slice(0, 30) + '...' : content;
        },
        getColor(index) {
            const colors = ['#ffb6c1', '#ffcccb', '#90ee90', '#ffffe0', '#add8e6'];
            return colors[index % colors.length];
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
                    this.filterNotes(); // Refresh the filtered notes
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
                    credentials: 'include',
                    body: JSON.stringify({
                        userId: this.getCookie('auth_token'),
                        title: this.newNote.title,
                        content: this.newNote.content,
                    }),
                });
                if (response.ok) {
                    const newNote = await response.json();
                    this.notes.push(newNote);
                    this.filterNotes(); // Update filtered notes
                    this.closeCreateModal();
                } else {
                    console.error('Error creating note:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating note:', error);
            }
        },
    },
};
</script>

<style>
body {
    background-color: #1c1c1c;
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #ffffff;
}

.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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

.container {
    text-align: left;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.notes-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
}

.note {
    background-color: #ffb6c1;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    color: black;
}

.note:nth-child(2) {
    background-color: #ffcccb;
}

.note:nth-child(3) {
    background-color: #90ee90;
}

.note:nth-child(4) {
    background-color: #ffffe0;
}

.note:nth-child(5) {
    background-color: #add8e6;
}

.note h2 {
    font-size: 18px;
    margin-bottom: 10px;
}

.note p {
    font-size: 16px;
    margin-bottom: 20px;
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    max-width: 400px;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.save-button {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: green;
    color: white;
}

.discard {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: red;
    color: white;
}

.image-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.image-container img {
    width: 300px;
}

.message {
    font-size: 16px;
    margin-top: 20px;
    text-align: center;
}
</style>
