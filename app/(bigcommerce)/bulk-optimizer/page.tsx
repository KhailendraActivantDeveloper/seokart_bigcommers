'use client'

import ChannelList from '@/app/_components/channelList'
import UpgradeButton from "@/app/_components/upgradeButton"
import { useEffect, useState } from 'react'
import { Tabs, Tab, Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap'
import Select from "react-select"
import Bulkoptimizerhistory from './_components/bulkOptimizerHistory'
import Cruisecontrolhistory from './_components/cruiseControlHistory'
import { Api } from '@/app/_api/apiCall'
import Howitwork from '@/app/_howitwork/modal'
import Image from 'next/image'
// import { basePath } from '@/next.config'
import Tabcontent from './_components/tabContent'
import Hamburger from '../../_components/hamburger'
import { useTranslations } from 'next-intl'


const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home() {
  const translate = useTranslations('common');

  const [currentTab, setCurrentTab] = useState('titleTag')
  const [selectedItem, setSelectedItem] = useState('product')
  const [bulkHomeData, setBulkHomeData] = useState<any>({ data: {}, loading: true })

  const itemList = [{ label: translate('products'), value: 'product' }, { label: translate('category'), value: 'category' }, { label: translate('brand'), value: 'brand' }]

  const [bulkOptimizerHistory, setBulkOptimizerHistory] = useState(false)


  const getBulkHomePageData = () => {
    setBulkOptimizerHistory(false)
    Api('bulkOptimizer/getBulkHomePageData').then(({ data }) => {
      setBulkHomeData({ data: data, loading: false })
      setBulkOptimizerHistory(true)
    })
  }

  useEffect(() => {
    getBulkHomePageData()
  }, [])

  return (<>
    <div className="content-frame-main">
      <div className="content-frame-head flex justify-content-between align-item-center">
        <div className="content-frameHead-left flex align-item-center gap-2">
          <h1 className="Text--headingLg flex align-item-center gap-2 mb-0">
            {translate('bulkOptimizer')}     
            <Howitwork page='bulkoptimizer' />       
          </h1>          
          <ChannelList />
        </div>

        <div className="content-frameHead-right">
          {bulkHomeData.loading ? <Spinner size='sm' /> :
          <div className="badge badge-success">{translate('quotaUsed')}: {`${bulkHomeData.data.totalUsedBulk}/${bulkHomeData.data.bulkLimitData}`}</div>}
          <UpgradeButton />
          <Hamburger />
        </div>
      </div>
      <div className="bulk-optimizerMain">
        <div className="card">
          <div className="d-flex justify-content-between">
            <div className="bulk-optimizerTab--headLeft ">
            

              <Tabs
                defaultActiveKey="titleTag"
                activeKey={currentTab}
                className="mb-3"
                onSelect={(key: any) => setCurrentTab(key)}
              >
                <Tab eventKey="titleTag" title={translate('titleTag')}>
                  <Tabcontent
                    bulkHomeData={bulkHomeData}
                    currentTab={currentTab}
                    selectedItem={selectedItem}
                    refresh={() => getBulkHomePageData()}
                  />
                </Tab>
                <Tab eventKey="metaDescription" title={translate('metaDescription')}>
                  <Tabcontent
                    bulkHomeData={bulkHomeData}
                    currentTab={currentTab}
                    selectedItem={selectedItem}
                    refresh={() => getBulkHomePageData()}
                  />
                </Tab>
                {selectedItem == 'product' &&
                  <Tab eventKey="altText" title={translate('altText')}>
                    <Tabcontent
                      bulkHomeData={bulkHomeData}
                      currentTab={currentTab}
                      selectedItem={selectedItem}
                      refresh={() => getBulkHomePageData()}
                    />
                  </Tab>}
              </Tabs>
              <div className='bulk-optimizerDropi'>
                <div className="autoSearch-dropi keyword-rankingDropi">
                  <Select
                    value={itemList.find((item) => item.value == selectedItem)}
                    onChange={(selectedValue: any) => {
                      setCurrentTab('titleTag')
                      setSelectedItem(selectedValue.value)
                    }}
                    options={itemList}
                  />
                </div>
              </div>              
            </div>

          </div>



        </div>

        <div className="card">
          {bulkOptimizerHistory &&
            <Bulkoptimizerhistory />}
        </div>

        <div className="card">
          <Cruisecontrolhistory />
        </div>
      </div>
    </div>
  </>)
}