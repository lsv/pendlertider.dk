<template>
  <div class="container">
    <b-loading v-model="loading" :is-full-page="true"></b-loading>
    <section v-if="!loading">
      <h1 class="title">
        <nuxt-link :to="{ name: 'index' }">
          <b-icon icon="chevron-left"></b-icon>
        </nuxt-link>
        <b-icon icon="star-plus"></b-icon>
        <b-icon icon="star-minus"></b-icon>
        <b-icon icon="star"></b-icon>
        <b-icon icon="star-off"></b-icon>
        <span v-text="stationData.name"></span>
      </h1>
      <nuxt-child :station="stationData"></nuxt-child>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { StopLocation } from '~/types'

@Component({
  asyncData({ params }) {
    const station = params.station
    return { station }
  },
})
export default class StationId extends Vue {
  loading: boolean = true
  station: string = ''
  stationData!: StopLocation

  loadStationData() {
    this.loading = true
    this.$api
      .station(this.station)
      .then((data: StopLocation) => {
        this.stationData = data
      })
      .catch((error: any) => {
        throw error
      })
      .finally(() => {
        this.loading = false
      })
  }

  mounted() {
    this.loadStationData()
  }
}
</script>
