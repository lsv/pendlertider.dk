let $auth

export function initialize(auth) {
  console.log('u', auth)
  $auth = auth
}

export { $auth }
