const STATIC_BASE = ''

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: `${STATIC_BASE}/`,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pendlertider.dk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Find tider på for stoppested',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Find tider på for stoppested',
      },
      { name: 'msapplication-TileColor', content: '#2b5797' },
      {
        name: 'msapplication-config',
        content: `${STATIC_BASE}/favicons/browserconfig.xml?v=A05q6e9xN5`,
      },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${STATIC_BASE}/favicons/apple-touch-icon.png?v=A05q6e9xN5`,
      },
      {
        rel: 'icon',
        sizes: '32x32',
        href: `${STATIC_BASE}favicons/favicon-32x32.png?v=A05q6e9xN5`,
      },
      {
        rel: 'icon',
        sizes: '16x16',
        href: `${STATIC_BASE}favicons/favicon-16x16.png?v=A05q6e9xN5`,
      },
      {
        rel: 'manifest',
        href: `${STATIC_BASE}/favicons/site.webmanifest?v=A05q6e9xN5`,
      },
      {
        rel: 'mask-icon',
        href: `${STATIC_BASE}/favicons/safari-pinned-tab.svg?v=A05q6e9xN5`,
        color: '#000000',
      },
      {
        rel: 'shortcut icon',
        href: `${STATIC_BASE}/favicons/favicon.ico?v=A05q6e9xN5`,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/RejseplanApi.ts',
      mode: 'client',
    },
    {
      src: '~/plugins/PendlertiderApi.ts',
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
    '@nuxtjs/color-mode',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/buefy/nuxt-buefy
    ['nuxt-buefy', { css: false }],
    'vue-geolocation-api/nuxt',
    'nuxt-i18n',
  ],

  i18n: {
    vueI18nLoader: true,
    locales: [
      {
        code: 'da',
        name: 'Dansk',
      },
      {
        code: 'en',
        name: 'English',
      },
    ],
    defaultLocale: 'da',
    vueI18n: {
      fallbackLocale: 'da',
    },
  },

  geolocation: {
    watch: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'https://xmlopen.rejseplanen.dk/bin/rest.exe',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: false,
    manifest: {
      lang: 'en',
    },
  },

  buefy: {
    defaultIconPack: 'mdi',
    materialDesignIconsHRef:
      'https://cdn.jsdelivr.net/npm/@mdi/font@5/css/materialdesignicons.min.css',
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
