<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Major">{{ item.major }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
        {
          id: 1,
          name: "Aw Xin Min",
          major: "Business Analytics",
          email: "awxinmin@crescent.com"
        },
        {
          id: 2,
          name: "Chia Ai Fen",
          major: "Computer Science",
          email: "chiaifen@gmail.com"
        },
        {
          id: 3,
          name: "Goh Jia Yi",
          major: "Business Analytics",
          email: "goohjy@gmail.com"
        },
        {
          id: 4,
          name: "Sean Lee",
          major: "Business Administration",
          email: "seanljh@hotmail.com"
        }
      ]
    };
  }
};
</script>
