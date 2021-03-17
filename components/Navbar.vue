<i18n>
{
  "en": {
    "subtitle": "- Find times on a stop"
  },
  "da": {
    "subtitle": "- Find tider på et stoppested"
  }
}
</i18n>

<template>
  <b-navbar class="container">
    <template #brand>
      <b-navbar-item tag="nuxt-link" :to="localePath({ name: 'index' })">
        <img src="~/assets/logo.svg" alt="Pendlertider.dk" />
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" :to="localePath({ name: 'index' })">
        <h1 class="subtitle">Pendlertider.dk</h1>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <p class="is-italic is-small" v-text="$t('subtitle')"></p>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <b-navbar-dropdown :label="$i18n.locale">
          <b-navbar-item
            v-for="locale in locales()"
            :key="locale.code"
            tag="nuxt-link"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.name }}
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <p class="is-small is-italic">Coming soon --></p>
      </b-navbar-item>
      <login></login>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Login from '~/components/Login.vue'

@Component({
  components: {
    Login,
  },
})
export default class Navbar extends Vue {
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
