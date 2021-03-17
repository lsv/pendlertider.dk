import { Component } from 'nuxt-property-decorator'
import BoardMixin from '~/components/BoardMixin.vue'

@Component
export default class ArrivalBoard extends BoardMixin {
  apiRoute = 'arrivalBoard'
  isDeparture = false
}
