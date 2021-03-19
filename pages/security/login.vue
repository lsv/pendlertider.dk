<i18n>
{
  "en": {
    "login": "Log in"
  },
  "da": {
    "login": "Log ind"
  }
}
</i18n>

<template>
  <div class="container">
    <section class="content section">
      <h2 v-text="$t('login')"></h2>
      <login-component></login-component>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginComponent from '~/components/Security/Login.vue'

@Component({
  components: {
    LoginComponent,
  },
})
export default class Signup extends Vue {}
</script>
