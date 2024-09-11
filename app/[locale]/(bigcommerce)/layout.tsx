'use client'

import Sidebar from '../_components/sidebar'
import { ToastContainer } from "react-toastify"
import 'rsuite/dist/rsuite.min.css'
import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-loading-skeleton/dist/skeleton.css'
import "../global.css";
import { useEffect, useState } from 'react'
import Script from 'next/script'

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeClass,setActiveClass] = useState(true)

  useEffect(()=>{
    setActiveClass(window.screen.availWidth > 720 ? true:false)
  },[])
  return (<>
  <Script src='//in.fw-cdn.com/32039527/1084394.js'></Script>
    <section className={`frame-area ${activeClass ? 'activeNav':''}`}>
      <Sidebar handleOnChange={()=>setActiveClass(!activeClass)}/>
      {children}
      <ToastContainer position="bottom-center" theme="dark" />
    </section>
    <Script src={`${basePath}/js/intercom.js`} />
  </>)
}