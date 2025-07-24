export interface LoginResult {
  user: UserInfo
  token: Token
}

export interface Token {
  token: string
  expire?: number
}

export interface LoginForm {
  account: string
  password: string
  code: string
  tenant: string
  key: string
}
