'use client'

import { useEffect, useState } from 'react'
import Dashboard from '../[locale]/(bigcommerce)/dashboard/page'
import { useSearchParams } from 'next/navigation'
import Loading from '../[locale]/_components/loading'

import { InstallApi } from '@/app/_api/apiCall'
import Error from '@/app/[locale]/error'

import Layout from '../[locale]/(bigcommerce)/layout'

export default function Home() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const context = searchParams.get('context')
  const scope = searchParams.get('scope')

  const [loading, setLoading] = useState(true)
  const [validUser, setValidUser] = useState(false)

  useEffect(() => {
    InstallApi('appInstall', { code, context, scope }).then((data: any) => {
      (data.status_code == 200) ? setValidUser(true) : setValidUser(false)
      const result = data.data
      localStorage.setItem('api-token', result.api_token)
      localStorage.setItem('shop', result.shop)
      localStorage.setItem('manage_service', result.manage_services)
      localStorage.setItem('user_id', result.user_id)
      localStorage.setItem('channel',JSON.stringify(result.channel_list[0]))
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (<>
    {loading ? <Loading /> : validUser ? <Layout><Dashboard /></Layout> : <Error />}
  </>)
}