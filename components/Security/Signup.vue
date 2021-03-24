<i18n>
{
  "en": {
    "username": "Username",
    "password": "Password",
    "email": "Email",
    "newsletter": "Accept newsletter",
    "signup": "Signup"
  },
  "da": {
    "username": "Brugernavn",
    "password": "Kodeord",
    "email": "Email",
    "newsletter": "Accepter nyhedsbrev",
    "signup": "Tilmeld"
  }
}
</i18n>

<template>
  <form @submit.prevent="submit">
    <form-errors :form-errors="formValidations"></form-errors>

    <b-field
      :label="$t('username')"
      :type="{ 'is-danger': fieldHasError('username') }"
      :message="getFieldErrorMessages('username')"
      required
    >
      <b-input v-model="form.username"></b-input>
    </b-field>

    <b-field
      :label="$t('password')"
      :type="{ 'is-danger': fieldHasError('password') }"
      :message="getFieldErrorMessages('password')"
      required
    >
      <b-input v-model="form.password" type="password"></b-input>
    </b-field>

    <b-field
      :label="$t('email')"
      :type="{ 'is-danger': fieldHasError('email') }"
      :message="getFieldErrorMessages('email')"
    >
      <b-input v-model="form.email" type="email" icon="email"></b-input>
    </b-field>

    <b-field
      v-if="form.email"
      :label="$t('newsletter')"
      :type="{ 'is-danger': fieldHasError('newsletter') }"
      :message="getFieldErrorMessages('newsletter')"
    >
      <b-checkbox v-model="form.newsletter"></b-checkbox>
    </b-field>

    <b-button
      native-type="submit"
      :loading="isSubmitting"
      type="is-primary"
      v-text="$t('signup')"
    ></b-button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FormErrors from '~/components/FormErrors.vue'
import { SignupForm } from '~/types/Pendlertider'
import FormErrorsConverter, {
  FormErrorsInterface,
} from '~/converters/FormErrorsConverter'

@Component({
  components: {
    FormErrors,
  },
})
export default class Signup extends Vue {
  formValidations: FormErrorsInterface | null = null
  signedup = false
  isSubmitting = false

  form: SignupForm = {
    username: '',
    password: '',
    email: null,
    newsletter: null,
  }

  fieldHasError(field: string): boolean {
    if (this.formValidations !== null) {
      return field in this.formValidations
    }

    return false
  }

  getFieldErrorMessages(field: string): string[] | null {
    if (this.fieldHasError(field)) {
      // @ts-ignore - Already checked in hasError
      return this.formValidations[field]
    }

    return null
  }

  async submit() {
    this.isSubmitting = true
    await this.$pendlertiderApi
      .UserSignup(this.form)
      .then(() => {
        this.signedup = true
        // redirect
      })
      .catch((e: any) => {
        if (e.response && e.response.status === 402) {
          this.formValidations = FormErrorsConverter(e.response.data)
          return
        }

        this.formValidations = FormErrorsConverter({
          validations: [
            {
              field: 'e',
              errors: ['Unknown error', e?.response?.status],
            },
          ],
        })
      })
      .finally(() => {
        this.isSubmitting = false
      })
  }
}
</script>
