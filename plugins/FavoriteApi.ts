import { StopLocation } from '~/types'
import $auth from '~/plugins/AuthAccessor.js'

interface FavoriteApi {
  addFavorite(favorite: StopLocation): Promise<any>
  removeFavorite(favorite: StopLocation): Promise<any>
  setFavorites(favorites: StopLocation[]): Promise<any>
  getFavorites(): StopLocation[]
}

const Api = class implements FavoriteApi {
  addFavorite(favorite: StopLocation): Promise<any> {
    console.group('Add favorite')
    console.log('favorite', favorite)
    if ($auth) {
      console.log('auth', $auth)
    } else {
      console.log('auth', 'no auth')
    }
    console.groupEnd()

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('foo')
      }, 300)
    })
  }

  removeFavorite(favorite: StopLocation): Promise<any> {
    console.group('Remove favorite')
    console.log('favorite', favorite)
    if ($auth) {
      console.log('auth', $auth)
    } else {
      console.log('auth', 'no auth')
    }
    console.groupEnd()

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('foo')
      }, 300)
    })
  }

  setFavorites(favorites: StopLocation[]): Promise<any> {
    console.group('set favorites')
    console.log('favorite', favorites)
    if ($auth) {
      console.log('auth', $auth)
    } else {
      console.log('auth', 'no auth')
    }
    console.groupEnd()

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('foo')
      }, 300)
    })
  }

  getFavorites(): StopLocation[] {
    console.group('Get favorites')
    if ($auth) {
      console.log('auth', $auth)
    } else {
      console.log('auth', 'no auth')
    }
    console.groupEnd()
    return []
  }
}

export default new Api()
