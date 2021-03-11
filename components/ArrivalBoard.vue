<template>
  <section>
    <b-loading v-model="loading"></b-loading>
    <template v-if="arrivals">
      <div class="switches">
        <b-field>
          Use train
          <b-switch
            v-model="useTog"
            size="is-small"
            @input="loadArrivals"
          ></b-switch>
        </b-field>
        <b-field>
          Use bus
          <b-switch
            v-model="useBus"
            size="is-small"
            @input="loadArrivals"
          ></b-switch>
        </b-field>
        <b-field>
          Use metro
          <b-switch
            v-model="useMetro"
            size="is-small"
            @input="loadArrivals"
          ></b-switch>
        </b-field>
      </div>
      <p v-if="nexttime" @click="resetNext">To start</p>
      <board
        :rows="arrivals"
        :departure="false"
        :station="station"
        @view-details="stopReloader"
        @hide-details="startReloader"
      ></board>
      <p @click="loadNext">Next</p>
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { DateTime } from 'luxon'
import { StopLocation, Arrival } from '~/types'
import Board from '~/components/Board.vue'

@Component({
  components: {
    Board,
  },
})
export default class Index extends Vue {
  @Prop() readonly station!: StopLocation
  loading: boolean = true
  arrivals: Array<Arrival> = []
  useTog = true
  useBus = true
  useMetro = true
  reloader: any = undefined
  nexttime: DateTime | null = null

  stopReloader() {
    clearInterval(this.reloader)
    this.reloader = undefined
  }

  startReloader() {
    this.reloader = setInterval(this.loadArrivals, 30_000)
  }

  resetNext() {
    this.nexttime = null
  }

  loadNext() {
    const element = this.arrivals[this.arrivals.length - 1]
    this.nexttime = element.time.datetime
    this.loadArrivals()
  }

  loadArrivals() {
    this.loading = true
    this.$api
      .arrivalBoard(
        this.station.id,
        this.nexttime,
        this.useTog,
        this.useMetro,
        this.useBus
      )
      .then((data: Array<Arrival>) => {
        this.arrivals = data
      })
      .catch((error: any) => {
        throw error
      })
      .finally(() => {
        this.loading = false
      })
  }

  mounted() {
    this.loadArrivals()
    this.startReloader()
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
