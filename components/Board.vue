<!--suppress JSUnresolvedVariable -->
<i18n>
{
  "en": {
    "depart": "Depart",
    "arrive": "Arrive",
    "track": "Track",
    "name": "Name",
    "destination": "Destination",
    "via": "Via",
    "origin": "Origin"
  },
  "da": {
    "depart": "Afgang",
    "arrive": "Ankomst",
    "track": "Spor",
    "name": "Navn",
    "destination": "Destination",
    "via": "Via",
    "origin": "Fra"
  }
}
</i18n>

<template>
  <div>
    <b-table
      :data="boardRows"
      narrowed
      striped
      hoverable
      show-detail-icon
      detailed
      detail-key="id"
      @details-open="viewDetails()"
      @details-close="hideDetails()"
    >
      <b-table-column v-slot="props" field="id" label="Id" :visible="false">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column v-slot="props" field="type" label="">
        <train-icon :type="iconType(props)"></train-icon>
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="date"
        :label="isDeparture ? $t('depart') : $t('arrive')"
      >
        <template v-if="props.row.time.changed">
          <span class="realtime">
            {{ props.row.time.rtDatetime.toFormat('HH:mm') }}
          </span>
          <span class="changed">
            {{ props.row.time.datetime.toFormat('HH:mm') }}
          </span>
        </template>
        <template v-else>
          <span class="normal">
            {{ props.row.time.datetime.toFormat('HH:mm') }}
          </span>
        </template>
      </b-table-column>

      <b-table-column v-slot="props" field="track" :label="$t('track')">
        <template v-if="props.row.track">
          <template v-if="props.row.track.changed">
            <span class="realtime">
              {{ props.row.track.rtTrack }}
            </span>
            <span class="changed">
              {{ props.row.track.track }}
            </span>
          </template>
          <template v-else>
            <span class="normal">
              {{ props.row.track.track }}
            </span>
          </template>
        </template>
      </b-table-column>

      <b-table-column v-slot="props" field="name" :label="$t('name')">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        :visible="isDeparture"
        field="finalStop"
        :label="$t('destination')"
      >
        {{ props.row.finalStop }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        :visible="isDeparture"
        field="direction"
        :label="$t('via')"
      >
        {{ props.row.direction }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        :visible="!isDeparture"
        field="origin"
        :label="$t('origin')"
      >
        {{ props.row.origin }}
      </b-table-column>

      <template #detail="props">
        <article class="media">
          <figure class="media-left">
            <train-icon :type="iconType(props)" size="large"></train-icon>
          </figure>
          <div class="media-content">
            <journey-detail
              :journey="props.row"
              :station="station"
            ></journey-detail>
          </div>
        </article>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import TrainIcon from '~/components/TrainIcon.vue'
import JourneyDetail from '~/components/JourneyDetail.vue'
import { Arrival, Departure, StopLocation } from '~/types'

@Component({
  components: {
    TrainIcon,
    JourneyDetail,
  },
})
export default class Board extends Vue {
  @Prop() readonly rows!: Array<Arrival | Departure>
  @Prop(Boolean) readonly departure: boolean = true
  @Prop() station!: StopLocation
  showdetails: boolean = false

  iconType(props: any) {
    return props.row.type
  }

  get isDeparture(): boolean {
    return this.departure
  }

  get boardRows(): Array<Arrival | Departure> {
    return this.rows
  }

  @Emit()
  viewDetails(): void {
    this.showdetails = true
  }

  @Emit()
  hideDetails(): void {
    this.showdetails = false
  }
}
</script>

<style scoped lang="scss">
.realtime {
  color: red;
}

.changed {
  text-decoration: line-through;
}
</style>
