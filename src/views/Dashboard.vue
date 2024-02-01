<script setup>
  import {ref, onMounted} from 'vue';
  import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy} from 'firebase/firestore'
  import {db} from '@/firebase'
  import {useRouter} from 'vue-router';
  import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'

  const fbCollectionRef = collection(db, 'todos');
  const todosCollectionQuery = query(fbCollectionRef, orderBy('date', 'desc'));

  
  const router = useRouter();
  const newTodo = ref('');
  const isLoggedIn = ref(false);

  const LogOut = () => {
      signOut(auth).then(() => {
        router.push('/login')
      });
    }
  const todos = ref([

    ])
  let auth;
  onMounted(async () => {

    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user){
        isLoggedIn.value = true;
      }else{
        isLoggedIn.value = false;
      }
    });


    // const querySnapshot = await getDocs(collection(db, 'todos'));
    // let fbTodos = []
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   const todo = {
    //     id: doc.id,
    //     content: doc.data().content,
    //     done: doc.data().done
    //   }
    //   fbTodos.push(todo)
    // });
    // todos.value = fbTodos;

    onSnapshot(todosCollectionQuery, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done
          }
          fbTodos.push(todo)
      });
     todos.value = fbTodos
    });
  })

  const add = () => {
    // id.value += 1;
    // const addTodo = {
    //   id: id.value,
    //   content: newTodo.value,
    //   done: false
    // }
    // todos.value.push(addTodo);

    addDoc(fbCollectionRef, {
    content: newTodo.value,
    done: false,
    date: Date.now()
  });
    newTodo.value = '';
  }

  const deleteTodo = id => {
    deleteDoc(doc(fbCollectionRef, id))
  }

  const done = id => {
    const index = todos.value.findIndex(todo => todo.id === id);

    updateDoc(doc(fbCollectionRef, id), {
      done: !todos.value[index].done
    })
  }
  
  
</script>

<template>
  <div class="container">
    <div>
      <button class="logout" @click="LogOut" v-if="isLoggedIn">Sign Out</button>
    </div>
    <div class="search-container">
    <input v-model="newTodo" id="userInput" class="search-bar" type="text" placeholder="Add a todo">
    <button :disabled="!newTodo" @click="add" class="add">Add</button>
  </div>
  <div class="content">
    <div class="todo-list">
      <div v-for="todo in todos" :class="todo.done ? 'completed' : 'item'">
        <div class="todo-info">
          <p id="content">{{ todo.content }}</p>
        </div>
        <div class="editor">
          <button  :class="todo.done ? 'btn-completed' : 'not-completed'" @click="done(todo.id)" class="btn">Done</button>
          <button @click="deleteTodo(todo.id)" :id="todo.id" class="btn delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  background-color: rgb(36, 34, 34);
  width: 100vw;
  height: 100vh;
}
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

  .completed {
    width: 450px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: lightgreen;;
    text-decoration: line-through;
    color: green;
    font-weight: bolder;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
  }

  .btn-completed {
    background-color: rgb(20, 211, 20);
    color: white;
    cursor: pointer;
  }

  .not-completed {
    background-color: skyblue;
    color: black;
    cursor: pointer;
  }

  .logout {
    height: 40px;
    width: 80px;
    float: right;
    margin: 10px;
    color: white;
    font-weight: bolder;
    background-color: skyblue;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
</style>