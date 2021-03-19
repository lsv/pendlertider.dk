import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'

@Module({
  name: 'User',
  stateFactory: true,
  namespaced: true,
})
export default class User extends VuexModule {
  data: null | User = null
  token: null | string = null
  refresh: null | string = null

  @Mutation
  setToken(token: string) {
    this.token = token
  }

  @Mutation
  setRefresh(refresh: string) {
    this.refresh = refresh
  }

  @Action
  login(token: string, refresh: string) {
    this.setToken(token)
    this.setRefresh(refresh)
  }
}
