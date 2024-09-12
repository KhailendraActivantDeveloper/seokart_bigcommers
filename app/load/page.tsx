'use client'


import Dashboard from '../[locale]/(bigcommerce)/dashboard/page'
import Loading from '../[locale]/_components/loading'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Api } from '@/app/_api/apiCall'
import Error from '@/app/[locale]/error'

import Layout from '../[locale]/(bigcommerce)/layout'


export default function Home() {
  const searchParams = useSearchParams()
  const signedPayload = searchParams.get('signed_payload')
  const signedPayloadJwt = searchParams.get('signed_payload_jwt')

  const [loading, setLoading] = useState(true)
  const [validUser, setValidUser] = useState(true)

  console.log("signedPayload>>>>>>>>>>", signedPayload);
  console.log("signedPayloadJwt>>>>>>>>>>", signedPayloadJwt);
  useEffect(() => {
    localStorage.clear();
    Api('appLoad', { signedPayload, signedPayloadJwt }).then((data: any) => {
      (data.status_code == 200) ? setValidUser(true) : setValidUser(false)
      const result = data.data
      
      localStorage.setItem('api-token', result.api_token)
      localStorage.setItem('shop', result.shop)
      localStorage.setItem('manage_service', result.manage_services)
      localStorage.setItem('user_id', result.user_id)
      localStorage.setItem('signedPayload',signedPayload ?? '')
      localStorage.setItem('channel',JSON.stringify(result.channel_list[0]))
      setLoading(false)
      
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (<>
    {loading ? <Loading /> : validUser ? <Layout><Dashboard /></Layout> : <Error />}
  </>)
}