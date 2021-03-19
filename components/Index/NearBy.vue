<template>
  <div v-if="geoSupport">
    <b-dropdown :scrollable="true" :max-height="280" position="is-bottom-left">
      <template #trigger>
        <b-button label="" icon-left="map-marker" @click.native="closest()" />
      </template>

      <b-dropdown-item
        v-for="(nearby, index) in nearbys"
        :key="index"
        :value="nearby"
        has-link="true"
      >
        <nuxt-link
          :to="
            localePath({
              name: 'station-station-boards',
              params: { station: nearby.id },
            })
          "
          class="element"
        >
          <div class="name" v-text="nearby.name"></div>
          <div class="distance"><span v-text="distance(nearby)"></span> km</div>
        </nuxt-link>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DistanceToCoordinate from '~/converters/DistanceToCoordinate'
import { StopLocation } from '~/types'
import { intsToCoordinate } from '~/helpers'

@Component
export default class NearBy extends Vue {
  nearbys: StopLocation[] = []
  isFetching: boolean = false
  geoSupport = false

  mounted() {
    if (this.$geolocation.checkSupport()) {
      this.geoSupport = true
    }
  }

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

  closest() {
    if (
      this.$geolocation.coords?.longitude &&
      this.$geolocation.coords?.latitude
    ) {
      this.$rejseplanApi
        .closest(
          intsToCoordinate(
            this.$geolocation.coords.longitude,
            this.$geolocation.coords.latitude,
            false
          )
        )
        .then((data: Array<StopLocation>) => {
          this.nearbys = data
        })
        .catch((error: any) => {
          this.nearbys = []
          throw error
        })
    } else {
      this.geoSupport = false
    }
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
