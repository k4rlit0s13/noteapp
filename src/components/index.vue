<template>

  <body>
    <div class="container">
      <div class="icon">
        <img src="../storage/img/noteicon.svg" alt="Icon of a pencil inside a square" />
      </div>
      <div class="title">NOTES</div>
      <input type="text" v-model="email" class="input-field" placeholder="Email" />
      <input type="password" v-model="password" class="input-field" placeholder="Password" />
      <button @click="login" class="button signup-button">Login</button>
      <a class="button login-button" href="../views/signup.html">Sign Up</a>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </body>
</template>

<script>
import axios from 'axios';

export default {
  name: 'index',
  data() {
    return {
      email: '',
      password: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://localhost:5000/api/v1/users/authenticate', {
          email: this.email,
          password: this.password
        }, { withCredentials: true });


        this.successMessage = response.data.message;

        // Redirigir a la página de inicio después de 2 segundos
        setTimeout(() => {
          window.location.href = '../views/home.html'; // Cambiar a window.location.href
        }, 500);

      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      }
    }
  }
}
</script>



<style>
/* Estilo previo */
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 300px;
  padding: 20px;
  box-sizing: border-box;
}

.icon img {
  width: 200px;
  height: 200px;
}

.title {
  font-size: 24px;
  color: #B3B3B3;
  margin-bottom: 40px;
}

.input-field {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 25px;
  background-color: #4A4A4A;
  color: #B3B3B3;
  font-size: 16px;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: #B3B3B3;
}

.button {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
}

.login-button {
  background-color: white;
  color: black;
  text-decoration: none;
}

.signup-button {
  background-color: black;
  color: white;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
