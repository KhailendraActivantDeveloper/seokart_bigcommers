export async function Api(url: any, body: any = {}) {
  const channelId = localStorage.getItem('channel') && JSON.parse(localStorage.getItem('channel') ?? '').channel_id || 1

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'api-token': localStorage.getItem('api-token') ?? '',
      'app-key': `${process.env.NEXT_PUBLIC_API_KEY}`
    },
    method: 'POST',
    body: JSON.stringify({ ...body, shop: localStorage.getItem('shop'), channel_id: channelId })
  })
  const result = await response.json()
  return result
}


export async function InstallApi(url: any, body: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
  const result = await response.json()
  return result
}