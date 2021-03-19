import Vue from "vue";
import Axios from 'axios'
import {
  DeleteFavoriteForm,
  FavoriteForm,
  LoginForm,
  PendlertiderApi,
  RefreshForm,
  SignupForm, UserEditEmailForm, UserEditNewsletter
} from "~/types/Pendlertider";

const BASEURL = 'https://api.pendlertider.dk/api'
Axios.defaults.baseURL = BASEURL
Axios.defaults.headers.common['X-Content-Lang'] = 'da'

const Api = new (class implements PendlertiderApi {
  FavoritesAdd(form: FavoriteForm): Promise<any> {
    return Axios.post('/favorite', form)
  }

  FavoritesDelete(form: DeleteFavoriteForm): Promise<any> {
    return Axios.delete(`/favorite/${form.id}`)
  }

  FavoritesList(): Promise<any> {
    return Axios.get('/favorite')
  }

  UserDelete(): Promise<any> {
    return Axios.delete('/user')
  }

  UserEditEmail(form: UserEditEmailForm): Promise<any> {
    return Axios.patch('/user/edit/email', form)
  }

  UserEditNewsletter(form: UserEditNewsletter): Promise<any> {
    return Axios.patch('/user/edit/newsletter', form)
  }

  UserMe(): Promise<any> {
    return Axios.get('/user')
  }

  UserSignup(form: SignupForm): Promise<any> {
    return Axios.post('/user', form)
  }

  securityLogin(form: LoginForm): Promise<any> {
    return Axios.post('/security/login', form)
  }

  securityRefresh(form: RefreshForm): Promise<any> {
    return Axios.post('/security/refresh', form)
  }
})

// noinspection JSUnusedGlobalSymbols
Vue.prototype.$pendlertiderApi = Api
