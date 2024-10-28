<template>
    <div>
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

        <!-- Mostrar imagen de "no se encontró" si no hay resultados -->
        <div v-if="noResults" id="not-found">
            <div class="image-container">
                <img alt="Not Found" src="../storage/img/notfound.svg" />
                <div class="message">File not found. Try searching again.</div>
            </div>
        </div>

        <div class="notes-list" v-if="filteredNotes.length">
            <div class="note" 
                v-for="note in filteredNotes" 
                :key="note._id"
                @click="openNoteDetail(note._id)"
            >
                <h2>{{ note.title }}</h2>
                <p>{{ truncateContent(note.content) }}</p>
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
        };
    },
    mounted() {
        this.fetchUserNotes();
    },
    methods: {
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
        },
        truncateContent(content) {
            return content.length > 30 ? content.slice(0, 30) + '...' : content;
        }
    },
};
</script>
