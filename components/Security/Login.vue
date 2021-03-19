<i18n>
{
  "en": {
    "username": "Username",
    "password": "Password",
    "login": "Log in",
    "error": "Username or password is incorrect"
  },
  "da": {
    "username": "Brugernavn",
    "password": "Kodeord",
    "login": "Log ind",
    "error": "Brugernavn eller kodeord er forkert"
  }
}
</i18n>

<template>
  <form>
    <form-errors v-if="error" :form-errors="{ f: [$t('error')] }"></form-errors>

    <b-field :label="$t('username')">
      <b-input v-model="form.username" required></b-input>
    </b-field>

    <b-field :label="$t('password')">
      <b-input v-model="form.password" type="password" required></b-input>
    </b-field>

    <b-button type="is-primary" @click="submit" v-text="$t('login')"></b-button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import {LoginForm} from "~/types/Pendlertider";

@Component
export default class Signup extends Vue {
  error = false

  form: LoginForm = {
    username: '',
    password: '',
  }

  submit(): void {
    this.error = true
  }
}
</script>
