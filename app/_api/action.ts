'use server'
import { cookies } from 'next/headers'

export const updateLanguage = async (language:any) => {
  const lang = cookies().get('language')?.value??"en"   
  language? cookies().set('language', language, { secure: true, sameSite: 'none' }) : cookies().set('language', lang, { secure: true, sameSite: 'none' })
  return 'success'
}