import { useTranslations } from "next-intl";
import {Link} from "@/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const translate = useTranslations('common');

  const [paid,setPaid] = useState(1)
  useEffect(()=>{
    (localStorage.getItem('manage_service')=='1') ? setPaid(1) : setPaid(0)
  },[])
  return (
    <>
      {paid == 0 ?
        <Link href={'/upgrade'} className="headBtn-link"><button type="button" className="custom-btn">{translate("upgrade")}</button></Link>
        : ''}
    </>)
}