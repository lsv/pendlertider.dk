<template>
  <figure class="image" :class="imageSize">
    <img :src="icon" :alt="imageType" />
  </figure>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class TrainIcon extends Vue {
  @Prop() readonly type: string
  @Prop() readonly size: string

  get imageType(): string {
    return this.type
  }

  get imageSize(): string {
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

  get icon(): string {
    return `/icons/${this.type}.svg`
  }
}
</script>
