<template>

    <body>
        <div class="header">
            <h1>Notes</h1>
            <div class="icons">
                <i class="fas fa-search"></i>
                <i class="fas fa-info-circle"></i>
            </div>
        </div>
        <div class="content">
            <img alt="Illustration of a person standing next to a large notepad and pencil"
                src="../storage/img/note.svg" />
            <p>Create your first note !</p>
        </div>
        <div class="add-note">
            <i class="fas fa-plus"></i>
        </div>
    </body>
</template>

<script>
export default {
    name: 'home',
    mounted() {
        const cookies = document.cookie.split('; ');
        console.log('All cookies:', cookies); // Imprime todas las cookies
        const token = this.getCookie('auth_token');
        console.log('Token found:', token); // Verifica el valor del token
        if (!token) {
            console.log('No token found, redirecting to index.html');
            window.location.href = '../views/index.html';
        }
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null; // Retorna null si no se encuentra
        },
    }

};
</script>




<style>
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
    margin-top: 100px;
    /* Add margin to avoid content being hidden behind the fixed header */
}

.content img {
    width: 100%;
    /* Adjust the width to make the image larger */
    height: auto;
    margin-bottom: 20px;
}

.content p {
    font-size: 1.2em;
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