<template>
    <form action="POST" class="form">
        <h3 class="text-center"> Création de compte </h3>
        <div>
            <label class="form-control">Firstname :</label>
            <input type="text" name="Firstname">
        </div>
        <div>
            <label >Lastname :</label>
            <input type="text" name="lastname">
        </div>
        <div>
            <label >Username :</label>
            <input type="text" name="username">
        </div>
        <div>
            <label for="mail">E-mail :</label>
            <input type="email" name="email">
        </div>
        <div>
            <label for="mail">Password :</label>
            <input type="password"  name="password">
        </div>

         <div>
            <button type="submit"> Inscription</button>
        </div>
        <p>Déjà inscrit ici ?</p>
    </form>
</template>
<style>
    .form{
        background: white;
        width: 800px;
        margin: 60px auto;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 100px;
        box-shadow: 0 0 10px #cdd2cd;
    }
    .form div{
        margin-top: 10px;
        margin-bottom: 15px;
    }
    label{
        font-size: 20px; 
        margin-right: 60px;
        margin-left: 25px;
        display: block;
    }
    input{
        font-size: 25px;
        width: 500px;
        margin-left: 25px;
        border-radius: 5px;
    }
    button{
        font-size: 20px;
        border-radius: 5px;
        width: 140px;
        height: 40px;
        background: #1976d2;
        color: white;
    }
</style>