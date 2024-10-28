<template>
    <div class="container">
        <div class="header">
            <i class="fas fa-arrow-left back-icon" @click="goBack"></i>
            <div>
                <i class="fas fa-eye" @click="showPreview = !showPreview"></i>
                <button class="save" @click="confirmSave">
                    <i class="fas fa-save"></i>
                </button>
            </div>
        </div>
        <div class="content" v-if="!showPreview">
            <textarea ref="title" class="editable-title" @input="updateTitle" :placeholder="'Title'" v-model="note.title"
                @keydown="allowEnter"></textarea>
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
            note: { title: '', content: '', _id: '' },
            showSaveModal: false,
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
                    this.note = await response.json();
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
            this.showSuccessMessage = true;
        },
        async updateNote() {
            try {
                const response = await fetch('https://localhost:5000/api/v1/notes/updatenote', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        noteId: this.note._id,
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
        allowEnter(event) {
            if (event.key === 'Enter') {
                // Allow line breaks
            }
        },
        closeSuccessMessage() {
            this.showSuccessMessage = false;
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
}</style>
