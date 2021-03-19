<template>
  <div class="container">
    <b-loading v-model="loading" :is-full-page="true"></b-loading>
    <section v-if="!loading">
      <station-name
        :stop="stationData"
        :backlink="true"
        :nextlink="false"
      ></station-name>
      <nuxt-child :station="stationData"></nuxt-child>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { StopLocation } from '~/types'
import StationName from '~/components/StationName.vue'

@Component({
  components: {
    StationName,
  },
  asyncData({ params }) {
    const station = params.station
    return { station }
  },
})
export default class StationId extends Vue {
  hover: boolean = false
  loading: boolean = true
  station: string = ''
  stationData!: StopLocation

  loadStationData() {
    this.loading = true
    this.$rejseplanApi
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
