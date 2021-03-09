<template>
  <section>
    <b-loading :is-full-page="true" v-model="loading"></b-loading>
    <template v-if="stationData && departures">
      <h1 v-text="stationData.name"></h1>
      <board :departures="departures"></board>
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Departure } from '~/types'
import { StopLocation } from "~/types";
import Board from "~/components/Board.vue";

@Component({
  components: {
    Board
  }
})
export default class Index extends Vue {
  @Prop([String]) readonly station!: string
  loading: boolean = true
  departures: Array<Departure> = []
  stationData: StopLocation = null

  loadStationData() {
    this.$api.station(this.station)
      .then((data: StopLocation) => {
        this.stationData = data
        return data
      })
      .catch((error: any) => {
        throw error
      })
  }

  loadDepartures() {
    this.$api.departureBoard(this.station)
      .then((data: Array<Departure>) => {
        this.departures = data
        return data
      })
      .catch((error: any) => {
        throw error
      })
  }

  mounted() {
    Promise.all([this.loadStationData(), this.loadDepartures()]).then((data: any) => {
      this.loading = false
    })
  }
}
</script>
