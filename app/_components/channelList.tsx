import { Form } from 'react-bootstrap'
import { Api } from '@/app/_api/apiCall'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { memo } from 'react'
import { useTranslations } from '@/translator'

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

function Home() {
  const translate = useTranslations('common');

  const [list, setList] = useState<any>([{ 'domain': 'Loading...', 'channel_id': '1' }])
  const [channelId, setChannelId] = useState<any>(1)

  const getChannelList = () => {
    Api('getChannelList',{store_id:localStorage.getItem('user_id')}).then(({ data }: any) => {
      setList(data)
      if(!localStorage.getItem('channel')){
        localStorage.setItem('channel', JSON.stringify(data[0]))
      }
      
    })
  }

  const handleChangeChannel = (event: any) => {
    setChannelId(event.target.value)
    localStorage.setItem('channel', JSON.stringify(list.find((item: any) => item.channel_id == event.target.value)))
    const currentURL = window.location.href
    if (currentURL.indexOf('/install') > 0 || currentURL.indexOf('/load') > 0) {
      window.location.replace(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)
    } else {
      window.location.reload()
    }
  }

  useEffect(() => {
    setChannelId(localStorage.getItem('channel') && JSON.parse(localStorage.getItem('channel') ?? '').channel_id || 1)
    getChannelList()
  }, [])
  return (
    <>
      <div className="headChannel-dropi custom-dropi link-iconDropi">
        <span>
          {translate('channel')}
          <a href={list.find((item: any) => item.channel_id == channelId)?.domain} target="_blank">
            <Image src={`${basePath}/images/link-icon.svg`} alt='' width={20} height={20} />
          </a>
        </span>
        <select className="form-select" aria-label="Default select example" onChange={handleChangeChannel} value={channelId}>
          {list.map((item: any, key: any) => (
            <option key={key} value={item.channel_id}>{item.domain.replace('https://', '')}</option>
          ))}
        </select>
      </div>
    </>)
}

export default memo(Home)