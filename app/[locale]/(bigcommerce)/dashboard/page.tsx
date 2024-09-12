"use client"

import { useEffect, useReducer, useRef, useState } from "react"
import { Spinner, Badge } from "react-bootstrap"
import Image from "next/image"

import { Api } from "@/app/_api/apiCall"
import UpgradeButton from "../../_components/upgradeButton"
import ChannelList from "../../_components/channelList"
import BulkOptimizerModal from "./_components/bulkOptimizerModal"
import {Link} from "@/navigation"
import { useSearchParams } from 'next/navigation'
import PaymentModal from '@/app/[locale]/_components/infoModal'
import ConfirmationModal from '@/app/[locale]/_components/confirmation'
import Hamburger from '../../_components/hamburger'
import {useTranslations} from 'next-intl';

import Languagedropdown from '@/app/[locale]/_components/languageDropdown'


export default function Home(Props: any) {
  const basePath = process.env.NEXT_PUBLIC_BASEPATH??''
  const translate  = useTranslations('common');
  const translate1 = useTranslations('dashboard');
  
  const spinner = <Spinner animation="border" size="sm" />
  const [seoScore, setSeoScore] = useState<any>(0)
  const [seoAudit, setSeoAudit] = useState<any>({ crawled: spinner, total: spinner })
  const [errors, setErrors] = useState<any>({ meta: spinner, content: spinner, image: spinner, broken: spinner, url: spinner })
  const [error404, setError404] = useState<any>(spinner)
  const [bulkOptimizer, setBulkOptimizer] = useState<any>({
    titleTag: {
      total: spinner,
      home: 0,
      product: 0,
      category: 0,
      brand: 0,
      page: 0,
      blog: 0,
    },
    metaDescription: {
      total: spinner,
      home: 0,
      product: 0,
      category: 0,
      brand: 0,
      page: 0,
      blog: 0,
    },
    altText: { total: spinner },
  })
  const [fixedImage, setFixedImage] = useState<any>(spinner)
  const [totalProduct, setTotalProduct] = useState<any>(spinner)
  const [rankTracker, setRankTracker] = useState<any>({ avgRanking: spinner, keywords: spinner })
  const [homeDesktop, setHomeDesktop] = useState<any>(spinner)
  const [homeMobile, setHomeMobile] = useState<any>(spinner)
  const [productDesktop, setProductDesktop] = useState<any>(spinner)
  const [productMobile, setProductMobile] = useState<any>(spinner)
  const [categoryDesktop, setCategoryDesktop] = useState<any>(spinner)
  const [categoryMobile, setCategoryMobile] = useState<any>(spinner)
  const [richSnippets, setRichSnippets] = useState<any>({ home: "false", product: "false", breadcrumb: "false", sitelink: "false", blog: "false", faq: "false" })
  const [richSnippetLoading, setRichSnippetLoading] = useState(true)
  const [modalShow, setModalShow] = useState<any>({ type: "titleTag", status: false })
  const totalPage = useRef(0)
  const [signedPayload, setSignedPayload] = useState('')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const searchParams = useSearchParams()
  const showPaymentModal = searchParams.get('showPaymentModal')
  const [auditStatus,setAuditStatus] = useState(1)

  const [topBarShow, dispatchTopBar] = useReducer((state: any, action: any) => {
    if (action.type == 'close')
      return { status: false }
    if (action.type == 'open')
      return { status: true }
  }, { status: false })

  const getDashboardData = () => {
    Api("getDashboardData", {}).then(({ data }: any) => {
      const error = data.errorCount
      const bulkOptimizer = data.bulkOptimizerErrors
      const rank = data.rankingData
      setSeoScore(data.totalStoreAvgScore)
      setErrors({
        meta: error.meta_tag_issue,
        content: error.content_issue,
        image: error.image_issue,
        broken: error.broken_link_issue,
        url: error.url_issue,
      })
      setError404(data.forzerofor_errors)
      setBulkOptimizer({
        titleTag: {
          total: bulkOptimizer.title_blank,
          home: bulkOptimizer.homeEmptyTitleCount,
          product: bulkOptimizer.productEmptyTitleCount,
          category: bulkOptimizer.categoryEmptyTitleCount,
          brand: bulkOptimizer.brandEmptyTitleCount,
          page: bulkOptimizer.pageEmptyTitleCount,
          blog: bulkOptimizer.blogEmptyTitleCount,
        },
        metaDescription: {
          total: bulkOptimizer.meta_description_blank,
          home: bulkOptimizer.homeEmptyDescCount,
          product: bulkOptimizer.productEmptyDescCount,
          category: bulkOptimizer.categoryEmptyDescCount,
          brand: bulkOptimizer.brandEmptyDescCount,
          page: bulkOptimizer.pageEmptyDescCount,
          blog: bulkOptimizer.blogEmptyDescCount,
        },
        altText: { total: bulkOptimizer.alttext_blank },
      })
      setFixedImage(data.imgOptimizeErrors)
      setRankTracker({
        avgRanking: rank.average_ranking,
        keywords: rank.keyword_count,
      })
    })
  }


  const getSeoAuditCount = (refresh = 0) => {
    const isPaid = localStorage.getItem("manage_service") ?? 0
    Api("getSeoAuditCount", { refresh: refresh }).then(({ data }) => {
      setAuditStatus(data.audit_status??1)
      if (refresh == 1) {
        totalPage.current = data.totalLiveCount
        setTotalProduct(data.individual_live_count.product)
        setSeoAudit({
          crawled: data.totalAuditCount,
          total: data.totalLiveCount,
        })
      } else {
        setSeoAudit((seoAudit: any) => ({
          ...seoAudit,
          crawled: data.totalAuditCount,
        }))
      }
      if (data.totalAuditCount != totalPage.current && isPaid == "1" && data.audit_status==0) {
        setTimeout(getSeoAuditCount, 6000)
      }
    })
  }


  const getDashboardPageSpeedScore = (type: string) => {
    Api("getDashboardPageSpeedScore", { type: type }).then((data) => {
      if (type == "home_desktop") setHomeDesktop(data.data.score)
      if (type == "home_mobile") setHomeMobile(data.data.score)
      if (type == "product_desktop") setProductDesktop(data.data.score)
      if (type == "product_mobile") setProductMobile(data.data.score)
      if (type == "category_desktop") setCategoryDesktop(data.data.score)
      if (type == "category_mobile") setCategoryMobile(data.data.score)
    })
  }


  const getRichSnippets = () => {
    Api("getRichSnippetsStatus", {}).then(({ data }: any) => {
      setRichSnippetLoading(false)
      setRichSnippets({
        home: data.status.home_status,
        product: data.status.product_status,
        breadcrumb: data.status.breadcrumb_status,
        sitelink: data.status.sitelink_search_status,
        blog: data.status.blog_post_status,
        faq: data.status.faq_status,
      })
    })
  }


  const apiCall = () => {
    getDashboardData()
    getSeoAuditCount(1)
    getDashboardPageSpeedScore("home_desktop")
    getDashboardPageSpeedScore("home_mobile")
    getDashboardPageSpeedScore("product_desktop")
    getDashboardPageSpeedScore("product_mobile")
    getDashboardPageSpeedScore("category_desktop")
    getDashboardPageSpeedScore("category_mobile")
    getRichSnippets()
    getTopBarStatus()
  }


  const updateAuditStatus = ()=>{
    Api("updateAuditStatus").then(()=>{
      getSeoAuditCount(1)
    })
  }

  const getTopBarStatus = () => {
    Api('getSettingData', { val_key: 'meeting_call_top_bar' }).then((data) => {
      if (data.data.status == 0) {
        dispatchTopBar({ type: "close" })
      } else {
        dispatchTopBar({ type: "open" })
      }

    })

  }

  const setTopBarStatus = () => {
    Api('setSettingData', { val_key: 'meeting_call_top_bar', val_status: 0 })
    dispatchTopBar({ type: "close" })
  }


  useEffect(() => {
    apiCall()
    setSignedPayload(localStorage.getItem('signedPayload') ?? '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ConfirmationModal
        message={translate1('confirmationModalMessege')}
        show={showConfirmationModal}
        handleClose={() => {
          setShowConfirmationModal(false)
        }}
        handleYes={() => { 
          setShowConfirmationModal(false)
          setAuditStatus(0)
          updateAuditStatus()
        }} handleNo={() =>setShowConfirmationModal(false)}
      />
      {showPaymentModal == 'true' &&
        <PaymentModal heading={translate1('paymentModalHeading')} message={translate1('paymentModalMessege')} />
      }
      <BulkOptimizerModal
        show={modalShow.status}
        handleClose={() =>
          setModalShow((modalShow: any) => ({ ...modalShow, status: false }))
        }
        home={bulkOptimizer[modalShow.type].home}
        product={bulkOptimizer[modalShow.type].product}
        category={bulkOptimizer[modalShow.type].category}
        brand={bulkOptimizer[modalShow.type].brand}
        page={bulkOptimizer[modalShow.type].page}
        blog={bulkOptimizer[modalShow.type].blog}
      />
      {topBarShow?.status &&
        <div className="top-bar">
            {
              translate1.rich('seoServices', {
                consultation: (chunks) => <a href="https://calendly.com/seokart/30min?month=2024-08" target="_blank"> {chunks} </a>,
                demoUrl: (chunk) => <a href="https://calendly.com/seokart/30min?month=2024-08" target="_blank"> {chunk} </a>
              })
            }
          <div>
          <span onClick={setTopBarStatus} className="topBar-closeBtn"><Image src="/images/close-icon.svg" width={20} height={20} alt="" /></span>  
          </div> 
          
        </div>}
      <div className="content-frame-main">
        <div className="content-frame-head flex justify-content-between align-item-center">
          <div className="content-frameHead-left flex align-item-center gap-2">
            <h1 className="Text--headingLg mb-0">{translate('dashboard')}</h1>
            <ChannelList />
          </div>
          <div className="content-frameHead-right">
            <Languagedropdown />
            <UpgradeButton />
            {signedPayload &&
              <a target="_blank" href={`https://app.seokart.com/bigc_front/load?signed_payload=${signedPayload}`}>
                <button className="btn btn-light">
                  <Image src={`${basePath}/images/link-icon.svg`} width={20} height={20} alt="" />
                </button>
              </a>
            }
            
            <Hamburger />

          </div>
        </div>
        
        <div className="dashboard-box">
          <div className="row">
            <div className="col-md-4 col-sm-12 dashboard-seoOptimizer-box">

              <div className="card">
                <div className="dashboard-feature-head flex align-item-center gap15">
                  <div className="dashboard-feature-img">
                    <Image
                      src={`${basePath}/images/dash-audit-icon.svg`}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </div>
                  <h2 className="Text--headingLg mb-0">{translate('seoOptimizer')}</h2>
                  {auditStatus==2 && (seoAudit.crawled!=seoAudit.total) &&
                  <button className="custom-btn" onClick={() => setShowConfirmationModal(true)}>{translate('reAudit')}</button>}
                  {auditStatus==0 && (seoAudit.crawled!=seoAudit.total) && (
                      <Badge bg="warning" text="dark">
                        {translate('auditInProgress')}...
                      </Badge>
                    )}
                </div>
               
                  <div className="dashboard-feature-output d-grid grid-column-2">
                    <div className="dashboard-featureBox text-center">
                      <h4 className="Text--headingLg">{seoAudit.crawled}</h4>
                      <p>{translate('crawledPages')}</p>
                    </div>
                    <div className="dashboard-featureBox text-center">
                      <h4 className="Text--headingLg">{seoAudit.total}</h4>
                      <p>{translate("totalPages")}</p>
                    </div>
                  </div>
               
              </div>

            </div>
            <div className="col-md-3 col-sm-12 dashboard-scoreBox">
              <div className="card">
                <div className="dashboard-SeoScore">
                  <div className="gauge-a"></div>
                  <div className="gauge-b"></div>
                  <div className={`gauge-c ${seoScore > 89 ? "green" : seoScore < 89 && seoScore > 79 ? "yellow" : "red"}-bg`} style={{ transform: `rotate(${(seoScore * 180) / 100}deg)` }}></div>

                  <div className={`gauge-data ${seoScore > 89 ? "green" : seoScore < 89 && seoScore > 79 ? "yellow" : "red"}`}>{seoScore === 0 ? (<Spinner animation="grow" variant="danger" />) : seoScore} % <span>{translate("seoScore")}</span></div>

                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-12 dashboard-bulkOptimizer-box">
              <div className="card">
                <div className="dashboard-feature-head flex align-item-center gap15">
                  <div className="dashboard-feature-img">
                    <Image
                      src={`${basePath}/images/dash-bulk-optimizer-icon.svg`}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </div>
                  <Link href='bulk-optimizer'><h2 className="Text--headingLg mb-0">{translate("bulkOptimizer")}</h2></Link>
                </div>
                <div className="dashboard-feature-output d-grid grid-column-3">
                  <div className="dashboard-featureBox text-center" onClick={() => { setModalShow({ type: "titleTag", status: true }) }}><h4 className={`Text--headingLg  cursor-pointer ${bulkOptimizer.titleTag.total > 0 ? "red" : "green"}`}>{bulkOptimizer.titleTag.total}</h4><p>{translate("emptyTitleTags")}</p></div>

                  <div className="dashboard-featureBox text-center" onClick={() => { setModalShow({ type: "metaDescription", status: true }) }}><h4 className={`Text--headingLg  cursor-pointer ${bulkOptimizer.metaDescription.total > 0 ? "red" : "green"}`}>{bulkOptimizer.metaDescription.total}</h4><p>{translate("emptyMetaDescription")}</p></div>

                  <div className="dashboard-featureBox text-center"><h4 className={`Text--headingLg ${bulkOptimizer.altText.total > 0 ? "red" : "green"}`}>{bulkOptimizer.altText.total}</h4><p>{translate("emptyAltTexts")}</p></div>

                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-12 dashboard-leftMix-boxes">
              <div className="row">
                <Link href='seo-audit?tab=errors' className="dashboard-errorMain-box">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="dashboard-feature-head flex align-item-center gap15">
                        <div className="dashboard-feature-img">
                          <Image
                            src={`${basePath}/images/dash-error-icon.svg`}
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <h2 className="Text--headingLg mb-0">{translate("errors")}</h2>
                      </div>
                      <div className="dashboard-feature-output d-grid grid-column-5">
                        <div className="dashboard-featureBox text-center">
                          <h4 className={`Text--headingLg ${errors.meta > 0 ? "red" : "green"}`}>{errors.meta}</h4>

                          <p>{translate("meta")}</p>
                        </div>
                        <div className="dashboard-featureBox text-center">
                          <h4 className={`Text--headingLg ${errors.content > 0 ? "red" : "green"}`}>{errors.content}</h4>
                          <p>{translate("content")}</p>
                        </div>
                        <div className="dashboard-featureBox text-center">
                          <h4 className={`Text--headingLg ${errors.image > 0 ? "red" : "green"}`}>{errors.image}</h4>

                          <p>{translate("image")}</p>
                        </div>
                        <div className="dashboard-featureBox text-center">
                          <h4 className={`Text--headingLg ${errors.broken > 0 ? "red" : "green"}`}>{errors.broken}</h4>

                          <p>{translate("broken")}</p>
                        </div>
                        <div className="dashboard-featureBox text-center">
                          <h4 className={`Text--headingLg ${errors.url > 0 ? "red" : "green"}`}>{errors.url}</h4>

                          <p>{translate("url")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="col-md-6 col-sm-12 dashboard-imageOptimizer-box">
                  <Link href='image-optimizer'>
                    <div className="card">
                      <div className="dashboard-feature-head flex align-item-center gap15">
                        <div className="dashboard-feature-img">
                          <Image
                            src={`${basePath}/images/dash-image-optimizer-icon.svg`}
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <h2 className="Text--headingLg mb-0">{translate("imageOptimizer")}</h2>
                      </div>
                      <div className="dashboard-feature-output d-grid grid-column-2">
                        <div className="dashboard-featureBox text-center">
                          <h4 className="Text--headingLg green">{fixedImage}</h4>
                          <p>{translate("fixedImages")}</p>
                        </div>
                        <div className="dashboard-featureBox text-center">
                          <h4 className="Text--headingLg">{totalProduct}</h4>
                          <p>{translate("totalProducts")}</p>
                        </div>
                      </div>
                    </div>
                  </Link>

                </div>

                <div className="col-md-6 col-sm-12 dashboard-rankTracker-box">
                  <Link href='rank-tracker'>
                    <div className="card">
                      <div className="dashboard-feature-head flex align-item-center gap15">
                        <div className="dashboard-feature-img">
                          <Image
                            src={`${basePath}/images/dash-rank-tracker-icon.svg`}
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <h2 className="Text--headingLg mb-0">{translate("rankTracker")}</h2>
                      </div>
                      <div className="dashboard-feature-output d-grid grid-column-2">
                        <div className="dashboard-featureBox text-center">
                          <h4 className="Text--headingLg green">
                            {rankTracker.avgRanking}
                          </h4>
                          <p>{translate("avgKeywordsRanking")}</p>
                        </div>
                        <div className="dashboard-featureBox text-center">
                          <h4 className="Text--headingLg">
                            {rankTracker.keywords}
                          </h4>
                          <p>{translate("keywords")}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-md-12 dashboard-pagespeed-main">
                  <Link href='page-speed'>
                    <div className="card">
                      <div className="dashboard-feature-head flex align-item-center gap15">
                        <div className="dashboard-feature-img">
                          <Image
                            src={`${basePath}/images/dash-bulk-optimizer-icon.svg`}
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <h2 className="Text--headingLg mb-0">{translate("pageSpeed")}</h2>
                      </div>
                      <div className="dashboard-feature-output d-grid grid-column-3">
                        <div className="dashboard-featureBox text-center">
                          <div className="dashboard-pageSpeed-box flex justify-content-center gap20">
                            <div className="flex align-item-center gap10">
                              <Image
                                src={`${basePath}/images/page-speed-web-icon.svg`}
                                alt=""
                                width={26}
                                height={26}
                              />
                              <h4 className={`Text--headingLg mb-0 ${homeDesktop > 90 ? "green" : homeDesktop > 80 ? "yellow" : "red"}`}>
                                {homeDesktop}%
                              </h4>
                            </div>
                            <div className="flex align-item-center gap10">
                              <Image
                                src={`${basePath}/images/page-speed-mobile-icon.svg`}
                                alt=""
                                width={26}
                                height={26}
                              />
                              <h4 className={`Text--headingLg mb-0 ${homeMobile > 90 ? "green" : homeMobile > 80 ? "yellow" : "red"}`}>{homeMobile}%</h4>

                            </div>
                          </div>
                          <p>{translate("home")}</p>
                        </div>
                        <div className="dashboard-featureBox text-center">
                          <div className="dashboard-pageSpeed-box flex justify-content-center gap20">
                            <div className="flex align-item-center gap10">
                              <Image
                                src={`${basePath}/images/page-speed-web-icon.svg`}
                                alt=""
                                width={26}
                                height={26}
                              />
                              <h4 className={`Text--headingLg mb-0 ${productDesktop > 90 ? "green" : productDesktop > 80 ? "yellow" : "red"}`}>{productDesktop}%</h4>

                            </div>
                            <div className="flex align-item-center gap10">
                              <Image
                                src={`${basePath}/images/page-speed-mobile-icon.svg`}
                                alt=""
                                width={26}
                                height={26}
                              />
                              <h4 className={`Text--headingLg mb-0 ${productMobile > 90 ? "green" : productMobile > 80 ? "yellow" : "red"}`}>{productMobile}%</h4>

                            </div>
                          </div>
                          <p>{translate("product")}</p>
                        </div>
                        <div className="dashboard-featureBox text-center">
                          <div className="dashboard-pageSpeed-box flex justify-content-center gap20">
                            <div className="flex align-item-center gap10">
                              <Image
                                src={`${basePath}/images/page-speed-web-icon.svg`}
                                alt=""
                                width={26}
                                height={26}
                              />
                              <h4 className={`Text--headingLg mb-0 ${categoryDesktop > 90 ? "green" : categoryDesktop > 80 ? "yellow" : "red"}`}>{categoryDesktop}%</h4>

                            </div>
                            <div className="flex align-item-center gap10">
                              <Image
                                src={`${basePath}/images/page-speed-mobile-icon.svg`}
                                alt=""
                                width={26}
                                height={26}
                              />
                              <h4 className={`Text--headingLg mb-0 ${categoryMobile > 90 ? "green" : categoryMobile > 80 ? "yellow" : "red"}`}>{categoryMobile}%</h4>

                            </div>
                          </div>
                          <p>{translate("category")}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 dashboard-richSnippets-box">
              <Link href='404-fixer'>
                <div className="col-md-12 col-sm-12">
                  <div className="card">
                    <div className="dashboard-feature-head flex align-item-center gap15">
                      <div className="dashboard-feature-img">
                        <Image
                          src={`${basePath}/images/dash-bulk-optimizer-icon.svg`}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <h2 className="Text--headingLg mb-0">{translate("errors404")}</h2>
                    </div>
                    <div className="dashboard-feature-output d-grid">
                      <div className="dashboard-featureBox text-center">
                        <h4 className={`Text--headingLg ${error404 === 0 ? "green" : "red"}`}>{error404}</h4>

                        <p>{translate("notFixed")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="col-md-12">
                <div className="card richSnippets-box">
                  <div className="dashboard-feature-head flex align-item-center gap15">
                    <div className="dashboard-feature-img">
                      <Image
                        src={`${basePath}/images/dash-bulk-optimizer-icon.svg`}
                        alt=""
                        width={50}
                        height={50}
                      />
                    </div>
                    <Link href='rich-snippets'><h2 className="Text--headingLg mb-0">{translate("richSnippets")}</h2></Link>
                  </div>
                  <div className="rich-snippetsList">
                    <ul>
                      <li className="flex align-item-center justify-content-between">
                        <div className="rich-snippetsList-left Text--headingMd mb-0">
                        {translate("homePage")}
                        </div>
                        {richSnippetLoading ? (
                          <Spinner
                            animation="grow"
                            variant="success"
                            size="sm"
                          />
                        ) : (
                          <div className="rich-snippetsList-toggle">
                            <div className={`DSA-snippet-toggle ${richSnippets.home === "true" ? "" : "DSAS-toggle-off"}`}>
                              {richSnippets.home == "true" ? (
                                <>
                                  <span>ON</span>
                                  <div className="DSAST-toggle-round"></div>
                                </>
                              ) : (
                                <>
                                  <div className="DSAST-toggle-round"></div>
                                  <span>OFF</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                      <li className="flex align-item-center justify-content-between">
                        <div className="rich-snippetsList-left Text--headingMd mb-0">
                        {translate("products")}
                        </div>
                        {richSnippetLoading ? (
                          <Spinner
                            animation="grow"
                            variant="success"
                            size="sm"
                          />
                        ) : (
                          <div className="rich-snippetsList-toggle">
                            <div className={`DSA-snippet-toggle ${richSnippets.product === "true" ? "" : "DSAS-toggle-off"}`}>

                              {richSnippets.product == "true" ? (
                                <>
                                  <span>ON</span>
                                  <div className="DSAST-toggle-round"></div>
                                </>
                              ) : (
                                <>
                                  <div className="DSAST-toggle-round"></div>
                                  <span>OFF</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                      <li className="flex align-item-center justify-content-between">
                        <div className="rich-snippetsList-left Text--headingMd mb-0">
                        {translate("breadcrumb")}
                        </div>
                        {richSnippetLoading ? (
                          <Spinner
                            animation="grow"
                            variant="success"
                            size="sm"
                          />
                        ) : (
                          <div className="rich-snippetsList-toggle">
                            <div className={`DSA-snippet-toggle ${richSnippets.breadcrumb === "true" ? "" : "DSAS-toggle-off"}`}>

                              {richSnippets.breadcrumb == "true" ? (
                                <>
                                  <span>ON</span>
                                  <div className="DSAST-toggle-round"></div>
                                </>
                              ) : (
                                <>
                                  <div className="DSAST-toggle-round"></div>
                                  <span>OFF</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                      <li className="flex align-item-center justify-content-between">
                        <div className="rich-snippetsList-left Text--headingMd mb-0">
                        {translate("sitelinksSearchBox")}
                        </div>
                        {richSnippetLoading ? (
                          <Spinner
                            animation="grow"
                            variant="success"
                            size="sm"
                          />
                        ) : (
                          <div className="rich-snippetsList-toggle">
                            <div className={`DSA-snippet-toggle ${richSnippets.sitelink === "true" ? "" : "DSAS-toggle-off"}`}>
                              {richSnippets.sitelink == "true" ? (
                                <>
                                  <span>ON</span>
                                  <div className="DSAST-toggle-round"></div>
                                </>
                              ) : (
                                <>
                                  <div className="DSAST-toggle-round"></div>
                                  <span>OFF</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                      <li className="flex align-item-center justify-content-between">
                        <div className="rich-snippetsList-left Text--headingMd mb-0">
                        {translate("blogPosts")}
                        </div>
                        {richSnippetLoading ? (
                          <Spinner
                            animation="grow"
                            variant="success"
                            size="sm"
                          />
                        ) : (
                          <div className="rich-snippetsList-toggle">
                            <div className={`DSA-snippet-toggle ${richSnippets.blog === "true" ? "" : "DSAS-toggle-off"}`}>
                              {richSnippets.blog == "true" ? (
                                <>
                                  <span>ON</span>
                                  <div className="DSAST-toggle-round"></div>
                                </>
                              ) : (
                                <>
                                  <div className="DSAST-toggle-round"></div>
                                  <span>OFF</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                      <li className="flex align-item-center justify-content-between">
                        <div className="rich-snippetsList-left Text--headingMd mb-0">
                        {translate("faqPage")}
                        </div>
                        {richSnippetLoading ? (
                          <Spinner
                            animation="grow"
                            variant="success"
                            size="sm"
                          />
                        ) : (
                          <div className="rich-snippetsList-toggle">
                            <div className={`DSA-snippet-toggle ${richSnippets.faq === "true" ? "" : "DSAS-toggle-off"}`}>
                              {richSnippets.faq == "true" ? (
                                <>
                                  <span>ON</span>
                                  <div className="DSAST-toggle-round"></div>
                                </>
                              ) : (
                                <>
                                  <div className="DSAST-toggle-round"></div>
                                  <span>OFF</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
