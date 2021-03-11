import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { StopLocation } from "~/types";

@Module({
  name: 'Favorites',
  stateFactory: true,
  namespaced: true,
})
export default class Favorites extends VuexModule {
  favorites: StopLocation[] = []

  @Mutation
  addFavorite(favorite: StopLocation) {
    this.favorites.push(favorite)
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  @Mutation
  removeFavorite(favorite: StopLocation) {
    this.favorites = this.favorites.filter((elm) => {
      return elm.id !== favorite.id
    })
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  @Mutation
  setFavorites(favorites: StopLocation[]) {
    this.favorites = favorites
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  get isFavorite(): Function {
    const favs = this.favorites
    return function (station: StopLocation): boolean {
      return favs.filter((fav) => {
        return station.id === fav.id
      }).length > 0
    }
  }

  @Action // @ts-ignore
  init(): Promise {
    let favs = []
    let storage = localStorage.getItem('favorites')
    if (storage) {
      favs = JSON.parse(storage)
    }

    this.context.commit('setFavorites', favs);
  }

}
