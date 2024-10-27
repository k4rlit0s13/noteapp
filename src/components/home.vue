<template>
    <body>
        <div class="header">
            <h1>Notes</h1>
            <div class="icons">
                <i class="fas fa-search"></i>
                <i class="fas fa-info-circle"></i>
            </div>
        </div>
        
        <div class="content" v-if="!notes.length">
            <img alt="Illustration of a person standing next to a large notepad and pencil"
                src="../storage/img/note.svg" />
            <p>Create your first note!</p>
        </div>
        
        <div class="notes-list" v-if="notes.length">
            <div class="note" v-for="note in notes" :key="note._id" :style="{ backgroundColor: getRandomColor() }">
                <h2>{{ note.title }}</h2>
                <p>{{ truncateContent(note.content) }}</p>
            </div>
        </div>
        
        <div class="add-note" @click="addNote">
            <i class="fas fa-plus"></i>
        </div>
    </body>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            notes: [], // Arreglo para almacenar las notas
        };
    },
    mounted() {
        const token = this.getCookie('auth_token');
        console.log('Token found:', token);
        if (!token) {
            console.log('No token found, redirecting to index.html');
            window.location.href = '../views/index.html';
        } else {
            this.fetchUserNotes(); // Llama a la función para obtener notas
        }
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null; // Retorna null si no se encuentra
        },
        async fetchUserNotes() {
            try {
                const response = await fetch('https://localhost:5000/api/v1/notes/getUserNotes', {
                    method: 'GET',
                    credentials: 'include', // Incluir cookies en la solicitud
                });
                if (response.ok) {
                    this.notes = await response.json(); // Guardar las notas en el estado
                } else {
                    console.error('Error fetching notes:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        },
        truncateContent(content) {
            return content.length > 30 ? content.slice(0, 30) + '...' : content; // Truncar el contenido si es muy largo
        },
        getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color; // Generar color aleatorio
        },
        addNote() {
            // Aquí puedes manejar la lógica para agregar una nueva nota
            console.log('Add Note clicked');
        },
    },
};
</script>

<style>
/* Aquí puedes mantener tus estilos existentes o agregar nuevos según lo necesites */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #1c1c1c;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    background-color: #1c1c1c;
    z-index: 1000;
}

.header h1 {
    margin: 0;
    font-size: 2em;
}

.header .icons {
    display: flex;
    gap: 10px;
}

.header .icons i {
    background-color: #3a3a3a;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}

.content {
    text-align: center;
    margin-top: 100px; /* Evitar que el contenido se esconda detrás del encabezado fijo */
}

.notes-list {
    margin-top: 100px; /* Ajustar margen para el contenido */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.note {
    background-color: #3a3a3a; /* Color de fondo predeterminado */
    margin: 10px;
    padding: 15px;
    border-radius: 8px;
    width: 80%;
    transition: background-color 0.3s;
}

.add-note {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #3a3a3a;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.add-note i {
    font-size: 2em;
}

/* Media queries */
@media (max-width: 600px) {
    .header h1 {
        font-size: 1.5em;
    }

    .header .icons i {
        padding: 8px;
    }

    .content p {
        font-size: 1em;
    }

    .add-note {
        width: 50px;
        height: 50px;
    }

    .add-note i {
        font-size: 1.5em;
    }
}

@media (min-width: 601px) and (max-width: 1040px) {
    .header h1 {
        font-size: 1.8em;
    }

    .header .icons i {
        padding: 9px;
    }

    .content p {
        font-size: 1.1em;
    }

    .add-note {
        width: 55px;
        height: 55px;
    }

    .add-note i {
        font-size: 1.8em;
    }
}
</style>
