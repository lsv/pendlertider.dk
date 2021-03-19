<i18n>
{
  "en": {
    "search": "Search",
    "favorites": "Favorites"
  },
  "da": {
    "search": "Søg",
    "favorites": "Favoritter"
  }
}
</i18n>

<template>
  <div class="container">
    <section class="content section">
      <h2 class="subtitle" v-text="$t('search')"></h2>
      <search-bar></search-bar>
    </section>

    <section class="content section">
      <h2 class="subtitle" v-text="$t('favorites')"></h2>
      <favorite></favorite>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SearchBar from '~/components/Index/SearchBar.vue'
import Favorite from '~/components/Index/Favorite.vue'

@Component({
  components: {
    SearchBar,
    Favorite,
  },
})
export default class Index extends Vue {}
</script>
