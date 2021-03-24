// eslint-disable-next-line import/no-mutable-exports
let $auth

export function initialize(auth) {
  // eslint-disable-next-line no-console
  console.log('u', auth)
  $auth = auth
}

export { $auth }
