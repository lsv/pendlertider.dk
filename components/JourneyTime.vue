<template>
  <span v-if="time">
    <template v-if="time.changed">
      <span class="realtime" v-text="time.rtDatetime.toFormat('HH:mm')"></span>
      <span class="delay" v-text="time.datetime.toFormat('HH:mm')"></span>
    </template>
    <template v-else>
      <span class="time" v-text="time.datetime.toFormat('HH:mm')"></span>
    </template>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import {JourneyDate} from "~/types";
@Component
export default class JourneyTime extends Vue {
  @Prop() readonly time!: JourneyDate
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
