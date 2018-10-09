<template>
      <p id="about">
      Made with &#x2764; by <a href="https://chetbox.com">chetbox</a>
      <br />
      inspired by <a href="https://www.youtube.com/watch?v=_OTUGVAEWCA">this video</a> and <a href="http://reddit.com/r/place">Reddit Place</a>
      <br />
      <br />
      <a href="https://github.com/chetbox/place">Fork me on GitHub</a>
    </p>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {}
</script>

<style scoped>
#about {
  text-align: center;
  font-size: 0.8em;
}
</style>
