import { useEffect, useState } from "react"

import {Link} from "@/navigation"
import { Spinner } from "react-bootstrap"

export default function Home(Props: any) {
  const [homeUrl,setHomeUrl] = useState<any>('')
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const channel:any = localStorage.getItem('channel')
    setHomeUrl(JSON.parse(channel).domain)
  },[])
  return (<>
    <tr>
      <td className="tableHeading-name"><div className="flex align-item-center gap-2 "><p className="mb-0 table-mainHeading">{Props.item.item_name}</p> <a href={`${homeUrl}${Props.item.item_type!='home' ? Props.item.item_url : ''}`} target="_blank"><img src="images/link-icon.svg" alt="" /></a></div></td>
      <td>{Props.item.item_type.toString().charAt(0).toUpperCase() + Props.item.item_type.toString().slice(1)}</td>
      <td><span className={`badge badge-${Props.item.meta_tag_issue > 1 ? 'danger' : Props.item.meta_tag_issue == 1 ? 'warning' : 'success'}`}>{Props.item.meta_tag_issue}</span></td>
      <td><span className={`badge badge-${Props.item.content_issue > 1 ? 'danger' : Props.item.content_issue == 1 ? 'warning' : 'success'}`}>{Props.item.content_issue}</span></td>
      <td><span className={`badge badge-${Props.item.image_issue > 1 ? 'danger' : Props.item.image_issue == 1 ? 'warning' : 'success'}`}>{Props.item.image_issue}</span></td>
      <td><span className={`badge badge-${Props.item.broken_link_issue > 1 ? 'danger' : Props.item.broken_link_issue == 1 ? 'warning' : 'success'}`}>{Props.item.broken_link_issue}</span></td>
      <td><span className={`badge badge-${Props.item.url_issue > 1 ? 'danger' : Props.item.url_issue == 1 ? 'warning' : 'success'}`}>{Props.item.url_issue}</span></td>
      <td className="text-align-right"><h2 className={`Text--headingLg mb-0 ${Props.item.seo_score < 80 ? 'red-text' : Props.item.seo_score > 79 && Props.item.seo_score < 90 ? 'yellow-text' : 'green-text'}`}>{Props.item.seo_score}%</h2></td>
      <td onClick={()=>setLoading(true)}><Link href={`/seo-audit/${Props.item.id}`}><button type="button" className="custom-btn">{loading ? <Spinner size="sm"/> : 'Optimize'}</button></Link></td>
    </tr>
  </>)
}