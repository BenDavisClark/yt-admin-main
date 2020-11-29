import '@/utils/amiya-init'
import { useState } from 'react'

// src/app.ts
export function useQiankunStateForSlave() {
  const [token, setToken] = useState<string>(localStorage.getItem('TOKEN') || '')
  const [profile, setProfile] = useState<AnyKeyProps>({})

  return {
    token,
    profile,
    setProfile,
    setToken
  }
}
