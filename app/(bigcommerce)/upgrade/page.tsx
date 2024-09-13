'use client'
// import { basePath } from '@/next.config'
import { Tabs, Tab, Row, Col, Nav, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'
import { Api } from '@/app/_api/apiCall'
import Content from './_components/content'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useTranslations } from '@/translator'



export default function Home() {
  const search = useSearchParams()

  const productArray = [1000, 5000, 10000, 25000, 50000, 100000, 500000, 1000000, 2000000]
  const [product, setProduct] = useState<any>(1000)
  const [keyword, setKeyword] = useState<any>(100)
  const [planProduct, setPlanProduct] = useState<any>(0)
  const [planKeyword, setPlanKeyword] = useState<any>(0)
  const [appPrice, setAppPrice] = useState(0)
  const [seoPrice, setSeoPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [planId, setPlanId] = useState(1)
  const [paypalPlanId, setPaypalPlanId] = useState<any>('')
  const [paymentStatus, setPaymentStatus] = useState('cancelled')
  const [currentPlanName, setCurrentPlanName] = useState('pro')
  const [liveProduct, setLiveProduct] = useState(0)
  const [planName, setPlanName] = useState('')

  const [showInnerPage, setShowInnerPage] = useState(false)

  
  const [activeTab,setActiveTab] = useState('app')


  const [aopo, setAopo] = useState<any>('100')
  const [daLink, setDaLink] = useState<any>('5')
  const [blogPost, setBlogPost] = useState<any>('2')

  const translate = useTranslations('common');
  const translate1 = useTranslations('pricingFeature');


  const calculateEnterprisePrice = useMemo(() => {
    let price = 299 + ((aopo / 50) * 200) + (daLink * 100) + (blogPost * 100)
    return price
  }, [aopo, daLink, blogPost])


  const getCurrentPlan = () => {
    Api('payment/getCurrentPlan').then(({ data }) => {
      setPaymentStatus(data.payment_status)
      setCurrentPlanName(data.plan_name)
      setLiveProduct(data.total_live_product)
      if (data.proPlanData.plan_id) {
        setPlanId(data.proPlanData?.plan_id)
        setProduct(data.proPlanData?.plan_product)
        setKeyword(data.proPlanData?.plan_keyword)
        setPlanProduct(data.proPlanData?.plan_product)
        setPlanKeyword(data.proPlanData?.plan_keyword)
      }
      setProduct(productArray.find((item: any) => item > data.total_live_product))

    })
  }

  const getPlanPrice = () => {
    setLoading(true)
    Api('payment/getPlanPrice', { product: product, keyword: keyword }).then(({ data }) => {
      setLoading(false)
      setPlanId(data.id)
      setAppPrice(data.price)
    })
  }

  const cancelPaidPlan = () => {
    Api('payment/cancelPaidPlan').then((data) => {
      window.location.reload()
    })
  }

  useEffect(() => {
    getPlanPrice()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, keyword])

  useEffect(() => {
    getCurrentPlan()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(()=>{
    setActiveTab(search.get('tab')?? 'app')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search.get('tab')])


  return (<>
    <div className="content-frame-main">
      {showInnerPage ?
        <>
          <Content
            setShowInnerPage={() => setShowInnerPage(false)}
            planName={planName}
            price={planName == 'pro' ? appPrice : seoPrice}
            paypalPlanId={paypalPlanId}
            planId={planId}
          />
        </> :
        <>
          <div className="content-frame-head flex justify-content-between align-item-center mobile-flex">
            <div className="content-frameHead-left">
              <h1 className="Text--headingLg flex align-item-center gap-2">
                {translate('upgrade')}
              </h1>
            </div>

            <div className="content-frameHead-right">
              <Link href='/invoices'>
                <button type="button" className="btn-primary white-iconBtn d-flex align-item-center gap-1">{translate('invoices')}</button>
              </Link>

            </div>
          </div>
        

          <div className="pricing-main">
            <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={(e:any)=>{setActiveTab(e); console.log(e)}}>
              <div className='card'>
                <Nav variant="tabs" className="d-grid grid-column-2" >
                  <Nav.Item>
                    <Nav.Link eventKey="app" className='text-center' style={{ "textDecoration": "none" }}>{translate('app')}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="seoServices" className='text-center' style={{ "textDecoration": "none" }}> {translate('seoServices')}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>

              <Tab.Content>
                <Tab.Pane eventKey="app">
                  <div className="pricing-area">
                    <div className="app-pricingBox">
                    <Swiper
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      slidesPerView={1}
                      spaceBetween={24}
                      navigation
                      pagination={{
                        clickable: true,
                      }}
                      breakpoints={{
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 24,
                        },
                      }}
                      onSwiper={(swiper) => {}}
                      onSlideChange={() => {}}                     
                    >
                      <SwiperSlide className='pricingFeature-mobileHide'>
                        <div className="card">
                          <div className="PricingArea">
                            <div className="PricingHead-Area">
                              <h5 className="Text--headingLg">{translate('coreFeatures')}</h5>
                              <ul>
                                <li>{translate1('coreFeaturesListItem1')}</li>
                                <li>{translate1('coreFeaturesListItem2')}</li>
                                <li>{translate1('coreFeaturesListItem3')}</li>
                                <li>{translate1('coreFeaturesListItem4')}</li>
                              </ul>
                            </div>

                            <div className="PricingFeatureArea">
                              <ul>
                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('products')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph1')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('keywordsRankTracking')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph2')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('advancedSEOAudit')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph3')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('rankTrackingFrequency')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph4')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('imageOptimizer')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph5')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('bulkOptimizer')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph6')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('seoRichSnippets')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph7')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate1('coreFeaturesListItem2')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph8')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('analytics')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph9')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('urlEditor')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph10')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('subUsersAccess')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph11')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="card">
                          <div className="PricingArea">
                            <div className="PricingHead-Area">
                              <h5 className="Text--headingLg">{translate('freePlan')}</h5>
                              <h5 className="Text--headingLg">US$ 0</h5>
                              <p className="text-subbed">{translate('perMonth')}</p>
                              <div className="full-btn">
                                {paymentStatus == 'completed' ?
                                  <button type="button" className="custom-btn" onClick={cancelPaidPlan}>{translate1('chooseThisPlan')}</button> :
                                  <button type="button" className="custom-btn btn-disable">{translate1('currentPlan')}</button>
                                }
                              </div>
                            </div>

                            <div className="PricingFeatureArea bold-text">
                              <ul>
                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('products')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph1')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>

                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>----</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('keywordsRankTracking')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph2')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>25</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('advancedSEOAudit')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph3')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>100 {translate('pages')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('rankTrackingFrequency')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph4')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>{translate('monthly')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('imageOptimizer')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph5')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>200 {translate('images')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('bulkOptimizer')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph6')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>100 {translate('pages')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('seoRichSnippets')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph7')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>{translate('limitedAccess')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate1('coreFeaturesListItem2')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph8')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/close-red-icon.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('analytics')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph9')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('urlEditor')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph10')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('subUsersAccess')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph11')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>                              

                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      
                      <SwiperSlide>
                        <div className="card">
                          <div className="PricingArea">
                            <div className="PricingHead-Area">
                              <h5 className="Text--headingLg">{translate('proPlan')}</h5>
                              <h5 className="Text--headingLg">US$ <span>{loading ? <Spinner size='sm' /> : appPrice}</span></h5>
                              <p className="text-subbed">{translate('perMonth')}</p>
                              <div className="full-btn">
                                {(paymentStatus == 'completed') && (currentPlanName == 'pro') && (product == planProduct) && (keyword == planKeyword)
                                  ?
                                  <button type="button" className="custom-btn btn-disable">{translate1('currentPlan')}</button>
                                  :
                                  <button type="button" className="custom-btn" onClick={() => {
                                    setShowInnerPage(true)
                                    setPlanName('pro')
                                    setPaypalPlanId(process.env.NEXT_PUBLIC_PLANID1)
                                  }}>{translate1('chooseThisPlan')}</button>
                                }

                              </div>
                            </div>

                            <div className="PricingFeatureArea bold-text">
                              <ul>
                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('products')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph1')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="custom-dropi without-labelDropi">
                                    <select className="form-select" aria-label="Default select example" value={product} onChange={(e) => setProduct(e.target.value)}>
                                      <option value="1000" disabled={liveProduct > 1000}>1000 {planProduct == 1000 ? translate1('currentplan') : ''}</option>
                                      <option value="5000" disabled={liveProduct > 5000}>5000 {planProduct == 5000 ? translate1('currentplan') : ''}</option>
                                      <option value="10000" disabled={liveProduct > 10000}>10000 {planProduct == 10000 ? translate1('currentplan') : ''}</option>
                                      <option value="25000" disabled={liveProduct > 25000}>25000 {planProduct == 25000 ? translate1('currentplan') : ''}</option>
                                      <option value="50000" disabled={liveProduct > 50000}>50000 {planProduct == 50000 ? translate1('currentplan') : ''}</option>
                                      <option value="100000" disabled={liveProduct > 100000}>100000 {planProduct == 100000 ? translate1('currentplan') : ''}</option>
                                      <option value="500000" disabled={liveProduct > 500000}>500000 {planProduct == 500000 ? translate1('currentplan') : ''}</option>
                                      <option value="1000000" disabled={liveProduct > 1000000}>1000000 {planProduct == 1000000 ? translate1('currentplan') : ''}</option>
                                      <option value="2000000" disabled={liveProduct > 2000000}>2000000 {planProduct == 2000000 ? translate1('currentplan') : ''}</option>
                                    </select>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('keywordsRankTracking')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph2')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="custom-dropi without-labelDropi">
                                    <select className="form-select" aria-label="Default select example" value={keyword} onChange={(e) => setKeyword(e.target.value)}>
                                      <option value="100">100 {planKeyword == 100 ? translate1('currentplan') : ''}</option>
                                      <option value="200">200 {planKeyword == 200 ? translate1('currentplan') : ''}</option>
                                      <option value="300">300 {planKeyword == 300 ? translate1('currentplan') : ''}</option>
                                      <option value="400">400 {planKeyword == 400 ? translate1('currentplan') : ''}</option>
                                      <option value="500">500 {planKeyword == 500 ? translate1('currentplan') : ''}</option>
                                    </select>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('advancedSEOAudit')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph3')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>{translate('unlimited')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('rankTrackingFrequency')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph4')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>{translate('weekly')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('imageOptimizer')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph5')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>{translate('unlimited')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('bulkOptimizer')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph6')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>{translate('unlimited')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('seoRichSnippets')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph7')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>{translate('fullAccess')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate1('coreFeaturesListItem2')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph8')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('analytics')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph9')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('urlEditor')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph10')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('subUsersAccess')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph11')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                    </div>
                  </div>
                </Tab.Pane>

                
                <Tab.Pane eventKey="seoServices">
                  <div className="pricing-area seoServicesTab">
                      <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={1}
                        spaceBetween={24}
                        navigation
                        pagination={{
                          clickable: true,
                        }}
                        breakpoints={{
                          1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                          },
                        }}
                        onSwiper={(swiper) => {}}
                        onSlideChange={() => {}}                        
                      >

                      <SwiperSlide className='pricingFeature-mobileHide'>
                        <div className="card">
                          <div className="PricingArea">
                            <div className="PricingHead-Area">
                              <h5 className="Text--headingLg">{translate('coreFeatures')}</h5>
                              <ul>
                                <li>{translate1('coreFeaturesListItem5')}</li>
                                <li>{translate1('coreFeaturesListItem6')}</li>
                                <li>{translate1('coreFeaturesListItem7')}</li>
                                <li>{translate1('coreFeaturesListItem8')}</li>
                              </ul>
                            </div>

                            <div className="PricingFeatureArea">
                              <ul>
                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('keywordsResearch')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph12')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('technicalAudit')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph13')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('advancedOnPageOptimization')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph14')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('highDALinks')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph15')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('blogPosts')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph16')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('onePointContact')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph17')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>

                                <li>
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center">
                                    <p>{translate('monthlyReporting')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph18')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="card">
                          <div className="PricingArea">
                            <div className="PricingHead-Area">
                              <h5 className="Text--headingLg">{translate('startup')}</h5>
                              <h5 className="Text--headingLg">US$ 799</h5>
                              <p className="text-subbed">{translate('perMonth')}</p>
                              <div className="full-btn">
                                {(paymentStatus == 'completed') && (currentPlanName == 'startup') ?
                                  <button type="button" className="custom-btn btn-disable">{translate1('currentPlan')}</button> :
                                  <button type="button" className="custom-btn" onClick={() => {
                                    setShowInnerPage(true)
                                    setSeoPrice(799)
                                    setPlanName('startup')
                                    setPaypalPlanId(process.env.NEXT_PUBLIC_PLANID2)
                                  }}>{translate1('chooseThisPlan')}</button>}
                              </div>
                            </div>

                            <div className="PricingFeatureArea bold-text">
                              <ul>
                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('keywordsResearch')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph12')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('technicalAudit')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph13')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('advancedOnPageOptimization')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph14')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>50 {translate('pagesOrMonth')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('highDALinks')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph15')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>3 {translate('linksOrMonth')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('blogPosts')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph16')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/close-red-icon.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('onePointContact')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph17')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('monthlyReporting')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph18')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="card">
                          <div className="PricingArea">
                            <div className="PricingHead-Area">
                              <h5 className="Text--headingLg">{translate('professional')}</h5>
                              <h5 className="Text--headingLg">US$ 999</h5>
                              <p className="text-subbed">{translate('perMonth')}</p>
                              <div className="full-btn">
                                {(paymentStatus == 'completed') && (currentPlanName == 'professional') ?
                                  <button type="button" className="custom-btn btn-disable">{translate1('currentPlan')}</button> :
                                  <button type="button" className="custom-btn" onClick={() => {
                                    setShowInnerPage(true)
                                    setSeoPrice(999)
                                    setPlanName('professional')
                                    setPaypalPlanId(process.env.NEXT_PUBLIC_PLANID3)
                                  }}>{translate1('chooseThisPlan')}</button>}
                              </div>
                            </div>

                            <div className="PricingFeatureArea bold-text">
                              <ul>
                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('keywordsResearch')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph12')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('technicalAudit')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph13')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('advancedOnPageOptimization')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph14')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>50 {translate('pagesOrMonth')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('highDALinks')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph15')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>4 {translate('linksOrMonth')}</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('blogPosts')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph16')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p>1</p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('onePointContact')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph17')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('monthlyReporting')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph18')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="card">
                          <div className="PricingArea">
                            <div className="PricingHead-Area">
                              <h5 className="Text--headingLg">{translate('enterprise')}</h5>
                              <h5 className="Text--headingLg">US$ {calculateEnterprisePrice}</h5>
                              <p className="text-subbed">{translate('perMonth')}</p>
                              <div className="full-btn">
                                {(paymentStatus == 'completed') && (currentPlanName == 'enterprise') ?
                                  <button type="button" className="custom-btn btn-disable">{translate1('currentPlan')}</button> :
                                  <button type="button" className="custom-btn" onClick={() => {
                                    setShowInnerPage(true)
                                    setSeoPrice(calculateEnterprisePrice)
                                    setPlanName('enterprise')
                                    setPaypalPlanId(process.env.NEXT_PUBLIC_PLANID4)
                                  }}>{translate1('chooseThisPlan')}</button>}
                              </div>
                            </div>

                            <div className="PricingFeatureArea bold-text">
                              <ul>
                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('keywordsResearch')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph12')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('technicalAudit')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph13')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('advancedOnPageOptimization')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph14')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="custom-dropi without-labelDropi">
                                    <select className="form-select" aria-label="Default select example" value={aopo} onChange={(e) => setAopo(e.target.value)}>
                                      <option value="100">100 {translate('pagesOrMonth')}</option>
                                      <option value="200">200 {translate('pagesOrMonth')}</option>
                                      <option value="300">300 {translate('pagesOrMonth')}</option>
                                      <option value="400">400 {translate('pagesOrMonth')}</option>
                                      <option value="500">500 {translate('pagesOrMonth')}</option>
                                    </select>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('highDALinks')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph15')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="custom-dropi without-labelDropi">
                                    <select className="form-select" aria-label="Default select example" value={daLink} onChange={(e) => setDaLink(e.target.value)}>
                                      <option value="5">5 {translate('linksOrMonth')}</option>
                                      <option value="10">10 {translate('linksOrMonth')}</option>
                                    </select>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('blogPosts')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph16')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="custom-dropi without-labelDropi">
                                    <select className="form-select" aria-label="Default select example" value={blogPost} onChange={(e) => setBlogPost(e.target.value)}>
                                      <option value="2">2</option>
                                      <option value="4">4</option>
                                      <option value="6">6</option>
                                    </select>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('onePointContact')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph17')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>

                                <li className="priceBox-listInner">
                                  <div className="PricingFeature-Box d-flex gap-3 align-item-center pricing-headMobile">
                                    <p>{translate('monthlyReporting')}</p>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip>{translate1('overlayTriggerPragraph18')}</Tooltip>}>
                                      <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
                                    </OverlayTrigger>
                                  </div>
                                  <div className="PricingFeature-Box d-flex gap-3">
                                    <p><Image src={`${basePath}/images/check-green.svg`} alt='' width={20} height={20} /></p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>                      
                      </Swiper>
                  </div>
                </Tab.Pane>
              </Tab.Content>

            </Tab.Container>

          </div>
        </>}
    </div>

  </>)
}