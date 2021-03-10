<template>
  <departure-board :station="station"></departure-board>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import DepartureBoard from '~/components/DepartureBoard.vue'
import { StopLocation } from '~/types'

@Component({
  components: {
    DepartureBoard,
  },
})
export default class StationId extends Vue {
  @Prop() readonly station!: StopLocation
}
</script>
