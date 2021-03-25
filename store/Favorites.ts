import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { StopLocation } from '~/types'
import FavoriteApi from '~/plugins/FavoriteApi'

@Module({
  name: 'Favorites',
  stateFactory: true,
  namespaced: true,
})
export default class Favorites extends VuexModule {
  favorites: StopLocation[] = []
  private initialized: boolean = false

  @Mutation
  async addFavorite(favorite: StopLocation) {
    await FavoriteApi.addFavorite(favorite).then(() => {
      this.favorites.push(favorite)
    })
  }

  @Mutation
  async removeFavorite(favorite: StopLocation) {
    await FavoriteApi.removeFavorite(favorite).then(() => {
      this.favorites = this.favorites.filter((elm) => {
        return elm.id !== favorite.id
      })
    })
  }

  @Mutation
  async setFavorites(favorites: StopLocation[]) {
    await FavoriteApi.setFavorites(favorites).then(() => {
      this.favorites = favorites
    })
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
    const oldfavs = this.favorites
    const favs = FavoriteApi.getFavorites()

    this.context.commit('setFavorites', oldfavs.concat(favs))
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

    const favs = FavoriteApi.getFavorites()
    this.context.commit('setFavorites', favs)
    this.context.commit('setInitialized', true)
  }
}
