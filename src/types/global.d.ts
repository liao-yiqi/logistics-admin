export interface UserInfo {
  id?: string
  createUser?: string | null
  updateUser?: string | null
  superior?: string
  account: string
  name: string
  orgId?: string
  orgName?: string | null
  stationId?: string
  stationName?: string | null
  email: string | null
  mobile: string | null
  sex: Sex
  status?: boolean
  acatar: string | null
  lastLoginTime?: string | null
  roles?: string[] | null
  roleNames?: string | null
}

export interface Sex {
  desc: string
  code: string
}
