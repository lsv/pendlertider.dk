// eslint-disable-next-line import/no-mutable-exports
let $auth: any

export function initialize(auth: any) {
  $auth = auth
}

export { $auth }
