<template>
    <div class="modal">
        <div class="modal-content">
            <div class="header">
                <i class="fas fa-arrow-left" @click="goBack"></i>
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
</template>

<script>
export default {
    name: 'createnote',
    data() {
        return {
            newNote: { title: '', content: '' },
        };
    },
    methods: {
        goBack() {
            window.history.back();
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
                    this.goBack();
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
