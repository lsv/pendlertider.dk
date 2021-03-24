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

export interface UserEditEmailForm {
  email: string | null
}

export interface UserEditNewsletter {
  newsletter: boolean
}

export interface FavoriteForm {
  stationId: string
  name: string
  xLongitude: number
  yLatitude: number
}

export interface DeleteFavoriteForm {
  uid: string
}

interface User {
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

export interface PendlertiderApi extends User, UserEdit, Favorites {}
