<i18n>
{
  "en": {
    "signup": "Sign up"
  },
  "da": {
    "signup": "Tilmeld"
  }
}
</i18n>

<template>
  <div class="container">
    <section class="content section">
      <h2 v-text="$t('signup')"></h2>
      <signup-component></signup-component>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SignupComponent from '~/components/Security/Signup.vue'

@Component({
  components: {
    SignupComponent,
  },
})
export default class Signup extends Vue {}
</script>
