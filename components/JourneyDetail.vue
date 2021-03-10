<template>
  <section>
    <b-loading v-model="loading" :full-size="false"></b-loading>
    <div v-if="journeyDetails">
      <b-table :data="journeyDetails.stops" narrowed striped hoverable>
        <b-table-column v-slot="props" field="type" label="Stop">
          <span
            :class="{ bold: isCurrentStation(props.row) }"
            v-text="props.row.name"
          ></span>
        </b-table-column>
        <b-table-column v-slot="props" field="type" label="Arrival time">
          <template v-if="props.row.departure">
            <template v-if="props.row.departure.changed">
              <span
                class="realtime"
                v-text="props.row.departure.rtDatetime.toFormat('HH:mm')"
              ></span>
              <span
                class="delay"
                v-text="props.row.departure.datetime.toFormat('HH:mm')"
              ></span>
            </template>
            <template v-else>
              <span
                class="time"
                v-text="props.row.departure.datetime.toFormat('HH:mm')"
              ></span>
            </template>
          </template>
        </b-table-column>
        <b-table-column v-slot="props" field="type" label="Departure time">
          <template v-if="props.row.arrival">
            <template v-if="props.row.arrival.changed">
              <span
                class="realtime"
                v-text="props.row.arrival.rtDatetime.toFormat('HH:mm')"
              ></span>
              <span
                class="delay"
                v-text="props.row.arrival.datetime.toFormat('HH:mm')"
              ></span>
            </template>
            <template v-else>
              <span
                class="time"
                v-text="props.row.arrival.datetime.toFormat('HH:mm')"
              ></span>
            </template>
          </template>
        </b-table-column>
      </b-table>
      <!--      <ul>-->
      <!--        <li v-for="stop in journeyDetails.stops" :key="stop.routeIdx">-->
      <!--          <div>-->
      <!--            <div v-text="stop.name" :class="{ bold: isCurrentStation(stop) }"></div>-->
      <!--            <template v-if="stop.departure">-->
      <!--              <template v-if="stop.departure.changed">-->
      <!--                <div v-text="stop.departure.rtDatetime.toFormat('HH:mm')" class="realtime"></div>-->
      <!--                <div v-text="stop.departure.datetime.toFormat('HH:mm')" class="delay"></div>-->
      <!--              </template>-->
      <!--              <template v-else>-->
      <!--                <div v-text="stop.departure.datetime.toFormat('HH:mm')" class="time"></div>-->
      <!--              </template>-->
      <!--            </template>-->
      <!--            <template v-if="stop.arrival">-->
      <!--              <div v-text="stop.arrival.time"></div>-->
      <!--            </template>-->
      <!--          </div>-->
      <!--        </li>-->
      <!--      </ul>-->
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Departure, Journey, JourneyStop, StopLocation } from '~/types'

@Component
export default class JourneyDetail extends Vue {
  @Prop() readonly journey: Departure
  @Prop() readonly station: StopLocation
  journeyDetails: Journey | null = null
  loading = true

  isCurrentStation(stop: JourneyStop): boolean {
    return (
      this.station &&
      this.station.coordinate.toString() === stop.coordinate.toString()
    )
  }

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

<style lang="scss" scoped>
.realtime {
  color: red;
}
.delay {
  text-decoration: line-through;
}
.bold {
  font-weight: bold;
}
</style>
