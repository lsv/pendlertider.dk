<template>
  <section>
    <b-loading v-model="loading"></b-loading>
    <template v-if="departures">
      <div class="switches">
        <b-field>
          Use train
          <b-switch
            v-model="useTog"
            size="is-small"
            @input="loadDepartures"
          ></b-switch>
        </b-field>
        <b-field>
          Use bus
          <b-switch
            v-model="useBus"
            size="is-small"
            @input="loadDepartures"
          ></b-switch>
        </b-field>
        <b-field>
          Use metro
          <b-switch
            v-model="useMetro"
            size="is-small"
            @input="loadDepartures"
          ></b-switch>
        </b-field>
      </div>
      <p v-if="nexttime" @click="resetNext">To start</p>
      <board :rows="departures" :departure="true"></board>
      <p @click="loadNext">Next</p>
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { DateTime } from 'luxon'
import { StopLocation, Departure } from '~/types'
import Board from '~/components/Board.vue'

@Component({
  components: {
    Board,
  },
})
export default class Index extends Vue {
  @Prop() readonly station!: StopLocation
  loading: boolean = true
  departures: Array<Departure> = []
  useTog = true
  useBus = true
  useMetro = true
  reloader: any = undefined
  nexttime: DateTime | null = null

  resetNext() {
    this.nexttime = null
  }

  loadNext() {
    const element = this.departures[this.departures.length - 1]
    this.nexttime = element.trainDate.datetime
    this.loadDepartures()
  }

  loadDepartures() {
    this.loading = true
    this.$api
      .departureBoard(
        this.station.id,
        this.nexttime,
        this.useTog,
        this.useMetro,
        this.useBus
      )
      .then((data: Array<Departure>) => {
        this.departures = data
      })
      .catch((error: any) => {
        throw error
      })
      .finally(() => {
        this.loading = false
      })
  }

  mounted() {
    this.loadDepartures()
    this.reloader = setInterval(this.loadDepartures, 30000)
  }
}
</script>

<style scoped lang="scss">
.switches {
  display: flex;
  text-align: right;
  justify-content: flex-end;
}
</style>
