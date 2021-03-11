<template>
  <b-field>
    <b-autocomplete
      clear-on-select
      rounded
      :data="data"
      placeholder="F.eks. Østerport"
      field="title"
      :loading="isFetching"
      clearable
      @typing="search"
      @select="redirect"
    >
      <template slot-scope="props">
        <div class="element">
          <div class="name" v-text="props.option.name"></div>
          <div class="distance">
            <span v-text="distance(props.option)"></span> km
          </div>
        </div>
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import DistanceToCoordinate from '~/converters/DistanceToCoordinate'
import { StopLocation } from '~/types'

@Component
export default class SearchBar extends Vue {
  data: Array<StopLocation> = []
  isFetching: boolean = false

  distance(location: StopLocation): string {
    if (this.$geolocation.loading || !this.$geolocation.supported) {
      return ''
    }

    const dist = DistanceToCoordinate(
      location.coordinate,
      this.$geolocation.coords
    )

    if (!dist) {
      return ''
    }

    return dist.km.toString()
  }

  redirect(option: StopLocation) {
    this.$router.push(`station/${option.id}/boards`)
  }

  search(name: string) {
    if (!name.length) {
      this.data = []
      return
    }

    this.isFetching = true
    this.$api
      .search(name)
      .then((data: Array<StopLocation>) => {
        this.data = data
      })
      .catch((error: any) => {
        this.data = []
        throw error
      })
      .finally(() => {
        this.isFetching = false
      })
  }
}
</script>

<style lang="scss" scoped>
.element {
  display: flex;
  .name {
    font-weight: bold;
    flex-grow: 1;
  }
  .distance {
    align-self: flex-end;
    span {
      font-weight: bold;
    }
  }
}
</style>
