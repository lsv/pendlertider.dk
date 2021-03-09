<template>
  <div>
  <b-table :data="departures" narrowed striped hoverable>
    <b-table-column field="type" label="Type" v-slot="props">
      {{ props.row.type }}
    </b-table-column>
    <b-table-column field="date" label="Date" v-slot="props">
      {{ props.row.datetime.toFormat('HH:mm') }}
    </b-table-column>
    <b-table-column field="name" label="Name" v-slot="props">
      {{ props.row.name }}
    </b-table-column>
    <b-table-column field="destination" label="Destination" v-slot="props">
      {{ props.row.finalStop }}
    </b-table-column>
    <b-table-column field="direction" label="Via" v-slot="props">
      {{ props.row.direction }}
    </b-table-column>
  </b-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Board extends Vue {
  @Prop(Array) readonly departures!: []
}
</script>
