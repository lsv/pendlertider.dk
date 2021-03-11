<template>
  <b-tabs
    v-model="activeTab"
    position="is-centered"
    size="is-medium"
    type="is-toggle"
    class="block"
    :animated="false"
  >
    <b-tab-item key="departure" value="departure" label="Departures">
      <departure-board :station="station"></departure-board>
    </b-tab-item>
    <b-tab-item key="arrival" value="arrival" label="Arrivals">
      <arrival-board :station="station"></arrival-board>
    </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import DepartureBoard from '~/components/DepartureBoard.vue'
import ArrivalBoard from '~/components/ArrivalBoard.vue'
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
