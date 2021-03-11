<template>
  <div class="container">
    <section class="section">
      <h2 class="subtitle">Search</h2>
      <search-bar></search-bar>
    </section>

    <section class="section">
      <h2 class="subtitle">Favorites</h2>
      <favorite></favorite>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SearchBar from '~/components/SearchBar.vue'
import Favorite from '~/components/Favorite.vue'

@Component({
  components: {
    SearchBar,
    Favorite,
  },
})
export default class Index extends Vue {}
</script>
