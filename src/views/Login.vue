<script setup>
import {useRouter} from 'vue-router';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {ref} from 'vue';

const router = useRouter();

const email = ref('');
const password = ref('');

const Login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) =>{console.log("successfull login");
    console.log(auth.currentUser);
    router.push('/')
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    })
}


</script>

<template>
    <div class="container" id="pop">
        <div class="input-container">
        <div class="space">
            <label for="username" class="text">Username: </label>
                <input type="text" name="username" class="user-input" v-model="email">
        </div>
        <div class="space">
            <label for="password" class="text">Password: </label>
            <input type="password" name="password" class="user-input" v-model="password">
        </div>
        </div>
        <div class="login flex">
            <button @click="Login()" class="login-btn btn">Login</button>
            <!-- <div class="options">
            <a href="#" class="text">Forgot Password ?</a>
            </div> -->
        </div>
        <div class="register flex">
            <button @click="router.push('/register')" class="register-btn btn">Create new Account</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 500px;
    height: 450px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.login-btn {
 width: 300px;
 color: white;
 background-color: rgb(69, 141, 209);
}

.login {
    flex-wrap: wrap;
    margin: 30px 0;
    padding-bottom: 30px;
    border-bottom: 0.5px solid rgb(51, 50, 50);
}
.options  a{
    font-size: 20px;
    font-weight: normal;
    color: rgb(69, 141, 209);
    text-decoration: none;
}

.register-btn {
    width: 200px;
    color: white;
    background-color: yellowgreen;
}


</style>