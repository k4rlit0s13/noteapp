<template>
    <body>
        <div class="container">
            <div class="icon">
                <img alt="Icon with a plus sign inside a square" src="../storage/img/register.svg" />
            </div>
            <h1>
                REGISTER
            </h1>
            <form>
                <input placeholder="Email" type="text" />
                <input placeholder="Password" type="password" />
                <a class="button" href="#">
                    create
                </a>
                <a class="back-button" href="../index.html">
                    back
                </a>
            </form>
        </div>
    </body>
</template>
  
<script>
export default {
    name: 'signup'
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
</style>