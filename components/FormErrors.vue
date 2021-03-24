<template>
  <b-message v-if="formErrors" type="is-danger" has-icon>
    <div v-for="(messages, key) in formErrors" :key="key" class="content">
      <ul>
        <li v-for="message in messages" :key="message">
          <span v-text="message"></span>
        </li>
      </ul>
    </div>
  </b-message>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class FormErrors extends Vue {
  @Prop() readonly formErrors!: Array<string>
}
</script>
