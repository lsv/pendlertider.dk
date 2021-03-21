export default function({ $auth, app }) {
  $auth.onRedirect((to, from) => {
    if (to === '/') {
      return app.localePath({ name: 'index' })
    }

    if (to === '/login') {
      return app.localePath({ name: 'security/login'})
    }
  })
}
