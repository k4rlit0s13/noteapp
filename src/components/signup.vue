<template>
    <body>
      <div class="container">
        <div class="icon">
          <img alt="Icon with a plus sign inside a square" src="../storage/img/register.svg" />
        </div>
        <h1>REGISTER</h1>
        <form @submit.prevent="handleSubmit">
          <input v-model="username" placeholder="Username" type="text" />
          <input v-model="email" placeholder="Email" type="text" />
          <input v-model="password" placeholder="Password" type="password" />
          <button class="button" type="submit">Create</button>
          <a class="back-button" href="../index.html">Back</a>
        </form>
  
        <!-- Modal de resultado -->
        <div v-if="showModal" class="modal">
          <p>{{ modalMessage }}</p>
          <button @click="closeModal">OK</button>
        </div>
      </div>
    </body>
  </template>
  
  <script>
  export default {
    name: 'signup',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        showModal: false,
        modalMessage: '',
        redirectToIndex: false // Nueva propiedad para redirigir
      };
    },
    methods: {
      async handleSubmit() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!this.username || !this.email || !this.password) {
          this.modalMessage = 'All fields are required';
          this.showModal = true;
          return;
        }
  
        if (!emailRegex.test(this.email)) {
          this.modalMessage = 'Please enter a valid email address';
          this.showModal = true;
          return;
        }
  
        try {
          const response = await fetch('https://localhost:5000/api/v1/users/createuser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password
            })
          });
  
          const responseData = await response.json();
  
          if (response.ok) {
            this.modalMessage = 'Successfully created';
            this.redirectToIndex = true; // Indicar que se debe redirigir al cerrar el modal
          } else {
            this.modalMessage = responseData.error || 'Error with the creation';
          }
        } catch (error) {
          console.error('Error:', error);
          this.modalMessage = 'Error with the creation';
        } finally {
          this.showModal = true;
        }
      },
      closeModal() {
        this.showModal = false;
        if (this.redirectToIndex) {
          window.location.href = '../index.html'; // Redirigir a index.html
        }
      }
    }
  };
  </script>
  
  
  <style>
  /* Estilos principales */
  body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1c1c1c;
    font-family: Arial, sans-serif;
  }
  
  .container {
    text-align: center;
    width: 300px;
  }
  
  .icon {
    margin-bottom: 20px;
  }
  
  .icon img {
    width: 200px;
    height: 200px;
  }
  
  h1 {
    color: #b3b3b3;
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  input[type="text"],
  input[type="password"] {
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 25px;
    background-color: #333;
    color: #b3b3b3;
    font-size: 16px;
    text-align: left;
    padding-left: 10px;
  }
  
  .button,
  .back-button {
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px auto;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }
  
  .button {
    background-color: white;
    color: black;
  }
  
  .back-button {
    background-color: #333;
    color: #b3b3b3;
  }
  
  /* Estilos del modal */
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #333;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 300px;
    text-align: center;
    z-index: 1000;
  }
  
  .modal button {
    background-color: white;
    color: black;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  </style>
  