<template>
  <figure class="image" :class="getSize()">
    <img :src="icon()" :alt="type" />
  </figure>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class TrainIcon extends Vue {
  @Prop(String) readonly type!: ''
  @Prop(String) readonly size = ''

  getSize(): string {
    // @ts-ignore
    if (this.size === 'small') {
      return 'is-24x24'
    }

    // @ts-ignore
    if (this.size === 'medium') {
      return 'is-48x48'
    }

    // @ts-ignore
    if (this.size === 'large') {
      return 'is-64x64'
    }

    return 'is-24x24'
  }

  icon(): string {
    return `/icons/${this.type}.svg`
  }
}
</script>
