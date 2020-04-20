<template>
  <div></div>
</template>

<script>
export default {
  data(){
    return {
      users: [
        { id: 1, username: "Xin Min" },
        { id: 2, username: "Ai Fen" },
        { id: 3, username: "Jia Yi" },
        { id: 4, username: "Sean" }
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
