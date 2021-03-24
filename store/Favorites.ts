import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { StopLocation } from '~/types'
import { $api } from '~/utils/pendlertider'
import { $auth } from '~/utils/auth.js'

@Module({
  name: 'Favorites',
  stateFactory: true,
  namespaced: true,
})
export default class Favorites extends VuexModule {
  favorites: StopLocation[] = []
  private initialized: boolean = false

  @Mutation
  addFavorite(favorite: StopLocation) {
    this.favorites.push(favorite)

    async function userApi() {
      await $api.FavoritesAdd({
        stationId: favorite.id,
        xLongitude: parseFloat(favorite.x),
        yLatitude: parseFloat(favorite.y),
        name: favorite.name,
      })
    }

    if ($auth.user) {
      userApi().then()
    } else {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  }

  @Mutation
  removeFavorite(favorite: StopLocation) {
    async function userApi() {
      await $api.FavoritesDelete({
        uid: favorite.id,
      })
    }

    if ($auth.user) {
      userApi().then()
    } else {
      this.favorites = this.favorites.filter((elm) => {
        return elm.id !== favorite.id
      })
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  }

  @Mutation
  setFavorites(favorites: StopLocation[]) {
    function userApi() {
      favorites.forEach((favorite) => {
        $api
          .FavoritesAdd({
            stationId: favorite.id,
            xLongitude: parseFloat(favorite.x),
            yLatitude: parseFloat(favorite.y),
            name: favorite.name,
          })
          .then()
      })
    }

    if ($auth.user) {
      userApi()
    } else {
      this.favorites = favorites
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  }

  @Mutation
  setInitialized(initialized: boolean) {
    this.initialized = initialized
  }

  get isFavorite(): Function {
    const favs = this.favorites
    return function (station: StopLocation): boolean {
      return (
        favs.filter((fav) => {
          return station.id === fav.id
        }).length > 0
      )
    }
  }

  @Action
  userLogin(): void {
    const favs = this.favorites
    this.notInitialized()
    this.init().then()
    this.context.commit('setFavorites', favs)
  }

  @Action
  notInitialized(): void {
    this.context.commit('setInitialized', false)
  }

  @Action // @ts-ignore
  init(): Promise {
    if (this.initialized) {
      return Promise
    }

    let favs = []

    async function userApi() {
      await $api.FavoritesList()
    }

    if ($auth.user) {
      userApi()
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log('api favs', response)
          return response
        })
        .then((response) => {
          this.context.commit('setFavorites', response)
        })
        .then(() => {
          this.context.commit('setInitialized', true)
        })
    } else {
      const storage = localStorage.getItem('favorites')
      if (storage) {
        favs = JSON.parse(storage)
      }

      this.context.commit('setFavorites', favs)
      this.context.commit('setInitialized', true)
    }
  }
}
