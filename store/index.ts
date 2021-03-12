import { Store } from 'vuex'
import { getModule } from 'nuxt-property-decorator'
import Favorites from '~/store/Favorites'

export function getFavoritesStore(store: Store<any>): Favorites {
  return getModule(Favorites, store)
}
