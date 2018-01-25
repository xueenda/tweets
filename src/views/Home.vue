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
          <br>
          <br>
          <div class="tile" v-for="tweet in tweets">
            <div class="tile-content">
              <p class="tile-title" v-html=hashify(urlify(tweet.text))></p>
              <p class="tile-subtitle text-gray float-right">{{tweet.user_id}} {{tweet.created_at}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '../api'
import util from '../helper/util'

export default {
  mounted() {
      let query = util.parseQuery(location.search);

      if (query && query.term) {
        this.term = query.term;
        this.search(null, query.term);
      }
    },
    watch: {

    },
    data() {
      return {
        term: '',
        tweets: []
      }
    },
    methods: {
      search(e, term) {
        console.log(term);
        Api.search(term || this.term).then(res => this.tweets = res);
      },
      urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
          return '<a href="' + url + '">' + url + '</a>';
        })
      },

      hashify(text) {
        var hashRegex = /(#[^\s]+)/g;
        return text.replace(hashRegex, function(hash) {
          return '<a href="' + Config.api_url + '/term=' + hash.replace('#', '') + '">' + hash + '</a>';
        })
      }

    }
}

</script>
<style scoped>
.s-title {
  text-align: center;
}

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

