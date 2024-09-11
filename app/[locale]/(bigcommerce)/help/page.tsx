'use client'

import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Tabs, Tab, Nav } from 'react-bootstrap'
const Faqs = dynamic(()=>import('./_components/faqs'), { ssr: false })
const Askanexpert = dynamic(() => import('./_components/askanexpert'), { loading: () => (<>loading...</>), ssr: false })
const Reportrestore = dynamic(()=>import('./_components/report-restore'), { ssr: false })
const Channel = dynamic(() => import('@/app/_components/channelList'), { ssr: false })
const Upgrade = dynamic(() => import('@/app/_components/upgradeButton'), { ssr: false })


export default function Home() {
  const parameter = useSearchParams()
  const tab = parameter.get('tab') ?? 'ask-an-expert'
  
  const translate = useTranslations('common');

  return (<>
    <div className="content-frame-main">
      <div className="content-frame-head flex justify-content-between align-item-center">
        <div className="content-frameHead-left flex align-item-center gap-2">
          <h1 className="Text--headingLg flex align-item-center gap-2">
            {translate('help')}            
          </h1>
          <Channel />
        </div>
        <div className="content-frameHead-right">
          <Upgrade />
        </div>
      </div>
      <div className="pricing-main help-mainBox">
        <Tab.Container defaultActiveKey={tab}>
          <div className="card">
            <Nav variant="tabs" className="d-grid grid-column-3 helpTab-box" >
              <Nav.Item>
                <Nav.Link eventKey="faqs" className='text-center' style={{"textDecoration":"none"}}>{translate('faqs')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ask-an-expert" className='text-center' style={{"textDecoration":"none"}}>{translate('askAnExpert')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="report-restore" className='text-center' style={{"textDecoration":"none"}}>{translate('reportRestore')}</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="faqs"><Faqs /></Tab.Pane>
            <Tab.Pane eventKey="ask-an-expert"><Askanexpert /></Tab.Pane>
            <Tab.Pane eventKey="report-restore"><Reportrestore /></Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  </>)
}