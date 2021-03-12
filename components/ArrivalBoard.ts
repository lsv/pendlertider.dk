import { Component } from 'nuxt-property-decorator'
import BoardMixin from '~/components/BoardMixin.vue'

// @ts-ignore
@Component
export default class ArrivalBoard extends BoardMixin {
  apiRoute: string = 'arrivalBoard'
  isDeparture: boolean = false
}
