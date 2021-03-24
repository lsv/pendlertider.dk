import { PendlertiderApi } from '~/types/Pendlertider'

// eslint-disable-next-line import/no-mutable-exports
let $api: PendlertiderApi

export function initialize(api: PendlertiderApi) {
  $api = api
}

export { $api }
