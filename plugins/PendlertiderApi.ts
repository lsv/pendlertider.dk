import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  DeleteFavoriteForm,
  FavoriteForm,
  PendlertiderApi,
  SignupForm,
  UserEditEmailForm,
  UserEditNewsletter,
} from '~/types/Pendlertider'

const Api = class implements PendlertiderApi {
  axios: NuxtAxiosInstance
  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  FavoritesAdd(form: FavoriteForm): Promise<any> {
    return this.axios.post('/pendlertider/favorite', form)
  }

  FavoritesDelete(form: DeleteFavoriteForm): Promise<any> {
    return this.axios.delete(`/pendlertider/favorite/${form.uid}`)
  }

  FavoritesList(): Promise<any> {
    return this.axios.get('/pendlertider/favorite')
  }

  UserDelete(): Promise<any> {
    return this.axios.delete('/pendlertider/user')
  }

  UserEditEmail(form: UserEditEmailForm): Promise<any> {
    return this.axios.patch('/pendlertider/user/edit/email', form)
  }

  UserEditNewsletter(form: UserEditNewsletter): Promise<any> {
    return this.axios.patch('/pendlertider/user/edit/newsletter', form)
  }

  UserSignup(form: SignupForm): Promise<any> {
    return this.axios.$post('/pendlertider/user', form)
  }
}

declare module '@nuxt/types' {
  // noinspection JSUnusedGlobalSymbols
  interface Context {
    $pendlertiderApi: PendlertiderApi
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  interface Store<S> {
    $pendlertiderApi: PendlertiderApi
  }
}

const pp: Plugin = (context, inject) => {
  inject('pendlertiderApi', new Api(context.$axios))
}

export default pp
