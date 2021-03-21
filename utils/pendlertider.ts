import {PendlertiderApi} from "~/types/Pendlertider";

let $api: PendlertiderApi

export function initialize(api: PendlertiderApi) {
  $api = api
}

export { $api }
