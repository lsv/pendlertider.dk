<template>
  <div class="container">
    <search-bar></search-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SearchBar from '~/components/SearchBar.vue'

@Component({
  components: {
    SearchBar,
  },
})
export default class Index extends Vue {}
</script>
