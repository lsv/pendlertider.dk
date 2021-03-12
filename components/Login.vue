<i18n>
{
  "en": {
    "signup": "Sign up",
    "signup_tooltip": "To save favorites across devices, you need to signup",
    "login": "Log in"
  },
  "da": {
    "signup": "Tilmeld",
    "signup_tooltip": "For at gemme favoritter over flere devices, så skal du tilmelde dig",
    "login": "Log ind"
  }
}
</i18n>

<template>
  <b-navbar-item tag="div">
    <div class="buttons">
      <b-tooltip
        :label="$t('signup_tooltip')"
        type="is-light"
        position="is-bottom"
        multilined
      >
        <a class="button is-primary">
          <strong v-text="$t('signup')"></strong>
        </a>
      </b-tooltip>

      <a class="button is-light">
        <span v-text="$t('login')"></span>
      </a>
    </div>
  </b-navbar-item>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Login extends Vue {}
</script>
