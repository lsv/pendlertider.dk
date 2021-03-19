<template>
  <h3 class="title">
    <nuxt-link v-if="backlink" :to="localePath('index')">
      <b-icon icon="chevron-left"></b-icon>
    </nuxt-link>

    <span v-if="isFavorite()">
      <b-icon
        :icon="hover ? 'star-minus' : 'star'"
        @click.native="removeFavorite()"
        @mouseover.native="hover = true"
        @mouseleave.native="hover = false"
      ></b-icon>
    </span>
    <span v-else>
      <b-icon
        :icon="hover ? 'star-plus' : 'star-outline'"
        @click.native="addFavorite()"
        @mouseover.native="hover = true"
        @mouseleave.native="hover = false"
      ></b-icon>
    </span>

    <nuxt-link
      v-if="nextlink"
      :to="
        localePath({
          name: 'station-station-boards',
          params: { station: stop.id },
        })
      "
    >
      <span v-text="stop.name"></span>
    </nuxt-link>
    <span v-else v-text="stop.name"></span>
  </h3>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { StopLocation } from '~/types'
import { getFavoritesStore } from '~/store'

@Component
export default class StationName extends Vue {
  @Prop({ required: true }) readonly stop!: StopLocation
  @Prop({ default: true }) readonly backlink!: boolean
  @Prop({ default: true }) readonly nextlink!: boolean
  hover: boolean = false

  isFavorite() {
    return getFavoritesStore(this.$store).isFavorite(this.stop)
  }

  removeFavorite() {
    getFavoritesStore(this.$store).removeFavorite(this.stop)
  }

  addFavorite() {
    getFavoritesStore(this.$store).addFavorite(this.stop)
  }

  async mounted() {
    await getFavoritesStore(this.$store).init()
  }
}
</script>
