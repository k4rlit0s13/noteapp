<template>
    <div class="container">
        <div id="search-container" class="search-container">
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

        <!-- Imagen de "no se encontró" si no hay resultados -->
        <div v-if="noResults" id="not-found" class="not-found-container">
            <div class="image-container">
                <img alt="Not Found" src="../storage/img/notfound.svg" />
                <div class="message">File not found. Try searching again.</div>
            </div>
        </div>

        <div class="notes-list" v-if="filteredNotes.length">
            <div 
                class="note" 
                v-for="(note, index) in filteredNotes" 
                :key="note._id" 
                @click="openNoteDetail(note._id)" 
                :style="{ backgroundColor: noteColors[index % noteColors.length] }"
            >
                <h2>{{ note.title }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            notes: [],
            filteredNotes: [],
            searchQuery: '',
            noResults: false,
            noteColors: ['#ffb6c1', '#ffcccb', '#90ee90', '#ffffe0', '#add8e6'] // Colores aleatorios
        };
    },
    mounted() {
        this.fetchUserNotes();
    },
    methods: {
        async fetchUserNotes() {
            try {
                const response = await fetch('http://localhost:5000/api/v1/notes/getUserNotes', {
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
        filterNotes() {
            this.filteredNotes = this.notes.filter(note => 
                note.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                note.content.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            this.noResults = this.filteredNotes.length === 0;
        },
        clearSearch() {
            this.searchQuery = '';
            this.filteredNotes = this.notes;
            this.noResults = false;
            window.location.href = '../views/home.html'; // Redirigir a la página de inicio
        },
        openNoteDetail(noteId) {
            window.location.href = `../views/infonote.html?noteId=${noteId}`;
        }
    },
};
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: #1c1c1c;
    color: #ffffff;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: hidden; /* Ocultar desbordamiento vertical */
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    padding: 20px;
}

.search-container {
    position: relative;
    width: 90%;
    max-width: 600px;
    display: flex;
    align-items: center;
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

.not-found-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 40vh; /* Ajuste de altura para centrar más arriba */
}

.image-container img {
    width: 80%;
    max-width: 250px;
}

.message {
    font-size: 16px;
    margin-top: 15px;
    text-align: center;
    color: #ffffff;
}

.notes-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
}

.note {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    color: #000000; /* Cambiado a negro */
    font-size: 16px;
}

.note h2 {
    margin: 0;
    font-size: 18px;
}

@media (max-width: 767px) {
    .notes-list {
        flex-direction: column;
    }
}
</style>
