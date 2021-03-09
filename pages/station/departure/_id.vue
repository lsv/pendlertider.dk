<template>
  <div class="container">
    <departure-board :station="id"></departure-board>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import DepartureBoard from '~/components/DepartureBoard.vue'

@Component({
  components: {
    DepartureBoard,
  },
  asyncData({ params }) {
    const id = params.id
    return { id }
  },
})
export default class StationId extends Vue {
  id: string | null = null
}
</script>
