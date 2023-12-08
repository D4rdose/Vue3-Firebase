<script setup>
  import {ref} from 'vue';
  const userInput = ref('')
  const add = () => {
  const content = document.getElementById("content");
  content.innerHTML = userInput.value;
  }
  
</script>

<template>
  <div class="search-container">
    <input v-model="userInput" id="userInput" class="search-bar" type="text" placeholder="Add a todo">
    <button @click="add" class="add">Add</button>
  </div>
  <div class="content">
    <div class="todo-list">
      <div class="item">
        <div class="todo-info">
          <p id="content">Hello World</p>
        </div>
        <div class="editor">
          <button class="btn edit"> Edit</button>
          <button class="btn delete">Delete</button>
        </div>
      </div>
      <div class="item">
        <div class="todo-info">
          <p>Hello World</p>
        </div>
        <div class="editor">
          <button class="btn edit"> Edit</button>
          <button class="btn delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
  .search-container {
    max-width: 450px;
    padding: 20px;
    margin: 0 auto;
  }
  .search-bar {
    width: 325px;
    height: 50px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    padding-left: 10px; 
  }
  
  .add {
    height: 50px;
    width: 50px;
    border: none;
    border-radius: 5px;
    background-color: skyblue;
    color: white;
    font-weight: bolder;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .item {
    width: 450px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: rgb(233, 230, 230);
    color: black;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
  }

  .btn {
    width: 60px; 
    height: 30px;
    border: none;
    margin: 5px;
    border-radius: 5px;
  }

  .edit {
    background-color: skyblue;
    color: black;
    font-weight: bolder;
  }

  .delete {
    color: white;
    background-color: red;
    font-weight: bolder;
  }
  .todo-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>