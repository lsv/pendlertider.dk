<i18n>
{
  "en": {
    "to_start": "Back to now",
    "next": "Next"
  },
  "da": {
    "to_start": "Tilbage til nu",
    "next": "Næste"
  }
}
</i18n>
<template>
  <section>
    <b-loading v-model="loading"></b-loading>
    <template v-if="rows">
      <board-switches @update="switches"></board-switches>
      <p v-if="nexttime" @click="resetNext" v-text="$t('to_start')"></p>
      <board
        :rows="rows"
        :departure="isDeparture"
        :station="station"
        @view-details="stopReloader"
        @hide-details="startReloader"
      ></board>
      <p @click="loadNext" v-text="$t('next')"></p>
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { DateTime } from 'luxon'
import { StopLocation, Departure, switches } from '~/types'
import Board from '~/components/Board.vue'
import BoardSwitches from '~/components/BoardSwitches.vue'

@Component({
  components: {
    BoardSwitches,
    Board,
  },
})
export default class BoardMixin extends Vue {
  apiRoute: string = ''
  isDeparture: boolean = true

  @Prop() readonly station!: StopLocation
  loading: boolean = true
  rows: Array<Departure> = []
  reloader: any = undefined
  nexttime: DateTime | null = null
  useTog: boolean = true
  useMetro: boolean = true
  useBus: boolean = true

  resetNext() {
    this.nexttime = null
  }

  loadNext() {
    const element = this.rows[this.rows.length - 1]
    this.nexttime = element.time.datetime
  }

  switches(e: switches) {
    this.useTog = e.useTog
    this.useMetro = e.useMetro
    this.useBus = e.useBus
  }

  @Watch('nexttime')
  @Watch('useMetro')
  @Watch('useTog')
  @Watch('useBus')
  loadRows() {
    this.loading = true
    // @ts-ignore
    this.$api[this.apiRoute](
      this.station.id,
      this.nexttime,
      this.useTog,
      this.useMetro,
      this.useBus
    )
      .then((data: Array<Departure>) => {
        this.rows = data
      })
      .catch((error: any) => {
        throw error
      })
      .finally(() => {
        this.loading = false
      })
  }

  stopReloader() {
    clearInterval(this.reloader)
    this.reloader = undefined
  }

  startReloader() {
    this.reloader = setInterval(this.loadRows, 30_000)
  }

  mounted() {
    this.loadRows()
    this.startReloader()
  }
}
</script>
