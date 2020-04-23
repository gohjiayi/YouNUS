<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients">

      <template slot-scope="props">
        <b-table-column class="has-no-head-mobile is-image-cell">
          <div class="image">
            <img :src="props.row.avatar" :alt="props.row.name" class="is-rounded">
          </div>
        </b-table-column>
        <b-table-column label="Module" field="module" sortable>
          {{ project.item.module }}
        </b-table-column>
        <b-table-column label="Project" field="project" sortable>
          {{ project.item.projectName }}
        </b-table-column>
        <b-table-column label="Days Left" field="daysleft" sortable>
          {{ project.item.countdown }}
        </b-table-column>
        <b-table-column label="Created">
            <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ project.item.dueDate }}</small>
        </b-table-column>
      </template>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import ModalBox from './ModalBox'
const firebase = require('../../firebase/firebaseConfig.js');

export default {
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      projectsList: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  mounted () {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.clients = r.data.data
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }


        // current date => to get upcoming projects
        var time = new Date().toJSON().slice(0, 10)
        firebase.db.collection('projects').orderBy("dueDate").where("dueDate", ">=", time).get().then((querySnapShot) => {
            let item = {}
            querySnapShot.forEach(doc => {
                item = doc.data();
                const diffTime = Math.abs(Date.parse(item.dueDate) - new Date());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
                if (diffDays == 1) {
                    item.countdown = diffDays + " day";
                } else {
                    item.countdown = diffDays + " days";
                }
                this.projectsList.push({ item });
            });
        });
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
