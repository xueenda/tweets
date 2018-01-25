<template>
  <div class="columns">
    <div class="column col-4">
      <a :href="partners[0].branch_link" v-if="partners[0]">
        <img :src="partners[0].avatar || partners[0].pics[0]">
      </a>
    </div>
    <div class="column col-4">
      <a :href="partners[1].branch_link" v-if="partners[1]">
        <img :src="partners[1].avatar || partners[1].pics[0]">
      </a>
    </div>
    <div class="column col-4">
      <a :href="partners[2].branch_link" v-if="partners[2]">
        <img :src="partners[2].avatar || partners[2].pics[0]">
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["partners"]
}

</script>

