<template>
    <div class="modal">
        <div class="modal-content">
            <div class="header">
                <i class="fas fa-arrow-left" @click="goBack"></i>
                <div class="header-icons">
                    <i class="fas fa-eye"></i>
                    <i class="fas fa-save" @click="createNote" style="margin-left: 20px;"></i>
                </div>
            </div>

            <div class="container">
                <input 
                    type="text" 
                    v-model="newNote.title" 
                    class="title-input" 
                    placeholder="Title" 
                />
                <textarea 
                    v-model="newNote.content" 
                    class="content-input" 
                    placeholder="Type something..." 
                ></textarea>
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

<style>
body, .modal {
    background-color: #2b2b2b;
    color: #b0b0b0;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
}

.modal-content {
    width: 100%;
    max-width: 600px;
    padding: 0 20px;
    box-sizing: border-box;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
}

.header i, .header-icons i {
    font-size: 24px;
    color: #b0b0b0;
    cursor: pointer;
}

.container {
    text-align: left;
    width: 100%;
}

.title-input {
    font-size: 32px;
    width: 100%;
    padding: 10px 0;
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #555;
    background-color: transparent;
    color: #ffffff;
    outline: none;
}

.content-input {
    width: 100%;
    font-size: 18px;
    padding: 10px 0;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid #555;
    background-color: transparent;
    color: #b0b0b0;
    outline: none;
    resize: none;
    height: 60vh;
}
</style>
