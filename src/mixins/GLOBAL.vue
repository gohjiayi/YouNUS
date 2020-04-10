<template>
    <div></div>
</template>

<script>
    export default {
        data(){
            return {
                users: [
                    { id: 1, username: "Ai Fen" },
                    { id: 2, username: "Sean" },
                    { id: 3, username: "Jia Yi" },
                    { id: 4, username: "Jeremy" }
                ]
            }
        },
        computed:{
            onlyUserNamesOfUsers(){
                return this.users.map(u=>u.username)
            }
        }
    }
</script>

<style>
</style>
