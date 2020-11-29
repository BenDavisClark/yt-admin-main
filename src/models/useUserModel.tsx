import { useState, useCallback } from 'react'
import { login } from '@/api/user'
import { useModel } from 'umi'

export default function useUserModel() {
  const qiankun = useModel('@@qiankunStateForSlave')
  const [token, setToken] = useState<string>(localStorage.getItem('TOKEN') || '')
  const [loading, setLoading] = useState<boolean>(false)
  const [profile, setProfile] = useState<AnyKeyProps>({})

  const handleLogin = (params: AnyKeyProps) => {
    setLoading(true)
    return login(params)
      .then((data: any) => {
        const token: string = data as any
        // @ts-ignore
        window.token = token
        localStorage.setItem('TOKEN', token)
        setToken(token)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleLogout = useCallback(() => {
    setToken('')
    // @ts-ignore
    window.token = ''
    localStorage.removeItem('TOKEN')
  }, [])

  const setUserProfile = (params: AnyKeyProps) => {
    setProfile(params)
    qiankun.setProfile(params)
  }

  const setUserToken = (token: string) => {
    setToken(token)
    qiankun.setToken(token)
  }

  return {
    login: handleLogin,
    logout: handleLogout,
    setToken: setUserToken,
    token,
    loading,
    profile,
    setProfile: setUserProfile
  }
}
