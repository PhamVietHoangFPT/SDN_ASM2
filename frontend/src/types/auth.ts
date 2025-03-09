export interface UserToken {
  token: string
}

export interface UserData {
  email: string
  id: string
  isAdmin: boolean
  name: string
  exp: number
  yob: number
  gender: boolean
}

export interface AuthState {
  userData: UserData | null
  userToken: UserToken | null
  isAuthenticated: boolean
  isLoading: boolean
}
