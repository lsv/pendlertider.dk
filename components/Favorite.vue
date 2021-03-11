<template>
  <section>
    <b-loading v-model="loading"></b-loading>
    <template v-if="favorites && favorites.length > 0">
      <ul>
        <li v-for="favorite in favorites" :key="favorite.id">
          <station-name :stop="favorite" :backlink="false"></station-name>
        </li>
      </ul>
    </template>
    <template v-if="favorites.length === 0">
      <p>No favorites added, use the search and add it to favorites</p>
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { getFavoritesStore } from '~/store'
import { StopLocation } from '~/types'

@Component
export default class Favorite extends Vue {
  favorites: StopLocation[] = []
  loading: boolean = true

  mounted() {
    this.loading = true
    getFavoritesStore(this.$store)
      .init()
      .then(() => {
        this.favorites = getFavoritesStore(this.$store).favorites
      })
      .catch((err: any) => {
        throw err
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
