import { RejseplanApi } from '~/types'
import { PendlertiderApi } from '~/types/Pendlertider'

declare module 'vue/types/vue' {
  interface Vue {
    $rejseplanApi: RejseplanApi
    $pendlertiderApi: PendlertiderApi
  }
}
