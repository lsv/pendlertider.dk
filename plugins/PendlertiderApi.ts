import { Plugin } from '@nuxt/types'
import {
  DeleteFavoriteForm,
  FavoriteForm,
  PendlertiderApi,
  SignupForm, UserEditEmailForm, UserEditNewsletter
} from "~/types/Pendlertider";
import {NuxtAxiosInstance} from "@nuxtjs/axios";

const Api = class implements PendlertiderApi {
  axios: NuxtAxiosInstance;
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
  interface Context {
    $pendlertiderApi: PendlertiderApi
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $pendlertiderApi: PendlertiderApi
  }
}

const PendlertiderApi: Plugin = (context, inject) => {
  inject('pendlertiderApi', new Api(context.$axios))
}

export default PendlertiderApi
