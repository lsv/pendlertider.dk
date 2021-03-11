<template>
  <b-navbar class="container" type="is-light">
    <template #brand>
      <b-navbar-item tag="nuxt-link" :to="{ path: '/' }">
        <img src="~/assets/logo.svg" alt="Pendlertider.dk" />
      </b-navbar-item>
      <b-navbar-item tag="div">
        <h1 class="subtitle">Pendlertider.dk</h1>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
