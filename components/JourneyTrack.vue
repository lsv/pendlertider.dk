<template>
  <span v-if="track">
    <template v-if="track.changed">
      <span class="realtime" v-text="track.rtTrack"></span>
      <span class="delay" v-text="track.track"></span>
    </template>
    <template v-else>
      <span v-text="track.track"></span>
    </template>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Track } from '~/types'
@Component
export default class JourneyTrack extends Vue {
  @Prop() readonly track!: Track
}
</script>

<style scoped>
.realtime {
  color: red;
}
.delay {
  text-decoration: line-through;
}
</style>
