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
          name: "Dakota Rice",
          major: "Business Analytics",
          email: "dakota@crescent.com"
        },
        {
          id: 2,
          name: "Minerva Hooper",
          major: "Computer Science",
          email: "hooper1998@gmail.com"
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          major: "Business Analytics",
          email: "sage-jake-rod@gmail.com"
        },
        {
          id: 4,
          name: "Philip Chaney",
          major: "Business Administration",
          email: "philip@hotmail.com"
        }
      ]
    };
  }
};
</script>
