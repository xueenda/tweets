/* eslint-disable */
<template>
  <div class="page">
    <div class="container">
      <div class="columns">
        <div class="column col-6 col-mx-auto application-container">
          <h1 class="s-title">Search Tweets</h1>
          <div class="input-group">
            <input type="text" class="form-input" placeholder="" v-model="term">
            <button class="btn btn-primary input-group-btn" @click="search">Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '../api'

export default {
  mounted() {

    },
    watch: {

    },
    data() {
      return {
        term: ''
      }
    },
    methods: {
      search() {
        console.log(this.term)
      },
    }
}

</script>
<style scoped>
.container {
  margin: auto;
  max-width: 1000px;
}

.application-container {
  margin-top: 15vh;
}

.panel-body {
  height: 170px;
  overflow: scroll;
}

.apply-now {
  margin-top: 10px;
}

.application-submitted {
  margin-top: 70px;
}

.column {
  padding-right: 0;
}

</style>

