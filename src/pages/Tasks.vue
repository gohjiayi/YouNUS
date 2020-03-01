<template>
    <div id="app1">
        
        <h1>Todo List</h1>
        <section>
            <div>
                <input v-model="inputField" v-on:keyup.enter="addTodo" placeholder="Todo Item"
                       style="margin: auto; display: block"/>
                <br/>
                <button @click="addTodo" class="btn btn-primary">Add Todo</button>
            </div>
        </section>

        <section style="text-align: center">
            <div class="row">
                <div class="offset-md-3 col-md-6 mt-3">
                    <ol class="list-group justify-content-center" start="1">
                        <li class="row list-group-item border mt-2" v-for="todo in todoList" :key="todo">
                            <div style="align-content: center">
                                <input type="checkbox" v-on:change="toggle(todo)" v-bind:checked="todo.complete">
                                <del v-if="todo.complete" class="col-sm-8">
                                    <h5>{{ todo.name }}</h5>
                                </del>
                                <span v-else class="col-sm-8">
                           <h5>{{ todo.name }}</h5>
                                    <p>{{getCurrentDate()}}</p>
                        </span>
                                <span @click="deleteTodo(todo)" style="float:right;" class="delete">X</span>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </section>

    </div>

</template>

<script>
    '../../node_modules/bootstrap/dist/css/bootstrap.css';
    '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
    export default {
        name: 'app1',
        components: {},
        methods: {
            addTodo: function (todo) {
                todo = this.inputField;
                this.todoList.push({name: todo, complete: false});
                this.inputField = '';
                console.log(this.todoList);
            },
            deleteTodo: function (todo) {
                var index = this.todoList.indexOf(todo);
                this.todoList.splice(index, 1);
                console.log(this.todoList);
            },
            toggle: function (todo) {
                todo.complete = !todo.complete;
            },
            getCurrentDate: function () {
                var date = new Date().toString();
                console.log(date);
                return date;
            },
        },
        data() {
            return {
                inputField: '',
                todoList: []
            }
        }

    }
</script>

<style scoped>
    #app1 {
        font-family: 'Avenir', Helvetica, Arial, sans-serif !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-align: center !important;
        color: #2c3e50 !important;
        margin-top: 60px !important;
    }

    h1, h2 {
        font-weight: normal !important;
    }

    h5 {
        margin-bottom: 0px !important;
    }

    ul {
        list-style-type: none !important;
        padding: 0 !important;
    }

    li {
        display: inline-block !important;
        margin: 0 10px !important;
    }

    a {
        color: #42b983 !important;
    }

    .delete {
        color: pink !important;
        cursor: pointer !important;
    }

    .delete:hover {
        color: red !important;
    }
</style>
