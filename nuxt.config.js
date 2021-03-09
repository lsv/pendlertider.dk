export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pendlertider.dk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Find tider på dit stoppested',
      },
      { name: 'msapplication-TileColor', content: '#2b5797' },
      {
        name: 'msapplication-config',
        content: '/favicons/browserconfig.xml?v=A05q6e9xN5',
      },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png?v=A05q6e9xN5',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png?v=A05q6e9xN5',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png?v=A05q6e9xN5',
      },
      { rel: 'manifest', href: '/favicons/site.webmanifest?v=A05q6e9xN5' },
      {
        rel: 'mask-icon',
        href: '/favicons/safari-pinned-tab.svg?v=A05q6e9xN5',
        color: '#000000',
      },
      { rel: 'shortcut icon', href: '/favicons/favicon.ico?v=A05q6e9xN5' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/Api.ts',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/buefy/nuxt-buefy
    'nuxt-buefy',
    'vue-geolocation-api/nuxt',
  ],

  geolocation: {
    watch: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'http://xmlopen.rejseplanen.dk/bin/rest.exe',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: false,
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
