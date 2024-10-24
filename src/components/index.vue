<template>
  <body>
    <div class="container">
      <div class="icon">
        <img src="../storage/img/noteicon.svg" alt="Icon of a pencil inside a square">
      </div>
      <div class="title">NOTES</div>
      <input type="text" class="input-field" placeholder="Email">
      <input type="password" class="input-field" placeholder="Password">
      <button class="button signup-button">login</button>
      <a class="button login-button" href="../views/signup.html">sign up</a>
    </div>
  </body>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style>
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

.icon {
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
</style>