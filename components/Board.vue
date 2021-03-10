<template>
  <div>
    <b-table
      :data="rows"
      narrowed
      striped
      hoverable
      show-detail-icon
      detailed
      detail-key="id"
      details-open="showdetails = true"
      details-close="showdetails = false"
    >
      <b-table-column v-slot="props" field="id" label="Id" :visible="false">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column v-slot="props" field="type" label="Type">
        <train-icon :type="props.row.type"></train-icon>
      </b-table-column>
      <b-table-column v-slot="props" field="date" label="Date">
        <span v-if="props.row.trainDate.datetimeChanged" class="rtDate">
          {{ props.row.trainDate.rtDatetime.toFormat('HH:mm') }}
        </span>
        <span v-if="props.row.trainDate.datetimeChanged" class="olddate">
          {{ props.row.trainDate.datetime.toFormat('HH:mm') }}
        </span>
        <span v-if="!props.row.trainDate.datetimeChanged" class="date">
          {{ props.row.trainDate.datetime.toFormat('HH:mm') }}
        </span>
      </b-table-column>
      <b-table-column v-slot="props" field="track" label="Track">
        <span v-if="props.row.trainDate.trackChanged" class="rtDate">
          {{ props.row.trainDate.rtTrack }}
        </span>
        <span v-if="props.row.trainDate.trackChanged" class="olddate">
          {{ props.row.trainDate.track }}
        </span>
        <span v-if="!props.row.trainDate.trackChanged" class="date">
          {{ props.row.trainDate.track }}
        </span>
      </b-table-column>
      <b-table-column v-slot="props" field="name" label="Name">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column v-slot="props" field="destination" label="Destination">
        {{ props.row.finalStop }}
      </b-table-column>
      <b-table-column v-slot="props" field="direction" label="Via">
        {{ props.row.direction }}
      </b-table-column>

      <template #detail="props">
        <article class="media">
          <figure class="media-left">
            <train-icon :type="props.row.type" size="large"></train-icon>
          </figure>
          <div class="media-content">
            <journey-detail :departure="props.row"></journey-detail>
          </div>
        </article>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import TrainIcon from '~/components/TrainIcon.vue'
import JourneyDetail from '~/components/JourneyDetail.vue'

@Component({
  components: {
    TrainIcon,
    JourneyDetail,
  },
})
export default class Board extends Vue {
  @Prop(Array) readonly rows = []
  @Prop(Boolean) readonly departure = true
  showdetails: boolean = false
}
</script>

<style scoped lang="scss">
.rtDate {
  color: red;
}
.olddate {
  text-decoration: line-through;
}
</style>
