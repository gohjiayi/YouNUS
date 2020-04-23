<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <p class="card-header-title">
        <b-icon v-if="icon" :icon="icon" custom-size="default"/>
        {{ title }}
      </p>
      <a v-if="headerIcon" href="#" class="card-header-icon" aria-label="more options" @click.prevent="headerIconClick">
        <b-icon :icon="headerIcon" custom-size="default"/>
      </a>
    </header>
    <div class="card-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    }
  },
  methods: {
    headerIconClick () {
      this.$emit('header-icon-click')
    }
  }
}
</script>

<style scoped>
p {
    font-size: 16px;
    color: #515151;
}

div header {
    background-color:#f7f7f7;
}

.card {
   vertical-align: middle;
   transition: all 0.3s cubic-bezier(.25,.8,.25,1);
   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
   }

.card:hover {
   box-shadow: 0 14px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(215, 230, 255, 0.25);
   }

</style>


