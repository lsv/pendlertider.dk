<i18n>
{
  "en": {
    "departures": "Departures",
    "arrivals": "Arrivals"
  },
  "da": {
    "departures": "Afgange",
    "arrivals": "Ankomster"
  }
}
</i18n>

<template>
  <b-tabs
    v-model="activeTab"
    position="is-centered"
    size="is-medium"
    type="is-toggle"
    class="block"
    :animated="false"
  >
    <b-tab-item key="departure" value="departure" :label="$t('departures')">
      <departure-board :station="station"></departure-board>
    </b-tab-item>
    <b-tab-item key="arrival" value="arrival" :label="$t('arrivals')">
      <arrival-board :station="station"></arrival-board>
    </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import DepartureBoard from '~/components/DepartureBoard.js'
import ArrivalBoard from '~/components/ArrivalBoard.js'
import { StopLocation } from '~/types'

@Component({
  components: {
    DepartureBoard,
    ArrivalBoard,
  },
})
export default class StationId extends Vue {
  @Prop() readonly station!: StopLocation
  activeTab: string = 'departure'
}
</script>
