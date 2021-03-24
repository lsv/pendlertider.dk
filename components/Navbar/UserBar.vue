<i18n>
{
  "en": {
    "hello": "Hello",
    "edit": "Profile",
    "logout": "Log out",
    "logged_out": "You have been logged out"
  },
  "da": {
    "hello": "Hej",
    "edit": "Profil",
    "logout": "Log ud",
    "logged_out": "Du er nu logget ud"
  }
}
</i18n>

<template>
  <b-navbar-item tag="div">
    <b-dropdown position="is-bottom-left" :close-on-click="false">
      <template #trigger="{ active }">
        <b-button
          :label="$t('hello') + ' ' + $auth.user"
          type="is-primary"
          :icon-right="active ? 'menu-up' : 'menu-down'"
        >
        </b-button>
      </template>
      <b-dropdown-item has-link>
        <nuxt-link :to="localePath({ name: 'index' })">
          <b-icon icon="account-settings"></b-icon>
          <span v-text="$t('edit')"></span>
        </nuxt-link>
      </b-dropdown-item>
      <hr class="dropdown-divider" />
      <b-dropdown-item custom>
        <form @submit.prevent="logout">
          <b-button
            native-type="submit"
            type="is-danger"
            :loading="isLoggingOut"
            expanded
            icon-left="logout"
            :label="$t('logout')"
          >
          </b-button>
        </form>
      </b-dropdown-item>
    </b-dropdown>
  </b-navbar-item>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class UserBar extends Vue {
  isLoggingOut = false
  async logout() {
    await this.$auth.logout().then(() => {
      this.$buefy.toast.open({
        type: 'is-success',
        message: this.$tc('logged_out'),
      })
    })
  }
}
</script>
