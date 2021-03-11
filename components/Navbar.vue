<template>
  <b-navbar class="container">
    <template #brand>
      <b-navbar-item tag="nuxt-link" :to="{ path: '/' }">
        <img src="~/assets/logo.svg" alt="Pendlertider.dk" />
      </b-navbar-item>
      <b-navbar-item tag="div">
        <h1 class="subtitle">Pendlertider.dk</h1>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <p class="small italic is-italic">- Find tider på for stoppested</p>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
