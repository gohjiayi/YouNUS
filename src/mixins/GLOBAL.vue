<template>
  <div></div>
</template>

<script>
export default {
  data(){
    return {
      users: [
        { id: 1, username: "Jnson" },
        { id: 2, username: "Mark" },
        { id: 3, username: "Ponting" },
        { id: 4, username: "lee" }
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