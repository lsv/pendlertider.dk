import { Component } from 'nuxt-property-decorator'
import BoardMixin from '~/components/BoardMixin.vue'

// @ts-ignore
@Component
export default class DepartureBoard extends BoardMixin {
  apiRoute: string = 'departureBoard'
  isDeparture: boolean = true
}
