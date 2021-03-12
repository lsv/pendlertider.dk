import { Api } from '~/types'

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api
  }
}
