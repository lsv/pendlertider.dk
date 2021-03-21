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
      <language-bar></language-bar>
      <login-bar v-if="!$auth.user"></login-bar>
      <user-bar v-else></user-bar>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginBar from '~/components/Navbar/LoginBar.vue'
import UserBar from "~/components/Navbar/UserBar.vue";
import LanguageBar from "~/components/Navbar/LanguageBar.vue";

@Component({
  components: {
    LoginBar,
    UserBar,
    LanguageBar,
  },
})
export default class Navbar extends Vue {}
</script>
