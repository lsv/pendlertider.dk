<i18n>
{
  "en": {
    "autocomplate_placeholder": "Ex. Østerport"
  },
  "da": {
    "autocomplate_placeholder": "F.eks. Østerport"
  }
}
</i18n>

<template>
  <div class="columns">
    <div class="column">
      <b-field>
        <b-autocomplete
          :data="data"
          :placeholder="$t('autocomplate_placeholder')"
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
                <span v-text="distance(props.option)"></span>
              </div>
            </div>
          </template>
        </b-autocomplete>
      </b-field>
    </div>
    <near-by class="column" style="flex-grow: 0"></near-by>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DistanceToCoordinate from '~/converters/DistanceToCoordinate'
import { StopLocation } from '~/types'
import NearBy from '~/components/Index/NearBy.vue'

@Component({
  components: {
    NearBy,
  },
})
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

    return dist.km.toString() + ' km'
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
    this.$rejseplanApi
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
