'use client'
import ChannelList from '@/app/_components/channelList'
import UpgradeButton from "@/app/_components/upgradeButton"
import { Tabs, Tab, Spinner } from 'react-bootstrap'
import Parenttabcontent from './_components/parentTabContent'
import { Api } from '@/app/_api/apiCall'
import { useEffect, useState } from 'react'
import Childtabcontent from './_components/childTabContent'
import Chart from './_components/chart'
import Link from 'next/link'
import Hamburger from '../../_components/hamburger'
import { useTranslations } from 'next-intl'

export default function Home() {
  const [homeUrl, setHomeUrl] = useState()
  const [productUrl, setProductUrl] = useState()
  const [categoryUrl, setCategoryUrl] = useState()
  const [loading, setLoading] = useState(true)

  const [desktopData, setDesktopData] = useState<any>({})
  const [mobileData, setMobileData] = useState<any>({})
  const [desktopDataLoading, setDesktopDataLoading] = useState(true)
  const [mobileDataLoading, setMobileDataLoading] = useState(true)

  const [parentTab, setParentTab] = useState('home')
  const [childTab, setChildTab] = useState<string>('desktop')

  const [chartData, setChartData] = useState({ data: [], loading: true })

  const translate = useTranslations('common');
  const translate1 = useTranslations('pageSpeed');

  const getPageSpeedUrl = () => {
    Api('pageSpeed/getPageSpeedUrl').then(({ data }) => {
      setLoading(false)
      setHomeUrl(data.homUrl)
      setProductUrl(data.productUrl)
      setCategoryUrl(data.categoryUrl)

      getPageSpeedData('desktop', 0, data.homUrl, 'home')
      getPageSpeedData('mobile', 0, data.homUrl, 'home')

      getPageSpeedHistory(data.homUrl)
    })
  }

  const getPageSpeedData = (strategy: any, analyze: any, url: any, type: any) => {
    strategy = (strategy == '') ? childTab : strategy
    if (strategy == 'desktop') {
      setDesktopDataLoading(true)
    } else {
      setMobileDataLoading(true)
    }

    return Api('pageSpeed/getPageSpeedData', {
      strategy: strategy,
      analyze: analyze,
      url: url,
      is_custom_url: type == 'custom' ? 1 : 0,
      type: type
    }).then(({ data }) => {
      if (strategy == 'desktop') {
        setDesktopDataLoading(false)
        setDesktopData(data)
      } else {
        setMobileDataLoading(false)
        setMobileData(data)
      }
      getPageSpeedHistory(url)

    })
  }


  const getPageSpeedHistory = (url: any) => {
    Api('pageSpeed/getPageSpeedHistory', { url: url }).then(({ data }) => {
      setChartData({ data: data, loading: false })
    })
  }

  useEffect(() => {
    getPageSpeedUrl()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
    <div className="content-frame-main">
      <div className="content-frame-head flex justify-content-between align-item-center">
        <div className="content-frameHead-left flex align-item-center gap-2">
          <h1 className="Text--headingLg flex align-item-center gap-2 mb-0">
            {translate('pageSpeed')}           
          </h1>
          <ChannelList />
        </div>

        <div className="content-frameHead-right">
          <UpgradeButton />
          <Hamburger />
        </div>
      </div>
      <div className="page-speedMain">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="card">
              <Tabs
                defaultActiveKey="home"
                onSelect={(key: any) => {
                  setParentTab(key)
                  if (key != 'custom') {
                    const url = (key == 'home' ? homeUrl : (key == 'product') ? productUrl : categoryUrl)
                    getPageSpeedData('desktop', 0, url, key)
                    getPageSpeedData('mobile', 0, url, key)
                    getPageSpeedHistory(url)
                  } else {
                    setDesktopData({})
                    setMobileData({})
                  }

                }}
              >
                <Tab eventKey="home" title={translate('home')}>
                  {loading ? <Spinner /> :
                    <Parenttabcontent childTab={childTab} type='home' url={homeUrl} getPageSpeedData={(strategy: any, analyze: any, url: any, type: any) => getPageSpeedData(strategy, analyze, url, type)} />}
                </Tab>
                <Tab eventKey="product" title={translate('product')}>
                  {loading ? <Spinner /> :
                    <Parenttabcontent childTab={childTab} type='product' url={productUrl} getPageSpeedData={(strategy: any, analyze: any, url: any, type: any) => getPageSpeedData(strategy, analyze, url, type)} />}
                </Tab>
                <Tab eventKey="category" title={translate('category')}>
                  {loading ? <Spinner /> :
                    <Parenttabcontent childTab={childTab} type='category' url={categoryUrl} getPageSpeedData={(strategy: any, analyze: any, url: any, type: any) => getPageSpeedData(strategy, analyze, url, type)} />}
                </Tab>
                <Tab eventKey="custom" title={translate('custom')}>
                  <Parenttabcontent childTab={childTab} type='custom' url='' getPageSpeedData={(strategy: any, analyze: any, url: any, type: any) => getPageSpeedData(strategy, analyze, url, type)} />
                </Tab>
              </Tabs>
            </div>

            <div className="card">
              <Tabs
                defaultActiveKey="desktop"
                className="mb-3"
                onSelect={(key: any) => {
                  setChildTab(key)
                }}
              >
                <Tab eventKey="desktop" title="Desktop">
                  {desktopDataLoading ? <Spinner /> : (desktopData?.score > 0) ? <Childtabcontent data={desktopData} /> : translate('noDataFound')}
                </Tab>
                <Tab eventKey="mobile" title="Mobile">
                  {mobileDataLoading ? <Spinner /> : (mobileData?.score > 0) ? <Childtabcontent data={mobileData} /> : translate('noDataFound')}
                </Tab>
                {(parentTab != 'custom') &&
                  <Tab eventKey="history" title="History">
                    {chartData.loading ? <Spinner /> :
                      <Chart chartData={chartData.data} />}
                  </Tab>}
              </Tabs>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="card">
              <h2 className="Text--headingXl">{translate('pageSpeedOptimization')}</h2>

              <p>{translate1('pageSpeedOptimizationPragraph1')}</p>

              <p>{translate1('pageSpeedOptimizationPragraph2')}</p>

              <div className="PageSpeed-Price">
                <span>$ 149</span> $ 0
              </div>
              <p>{translate1('forLimitedTime')}</p>
              <div className="full-btn">
                <Link href='help'>
                  <button type="button" className="custom-btn whitespace-nowrap">{translate('requestPageSpeedOptimization')}</button>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}