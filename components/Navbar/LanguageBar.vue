<template>
  <b-navbar-item tag="div">
    <b-navbar-dropdown :label="currentLocale()">
      <b-navbar-item
        v-for="locale in locales()"
        :key="locale.code"
        tag="nuxt-link"
        :to="switchLocalePath(locale.code)"
      >
        <span v-text="locale.name"></span>
      </b-navbar-item>
    </b-navbar-dropdown>
  </b-navbar-item>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LanguageBar extends Vue {
  currentLocale(): string {
    if (!this.$i18n.locale) {
      this.$i18n.locale = 'da'
    }

    // @ts-ignore
    const currentLocale = this.$i18n.locales.filter((locale) => {
      // @ts-ignore
      return locale.code === this.$i18n.locale
    })[0]

    // @ts-ignore
    return currentLocale.name
  }

  locales() {
    if (!this.$i18n.locale) {
      this.$i18n.locale = 'da'
    }

    // @ts-ignore
    return this.$i18n.locales.filter((locale) => {
      // @ts-ignore
      return locale.code !== this.$i18n.locale
    })
  }
}
</script>
