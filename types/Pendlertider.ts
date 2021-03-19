export interface LoginForm {
  username: string
  password: string
}

export interface SignupForm {
  username: string
  password: string
  email: string | null
  newsletter: boolean | null
}

export interface RefreshForm {
  refresh_token: string
}

export interface UserEditEmailForm {
  email: string | null
}

export  interface UserEditNewsletter {
  newsletter: boolean
}

export interface FavoriteForm {
  name: string
  x_longitude: number
  y_latitude: number
}

export interface DeleteFavoriteForm {
  id: string
}

interface Security {
  securityLogin(form: LoginForm): Promise<any>
  securityRefresh(form: RefreshForm): Promise<any>
}

interface User {
  UserMe(): Promise<any>
  UserSignup(form: SignupForm): Promise<any>
  UserDelete(): Promise<any>
}

interface UserEdit {
  UserEditEmail(form: UserEditEmailForm): Promise<any>
  UserEditNewsletter(form: UserEditNewsletter): Promise<any>
}

interface Favorites {
  FavoritesList(): Promise<any>
  FavoritesAdd(form: FavoriteForm): Promise<any>
  FavoritesDelete(form: DeleteFavoriteForm): Promise<any>
}

export interface PendlertiderApi extends Security, User, UserEdit, Favorites {
}
