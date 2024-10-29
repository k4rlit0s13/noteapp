<template>
    <div class="container">
        <div class="header">
            <i class="fas fa-arrow-left back-icon" @click="goBack"></i>
            <div>
                <i class="fas fa-eye" @click="showPreview = !showPreview"></i>
                <button class="save" @click="showSaveModal = true">
                    <i class="fas fa-save"></i>
                </button>
                <button class="delete" @click="showDeleteModal = true">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="content" v-if="!showPreview">
            <textarea ref="title" class="editable-title" @input="updateTitle" :placeholder="'Title'"
                v-model="note.title" @keydown="allowEnter"></textarea>
            <textarea ref="content" class="editable-content" @input="updateContent"
                :placeholder="'Write your content here...'" v-model="note.content" @keydown="allowEnter"></textarea>
        </div>
        <div class="content" v-if="showPreview">
            <div class="preview-content">
                <h1 v-if="note.title">{{ note.title }}</h1>
                <p v-html="note.content"></p>
            </div>
        </div>

        <!-- Confirmation modal for saving changes -->
        <div class="modal" v-if="showSaveModal">
            <div class="modal-content">
                <i class="fas fa-info-circle"></i>
                <p>Save changes?</p>
                <div class="buttons">
                    <button class="discard" @click="showSaveModal = false">Cancel</button>
                    <button class="save" @click="confirmSave">Save</button>
                </div>
            </div>
        </div>

        <!-- Confirmation modal for deleting note -->
        <div class="modal" v-if="showDeleteModal">
            <div class="modal-content">
                <i class="fas fa-trash"></i>
                <p>Are you sure you want to trash this note?</p>
                <div class="buttons">
                    <button class="discard" @click="showDeleteModal = false">Cancel</button>
                    <button class="delete" @click="confirmDelete">Trash</button>
                </div>
            </div>
        </div>

        <!-- Success message after saving -->
        <div v-if="showSuccessMessage" class="success-message">
            <p>Saved successfully!</p>
            <button @click="closeSuccessMessage">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'infonote',
    data() {
        return {
            note: { title: '', content: '', _id: '', userId: '' },
            showSaveModal: false,
            showDeleteModal: false,
            showSuccessMessage: false,
            showPreview: false,
        };
    },
    mounted() {
        const noteId = new URLSearchParams(window.location.search).get('noteId');
        if (noteId) {
            this.fetchNoteDetails(noteId);
        }
    },
    methods: {
        goBack() {
            window.history.back();
        },
        async fetchNoteDetails(noteId) {
            try {
                const response = await fetch(`https://localhost:5000/api/v1/notes/note/${noteId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    this.note = {
                        ...data,
                        userId: data.userId || this.getUserIdFromToken(),
                    };
                } else {
                    console.error('Error fetching note details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching note details:', error);
            }
        },
        updateTitle(event) {
            this.note.title = event.target.value; // Get value from textarea
        },
        updateContent(event) {
            this.note.content = event.target.value; // Get value from textarea
        },
        async confirmSave() {
            await this.updateNote();
            this.showSaveModal = false;
            this.showSuccessMessage = true; // Show success message only on save
        },
        async updateNote() {
            try {
                const response = await fetch('https://localhost:5000/api/v1/notes/updatenote', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        noteId: this.note._id,
                        userId: this.note.userId,
                        title: this.note.title,
                        content: this.note.content,
                    }),
                });
                if (response.ok) {
                    this.goBack();
                } else {
                    console.error('Error updating note:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating note:', error);
            }
        },
        async confirmDelete() {
            await this.trashNote(); // Llama a la función trashNote
            this.showDeleteModal = false; // Cierra el modal de eliminación
            // Redirige a la página de inicio después de que trashNote se complete
            window.location.href = 'home.html'; // Redirige a la página de inicio
        },
        async trashNote() {
            console.log('Trying to toggle visualization for note ID:', this.note._id); // Log the ID
            try {
                const response = await fetch(`https://localhost:5000/api/v1/notes/${this.note._id}/visualization`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Visualization toggled:', data.visualization); // Log the response
                    return true; // Indicate success
                } else {
                    console.error('Error toggling visualization:', response.statusText);
                    return false; // Indicate failure
                }
            } catch (error) {
                console.error('Error toggling visualization:', error);
                return false; // Indicate failure
            }
        },
        allowEnter(event) {
            if (event.key === 'Enter') {
                // Allow line breaks
            }
        },
        closeSuccessMessage() {
            this.showSuccessMessage = false;
        },
        getUserIdFromToken() {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('auth_token='))?.split('=')[1];
            if (!token) return null;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.userId;
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        },
    },
};
</script>


<style>
body {
    background-color: #1c1c1c;
    color: #ffffff;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 50%;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
}

.header i {
    background-color: #3a3a3a;
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
}

.editable-title {
    font-size: 36px;
    /* Large size for the title */
    font-weight: bold;
    /* Bold title */
    margin-bottom: 5px;
    width: 100%;
    color: #ffffff;
    outline: none;
    /* Remove outline */
    border: none;
    /* Remove border */
    background: none;
    /* No background color */
    resize: none;
    /* Disable manual resizing */
}

.editable-content {
    font-size: 18px;
    /* Font size for content */
    padding: 10px;
    width: 100%;
    min-height: 150px;
    /* Minimum height for content */
    max-height: 400px;
    /* Set a maximum height */
    overflow-y: auto;
    /* Allow scrolling */
    resize: none;
    /* Disable manual resizing */
    color: #ffffff;
    outline: none;
    /* Remove outline */
    border: none;
    /* Remove border */
    background: none;
    /* No background color */
}

.preview-content {
    font-size: 18px;
    padding: 20px;
    color: #ffffff;
    width: 100%;
    /* Set a dynamic width */
    max-width: 100%;
    /* Ensure it doesn't exceed the container's width */
    overflow-wrap: break-word;
    /* Adjust text to the set width */
}

.preview-content h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.preview-content p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}

.save {
    background: none;
    border: none;
    cursor: pointer;
    color: #ffffff;
    padding: 10px;
}

.delete {
    background: none;
    border: none;
    cursor: pointer;
    color: #ffffff;
    padding: 10px;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    z-index: 1000;
}

.modal i {
    font-size: 30px;
    color: #888;
    margin-bottom: 10px;
}

.modal p {
    font-size: 18px;
    color: #ffffff;
}

.buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.success-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #28a745;
    color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
}

@media (max-width: 768px) {
    .container {
        max-width: 100%;
    }
}
</style>
