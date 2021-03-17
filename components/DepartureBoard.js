import { Component } from 'nuxt-property-decorator'
import BoardMixin from '~/components/BoardMixin.vue'

@Component
export default class DepartureBoard extends BoardMixin {
  apiRoute = 'departureBoard'
  isDeparture = true
}
