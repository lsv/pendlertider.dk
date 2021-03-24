<!--suppress JSUnresolvedVariable -->
<i18n>
{
  "en": {
    "stop_header": "Stop",
    "arrival_time": "Arrival time",
    "departure_time": "Departure time",
    "no_details": "No details about this journey"
  },
  "da": {
    "stop_header": "Stop",
    "arrival_time": "Ankomst tid",
    "departure_time": "Afgangs tid",
    "no_details": "Ingen detaljer om denne rejse"
  }
}
</i18n>
<template>
  <section>
    <div v-if="journeyDetails">
      <template v-if="journeyDetails.messages">
        <dl
          v-for="message in journeyDetails.messages"
          :key="message.header"
          class="box"
        >
          <dt class="bold" v-text="message.header"></dt>
          <dd v-text="message.text"></dd>
        </dl>
      </template>
      <b-table
        v-if="journeyDetails.stops.length > 0"
        :data="journeyDetails.stops"
        narrowed
        striped
        hoverable
        class="box"
      >
        <b-table-column v-slot="props" field="type" :label="$t('stop_header')">
          <span
            :class="{ bold: isCurrentStation(props.row) }"
            v-text="props.row.name"
          ></span>
        </b-table-column>
        <b-table-column v-slot="props" field="type" :label="$t('arrival_time')">
          <journey-time :time="props.row.arrival"></journey-time>
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="type"
          :label="$t('departure_time')"
        >
          <journey-time :time="props.row.departure"></journey-time>
        </b-table-column>
      </b-table>
      <p v-else class="box bold" v-text="$t('no_details')"></p>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Departure, Journey, JourneyStop, StopLocation } from '~/types'
import JourneyTime from '~/components/JourneyTime.vue'

@Component({
  components: {
    JourneyTime,
  },
})
export default class JourneyDetail extends Vue {
  @Prop() readonly journey!: Departure
  @Prop() readonly station!: StopLocation
  journeyDetails: Journey | null = null
  loading = true

  isCurrentStation(stop: JourneyStop): boolean {
    return (
      this.station &&
      this.station.coordinate.toString() === stop.coordinate.toString()
    )
  }

  loadJourney() {
    this.$rejseplanApi
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

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
</style>
