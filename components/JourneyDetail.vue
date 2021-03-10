<template>
  <div>{{ journeyDetails }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Departure, Journey } from '~/types'

@Component
export default class JourneyDetail extends Vue {
  @Prop() readonly journey!: Departure
  journeyDetails!: Journey
  loading = true

  loadJourney() {
    this.$api
      .journey(this.journey)
      .then((data: Journey) => {
        this.journeyDetails = data
      })
      .catch((error: any) => {
        throw error
      })
      .finally(() => {
        this.loading = false
      })
  }

  mounted() {
    this.loadJourney()
  }
}
</script>
