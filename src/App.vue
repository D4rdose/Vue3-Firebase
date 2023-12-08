<script setup>
  import {ref} from 'vue';

  const newTodo = ref('');
  const id = ref(-1);

  const todos = ref([
    
    ])

  const add = () => {
    id.value += 1;
    const addTodo = {
      id: id.value,
      content: newTodo.value,
      done: false
    }
    console.log(addTodo.id);
    todos.value.push(addTodo);
    console.log(todos[id.value])
    newTodo.value = '';
  }

  const deleteTodo = id => {
    todos.value = todos.value.filter(todo => todo.id !== id);
  }

  
  
  
</script>

<template>
  <div class="search-container">
    <input v-model="newTodo" id="userInput" class="search-bar" type="text" placeholder="Add a todo">
    <button :disabled="!newTodo" @click="add" class="add">Add</button>
  </div>
  <div class="content">
    <div class="todo-list">
      <div v-for="todo in todos" class="item">
        <div class="todo-info">
          <p id="content">{{ todo.content }}</p>
        </div>
        <div class="editor">
          <button class="btn done">Done</button>
          <button @click="deleteTodo(todo.id)" :id = "todo.id" class="btn delete">Delete</button>
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
    cursor: pointer;
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

  .done {
    background-color: skyblue;
    color: black;
    font-weight: bolder;
    cursor: pointer;
  }

  .delete {
    color: white;
    background-color: red;
    font-weight: bolder;
    cursor: pointer;
  }
  .todo-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>