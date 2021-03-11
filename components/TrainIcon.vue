<template>
  <figure class="image" :class="imageSize">
    <img v-if="type === 'BUS'" src="~/assets/icons/BUS.svg" :alt="imageType" />
    <img v-if="type === 'EXB'" src="~/assets/icons/EXB.svg" :alt="imageType" />
    <img v-if="type === 'F'" src="~/assets/icons/F.svg" :alt="imageType" />
    <img v-if="type === 'IC'" src="~/assets/icons/IC.svg" :alt="imageType" />
    <img v-if="type === 'LYN'" src="~/assets/icons/LYN.svg" :alt="imageType" />
    <img v-if="type === 'M'" src="~/assets/icons/M.svg" :alt="imageType" />
    <img v-if="type === 'NB'" src="~/assets/icons/NB.svg" :alt="imageType" />
    <img v-if="type === 'REG'" src="~/assets/icons/REG.svg" :alt="imageType" />
    <img v-if="type === 'S'" src="~/assets/icons/S.svg" :alt="imageType" />
    <img v-if="type === 'TB'" src="~/assets/icons/TB.svg" :alt="imageType" />
    <img v-if="type === 'TOG'" src="~/assets/icons/TOG.svg" :alt="imageType" />
  </figure>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class TrainIcon extends Vue {
  @Prop() readonly type!: string
  @Prop() readonly size!: string

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
    return `~/assets/icons/${this.type}.svg`
  }
}
</script>
