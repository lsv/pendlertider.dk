<i18n>
{
  "en": {
    "username": "Username",
    "password": "Password",
    "login": "Log in",
    "error": "Username or password is incorrect",
    "logged_in": "You have been logged in"
  },
  "da": {
    "username": "Brugernavn",
    "password": "Kodeord",
    "login": "Log ind",
    "error": "Brugernavn eller kodeord er forkert",
    "logged_in": "Du er nu blevet logget ind"
  }
}
</i18n>

<template>
  <form @submit.prevent="submit">
    <form-errors v-if="error" :form-errors="{ f: [$t('error')] }"></form-errors>

    <b-field :label="$t('username')">
      <b-input v-model="form.username" required></b-input>
    </b-field>

    <b-field :label="$t('password')">
      <b-input v-model="form.password" type="password" required></b-input>
    </b-field>

    <b-button
      :loading="isSubmitting"
      native-type="submit"
      type="is-primary"
      v-text="$t('login')"
    ></b-button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { LoginForm } from '~/types/Pendlertider'
import { getFavoritesStore } from '~/store'

@Component
export default class Signup extends Vue {
  error = false
  isSubmitting = false
  form: LoginForm = {
    username: '',
    password: '',
  }

  async submit() {
    this.isSubmitting = true
    await this.$auth
      .loginWith('local', { data: this.form })
      .then(() => {
        return getFavoritesStore(this.$store).userLogin()
      })
      .then(() => {
        this.$buefy.toast.open({
          type: 'is-success',
          message: this.$tc('logged_in'),
        })
      })
      .catch(() => {
        this.error = true
      })
      .finally(() => {
        this.isSubmitting = false
      })
  }
}
</script>
