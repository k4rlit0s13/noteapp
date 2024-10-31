<template>
    <div>
        <div class="header">
            <h1>Notes</h1>
            <div class="icons">
                <i class="fa fa-search" @click="redirectToSearch"></i>
                <i class="fa fa-info-circle" @click="redirectToInfoNote"></i>
            </div>
        </div>

        <div class="container">
            <div v-if="!notes.length">
                <img alt="Illustration of a person standing next to a large notepad and pencil"
                    src="../storage/img/note.svg" />
                <p>Create your first note!</p>
            </div>

            <!-- Mostrar lista de notas en tarjetas rectangulares de colores -->
            <div class="notes-list" v-if="notes.length">
                <div class="note" v-for="(note, index) in notes" :key="note._id" @click="openNoteDetail(note._id)"
                    :style="{ backgroundColor: noteColors[index % noteColors.length] }">
                    <h2>{{ truncateTitle(note.title) }}</h2>
                </div>
            </div>
        </div>

        <div class="add-note" @click="redirectToCreateNote">
            <i class="fa fa-plus"></i>
        </div>
    </div>
</template>


<script>
export default {
    name: 'home',
    data() {
        return {
            notes: [],
            noteColors: ['#ffb6c1', '#ffcccb', '#90ee90', '#ffffe0', '#add8e6']
        };
    },
    mounted() {
        this.checkAuthToken();  // Verifica el token de autenticación al montar
        this.fetchUserNotes();   // Carga las notas del usuario
    },
    methods: {
        checkAuthToken() {
            const token = this.getCookie('auth_token');
            if (!token) {
                this.$router.push('/'); // Redirigir a index.vue
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            return parts.length === 2 ? parts.pop().split(';').shift() : null;
        },
        async fetchUserNotes() {
            try {
                const response = await fetch('http://localhost:5000/api/v1/notes/getUserNotes', {
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
        redirectToSignup() {
            this.$router.push('/signup');
        },
        redirectToInfoNote() {
            this.$router.push('/infonote');
        },
        redirectToCreateNote() {
            this.$router.push('/createnote');
        },
        openNoteDetail(noteId) {
            this.$router.push({ path: '/infonote', query: { noteId } });
        },
        truncateTitle(title) {
            return title.length > 25 ? title.slice(0, 25) + '...' : title;
        }
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

.container {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.notes-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}

.note {
    width: 100%;
    max-width: 250px;
    padding: 0px;
    border-radius: 10px;
    color: black;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
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

@media (max-width: 767px) {
    .notes-list {
        flex-direction: column;
    }

    .note {
        max-width: 100%;
        height: 80px;
    }
}
</style>
