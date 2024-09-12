"use client"

import { useEffect, useState } from "react"
import { Tabs, Tab, Spinner, Accordion } from "react-bootstrap"
import Select from "react-select"
import RangeSlider from "rsuite/RangeSlider"
import "rsuite/RangeSlider/styles/index.css"
import { toast } from "react-toastify"
import Confirmation from "@/app/[locale]/_components/confirmation"
import ChannelList from "@/app/[locale]/_components/channelList"
import UpgradeButton from "@/app/[locale]/_components/upgradeButton"
import PriceValidJson from "./_components/priceValid.json"
import businessTypeJson from "./_components/businessType.json"
import reviewAppJson from "./_components/reviewApp.json"
import Howitwork from '@/app/_howitwork/modal'
// import { basePath } from "@/next.config"
import { Api } from "@/app/_api/apiCall"
import Image from "next/image"
import Hamburger from '../../_components/hamburger'
import { useTranslations } from "next-intl"

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home() {
  const [platform, setPlatform] = useState('bigcommerce')
  const [homeUrl, setHomeUrl] = useState('')
  const [product, setProduct] = useState({ count: 0, url: [] })
  const [blog, setBlog] = useState({ count: 0, url: [] })
  const [category, setCategory] = useState({ count: 0, url: [] })
  const [brand, setBrand] = useState({ count: 0, url: [] })
  const [page, setPage] = useState({ count: 0, url: [] })

  const [homeStatus, setHomeStatus] = useState<boolean>(false)
  const [breadcrumbStatus, setBreadcrumbStatus] = useState<boolean>(false)
  const [sitelinkSearchStatus, setSitelinkSearchStatus] = useState<boolean>(false)
  const [blogPostStatus, setBlogPostStatus] = useState<boolean>(false)
  const [productStatus, setProductStatus] = useState<boolean>(false)
  const [faqStatus, setFaqStatus] = useState<boolean>(false)

  const [countryList, setCountryList] = useState<any>([])
  const [selectedCountry, setSelectedCountry] = useState<any>('US')

  const [reviewApp, setReviewApp] = useState('bigcommerce')
  const [brandName, setBrandName] = useState('')
  const [priceValid, setPriceValid] = useState({ value: 1, duration: 'day' })

  const [businessType, setBusinessType] = useState<any>("Organization")
  const [homeLogo, setHomeLogo] = useState('')
  const [storeName, setStoreName] = useState('')
  const [singleImageUrl, setSingleImageUrl] = useState('')
  const [multiImageUrl, setMultiImageUrl] = useState<any>({})
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('')
  const [businessFaxNumber, setBusinessFaxNumber] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [storeAddress2, setStoreAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [snapchatUrl, setSnapchatUrl] = useState('')
  const [pinterestUrl, setPinterestUrl] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [currency, setCurrency] = useState('')

  const [faqUrl, setFaqUrl] = useState('')
  const [faqs, setFaqs] = useState<any>({})

  const [loading, setLoading] = useState(true)
  const [updateLoading, setUpdateLoading] = useState(false)

  const [confProductModal, setConfProductModal] = useState(false)
  const [confHomeModal, setConfHomeModal] = useState(false)
  const [confBreadcrumbModal, setConfBreadcrumbModal] = useState(false)
  const [confSitelinkModal, setConfSitelinkModal] = useState(false)
  const [confBlogpostModal, setConfBlogpostModal] = useState(false)
  const [confFaqModal, setConfFaqModal] = useState(false)

  const translate = useTranslations('common');
  const translate1 = useTranslations('richSnippets');

  const alertAddMsg = translate1('richSnippetsAlertAddMsg')
  const alertRemoveMsg = translate1('richSnippetsAlertRemoveMsg')




  const getRichSnippetsStatus = () => {
    Api('getRichSnippetsStatus').then(({ data }) => {
      getSnippetsAllData()
      setHomeStatus(data.status.home_status === 'true' ? true : false)
      setBreadcrumbStatus(data.status.breadcrumb_status === 'true' ? true : false)
      setSitelinkSearchStatus(data.status.sitelink_search_status === 'true' ? true : false)
      setBlogPostStatus(data.status.blog_post_status === 'true' ? true : false)
      setProductStatus(data.status.product_status === 'true' ? true : false)
      setFaqStatus(data.status.faq_status === 'true' ? true : false)
      setCurrency(data.storeInfo.currency_symbol)
    })
  }

  const getItemCountNdUrl = () => {
    Api('getItemCountNdUrl').then(({ data }) => {
      setProduct({ count: data.product?.count ?? 0, url: data.product?.urls ?? [] })
      setCategory({ count: data.category?.count ?? 0, url: data.category?.urls ?? [] })
      setBlog({ count: data.blog?.count ?? 0, url: data.blog?.urls ?? [] })
      setBrand({ count: data.brand?.count ?? 0, url: data.brand?.urls ?? [] })
      setPage({ count: data.page?.count ?? 0, url: data.page?.urls ?? [] })
    })
  }

  const updateAllData = (type: any = '') => {
    setUpdateLoading(true)
    const productObj = {
      product_review: reviewApp,
      product_brand_name: brandName,
      pvu_days: priceValid.value,
      pvu_duration: priceValid.duration
    }

    const homeObj = {
      home_logo: homeLogo,
      home_business_name: storeName,
      home_business_type: businessType,
      home_image: { sngl_img: singleImageUrl, mltpl_img: Object.values(multiImageUrl) },
      home_business_phone: businessPhoneNumber,
      home_business_fax: businessFaxNumber,
      home_business_email: businessEmail,
      home_business_address: storeAddress,
      home_business_address2: storeAddress2,
      home_business_city: city,
      home_business_state: state,
      home_business_zip: zipCode,
      home_business_country: selectedCountry,
      home_business_facebook: facebookUrl,
      home_business_twitter: twitterUrl,
      home_business_instagram: instagramUrl,
      home_business_youtube: youtubeUrl,
      home_business_linkedin: linkedinUrl,
      home_business_snapchat: snapchatUrl,
      home_business_pinterest: pinterestUrl,
      home_price_start: priceRange.min,
      home_price_end: priceRange.max

    }

    Api('addRichSnnipetsScriptData', {
      product_data: JSON.stringify(productObj),
      product_status: (type == 'product') ? String(!productStatus) : String(productStatus),
      faq_data: JSON.stringify({ faq_url: faqUrl, all_data: Object.values(faqs) }),
      faq_status: (type == 'faq') ? String(!faqStatus) : String(faqStatus),
      home_data: JSON.stringify(homeObj),
      home_status: (type == 'home') ? String(!homeStatus) : String(homeStatus),
      blog_post_status: (type == 'blogPost') ? String(!blogPostStatus) : String(blogPostStatus),
      breadcrumb_status: (type == 'breadCrumb') ? String(!breadcrumbStatus) : String(breadcrumbStatus),
      sitelink_search_status: (type == 'sitelink') ? String(!sitelinkSearchStatus) : String(sitelinkSearchStatus)
    }).then((data) => {
      setUpdateLoading(false)
    })


  }



  const getSnippetsAllData = () => {
    Api('getSnippetsAllData').then(({ data }) => {
      setLoading(false)

      const product = JSON.parse(data.product)
      const homePage = JSON.parse(data.home_page)
      const faq = JSON.parse(data.faq)

      Api('getCountry').then(({ data }) => {
        setCountryList(data.map((item: any) => ({ label: item.location_name, value: item.country_iso_code })))
        setSelectedCountry(homePage.home_business_country)
      })


      setReviewApp(product.product_review)
      setBrandName(product.product_brand_name)
      setPriceValid({ value: product.pvu_days, duration: product.pvu_duration })

      setHomeLogo(homePage.home_logo ?? '')
      setStoreName(homePage.home_business_name ?? '')
      setBusinessType(homePage.home_business_type)
      setSingleImageUrl(homePage.home_image.sngl_img ?? '')
      setMultiImageUrl({ ...homePage.home_image.mltpl_img })
      setBusinessPhoneNumber(homePage.home_business_phone ?? '')
      setBusinessFaxNumber(homePage.home_business_fax ?? '')
      setBusinessEmail(homePage.home_business_email ?? '')
      setStoreAddress(homePage.home_business_address ?? '')
      setStoreAddress2(homePage.home_business_address2 ?? '')
      setCity(homePage.home_business_city ?? '')
      setState(homePage.home_business_state ?? '')
      setZipCode(homePage.home_business_zip ?? '')
      setFacebookUrl(homePage.home_business_facebook ?? '')
      setTwitterUrl(homePage.home_business_twitter ?? '')
      setInstagramUrl(homePage.home_business_instagram ?? '')
      setYoutubeUrl(homePage.home_business_youtube ?? '')
      setLinkedinUrl(homePage.home_business_linkedin ?? '')
      setSnapchatUrl(homePage.home_business_snapchat ?? '')
      setPinterestUrl(homePage.home_business_pinterest ?? '')
      setPriceRange({ min: Number(homePage.home_price_start), max: Number(homePage.home_price_end) })

      setFaqUrl(faq?.faq_url ?? '')
      setFaqs(faq?.all_data ?? {})


    })
  }

  useEffect(() => {
    const channelObj = JSON.parse(localStorage.getItem('channel') ?? '')
    setHomeUrl(channelObj.domain)
    setPlatform(channelObj.platform)
    getItemCountNdUrl()
    getRichSnippetsStatus()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (<>

    <Confirmation
      message={productStatus ? alertRemoveMsg : alertAddMsg}
      show={confProductModal}
      handleNo={() => setConfProductModal(false)}
      handleYes={() => {
        setConfProductModal(false)
        setProductStatus((productStatus) => !productStatus)
        updateAllData('product')
        toast.success(translate('informationUpdatedSuccessMsg'))
      }} />

    <Confirmation
      message={homeStatus ? alertRemoveMsg : alertAddMsg}
      show={confHomeModal}
      handleNo={() => setConfHomeModal(false)}
      handleYes={() => {
        setConfHomeModal(false)
        updateAllData('home')
        if (localStorage.getItem('manage_service') == '1') {
          setHomeStatus((homeStatus) => !homeStatus)
          toast.success(translate('informationUpdatedSuccessMsg'))
        } else {
          setHomeStatus(false)
          toast.error(translate('pleaseUpgradeYourAccount'))
        }

      }} />

    <Confirmation
      message={breadcrumbStatus ? alertRemoveMsg : alertAddMsg}
      show={confBreadcrumbModal}
      handleNo={() => setConfBreadcrumbModal(false)}
      handleYes={() => {
        setConfBreadcrumbModal(false)
        updateAllData('breadCrumb')
        if (localStorage.getItem('manage_service') == '1') {
          setBreadcrumbStatus((breadcrumbStatus) => !breadcrumbStatus)
          toast.success(translate('informationUpdatedSuccessMsg'))
        } else {
          setBreadcrumbStatus(false)
          toast.error(translate('pleaseUpgradeYourAccount'))
        }

      }} />

    <Confirmation
      message={sitelinkSearchStatus ? alertRemoveMsg : alertAddMsg}
      show={confSitelinkModal}
      handleNo={() => setConfSitelinkModal(false)}
      handleYes={() => {
        setConfSitelinkModal(false)
        updateAllData('siteLink')
        if (localStorage.getItem('manage_service') == '1') {
          setSitelinkSearchStatus((sitelinkSearchStatus) => !sitelinkSearchStatus)
          toast.success(translate('informationUpdatedSuccessMsg'))
        } else {
          setSitelinkSearchStatus(false)
          toast.error(translate('pleaseUpgradeYourAccount'))
        }

      }} />

    <Confirmation
      message={blogPostStatus ? alertRemoveMsg : alertAddMsg}
      show={confBlogpostModal}
      handleNo={() => setConfBlogpostModal(false)}
      handleYes={() => {
        setConfBlogpostModal(false)
        updateAllData('blogPost')
        if (localStorage.getItem('manage_service') == '1') {
          setBlogPostStatus((blogPostStatus) => !blogPostStatus)
          toast.success(translate('informationUpdatedSuccessMsg'))
        } else {
          setBlogPostStatus(false)
          toast.error(translate('pleaseUpgradeYourAccount'))
        }

      }} />

    <Confirmation
      message={faqStatus ? alertRemoveMsg : alertAddMsg}
      show={confFaqModal}
      handleNo={() => setConfFaqModal(false)}
      handleYes={() => {
        setConfFaqModal(false)
        updateAllData('faq')
        if (localStorage.getItem('manage_service') == '1') {
          setFaqStatus((faqStatus) => !faqStatus)
          
        } else {
          setFaqStatus(false)
          toast.error(translate('pleaseUpgradeYourAccount'))
        }

      }} />

    <div className="content-frame-main">
      <div className="content-frame-head flex justify-content-between align-item-center">
        <div className="content-frameHead-left flex align-item-center gap-2">
          <h1 className="Text--headingLg flex align-item-center gap-2 mb-0">
            {translate('richSnippets')}
            <Howitwork page='richsnippet' />
          </h1>
          <ChannelList />
        </div>
        <div className="content-frameHead-right">
          <UpgradeButton />
          <Hamburger />
        </div>
      </div>
      {platform == 'bigcommerce' ?
        <div className="richSnippets-Area">
          <Accordion defaultActiveKey={['0', '1']}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{translate('console')}</Accordion.Header>
              <Accordion.Body>
                <div className="richSnippets-consoleArea">
                  {loading ? <div className="text-center"><Spinner variant="" /></div> :

                    <Tabs
                      defaultActiveKey="home"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="home" title={<>{translate('homePage')} <div className={`badge badge-${homeStatus ? 'success' : 'danger'}`}>{homeStatus ? 1 : 0}</div></>}>
                        <div className="consoleArea-tabDetails">
                          <div className="consoleTab-box">
                            {homeStatus ?
                              <>
                                <h4 className="green-text">{translate1('richSnippetsPragraph1')}</h4>
                                <p>{translate1('richSnippetsPragraph2')}:</p>
                                <ul>
                                  <li><p><a href={`https://search.google.com/test/rich-results?url=${homeUrl}`} target="_blank">{homeUrl}</a></p></li>
                                </ul>
                                <p>{translate1('richSnippetsPragraph3')}</p>
                              </>
                              :
                              <>
                                <h4 className="red-text">{translate1('richSnippetsPragraph4')}</h4>
                                <p>{translate1('richSnippetsPragraph5')}:</p>
                                <ul>
                                  <li><p>{translate1('richSnippetsPragraph6')}</p></li>
                                  <li><p>{translate1('richSnippetsPragraph7')}</p></li>
                                  <li><p>{translate1('richSnippetsPragraph8')}</p></li>
                                  <li><p>{translate1('richSnippetsPragraph9')}</p></li>
                                  <li><p>{translate1('richSnippetsPragraph10')}</p></li>
                                </ul>
                                <p className="red-text">{translate1('richSnippetsPragraph11')}</p>
                              </>
                            }
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="Product" title={<>{translate('products')} <div className={`badge badge-${productStatus ? 'success' : 'danger'}`}>{productStatus ? product.count : 0}</div></>}>
                        <div className="consoleArea-tabDetails">
                          <div className="consoleTab-box">
                            {productStatus ?
                              <>
                                <h4 className="green-text">{translate1('richSnippetsPragraph1')}</h4>
                                <p>{translate1('richSnippetsPragraph12')}:</p>
                                <ul>
                                  {product.url.map((item, key) => (
                                    <li key={key}><p><a href={`https://search.google.com/test/rich-results?url=${homeUrl}${item}`} target="_blank">{homeUrl}{item}</a></p></li>
                                  ))}
                                </ul>
                                <p>{translate1('richSnippetsPragraph13')}</p>
                              </>
                              :
                              <>
                                <h4 className="red-text">{translate1('richSnippetsPragraph4')}</h4>
                                <p>{translate1('richSnippetsPragraph14')}:</p>
                                <ul>
                                  <li><p>{translate('ProductNameAndDescription')}</p></li>
                                  <li><p>{translate('productFeaturedImage')}</p></li>
                                  <li><p>{translate('brand')}</p></li>
                                  <li><p>{translate('AvailabilityAndPrice')}</p></li>
                                  <li><p>{translate('aggregateRating')}</p></li>
                                  <li><p>{translate('totalRatingsCount')}</p></li>
                                </ul>
                                <p className="red-text">{translate1('richSnippetsPragraph11')}</p>
                              </>
                            }
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="Blog" title={<>{translate('blogPost')} <div className={`badge badge-${blogPostStatus ? 'success' : 'danger'}`}>{blogPostStatus ? blog.count : 0}</div></>}>
                        <div className="consoleArea-tabDetails">
                          <div className="consoleTab-box">
                            {blogPostStatus ?
                              <>
                                <h4 className="green-text">{translate1('richSnippetsPragraph1')}</h4>
                                <p>{translate1('richSnippetsPragraph15')}:</p>
                                <ul>
                                  {blog.url.map((item, key) => (
                                    <li key={key}><p><a href={`https://search.google.com/test/rich-results?url=${homeUrl}${item}`} target="_blank">{homeUrl}{item}</a></p></li>
                                  ))}
                                </ul>
                                <p>{translate1('richSnippetsPragraph13')}</p>
                              </>
                              :
                              <>
                                <h4 className="red-text">{translate1('richSnippetsPragraph4')}</h4>
                                <p>{translate1('richSnippetsPragraph16')}:</p>
                                <p>{translate1('richSnippetsPragraph10')}</p>
                                <p className="red-text">{translate1('richSnippetsPragraph11')}</p>
                              </>
                            }
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="Category" title={<>{translate('categories')} <div className={`badge badge-${breadcrumbStatus ? 'success' : 'danger'}`}>{breadcrumbStatus ? category.count : 0}</div></>}>
                        <div className="consoleArea-tabDetails">
                          <div className="consoleTab-box">
                            {breadcrumbStatus ?
                              <>
                                <h4 className="green-text">{translate1('richSnippetsPragraph1')}</h4>
                                <p>{translate1('richSnippetsPragraph17')}:</p>
                                <ul>
                                  {category.url.map((item, key) => (
                                    <li key={key}><p><a href={`https://search.google.com/test/rich-results?url=${homeUrl}${item}`} target="_blank">{homeUrl}{item}</a></p></li>
                                  ))}
                                </ul>
                                <p>{translate1('richSnippetsPragraph13')}</p>
                              </>
                              :
                              <>
                                <h4 className="red-text">{translate1('richSnippetsPragraph4')}</h4>
                                <p>{translate1('richSnippetsPragraph16')}:</p>
                                <p>{translate1('richSnippetsPragraph9')}</p>
                                <p className="red-text">{translate1('richSnippetsPragraph11')}</p>
                              </>
                            }
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="Brand" title={<>{translate('brand')} <div className={`badge badge-${breadcrumbStatus ? 'success' : 'danger'}`}>{breadcrumbStatus ? brand.count : 0}</div></>}>
                        <div className="consoleArea-tabDetails">
                          <div className="consoleTab-box">
                            {breadcrumbStatus ?
                              <>
                                <h4 className="green-text">{translate1('richSnippetsPragraph1')}</h4>
                                <p>{translate1('richSnippetsPragraph18')}:</p>
                                <ul>
                                  {brand.url.map((item, key) => (
                                    <li key={key}><p><a href={`https://search.google.com/test/rich-results?url=${homeUrl}${item}`} target="_blank">{homeUrl}{item}</a></p></li>
                                  ))}
                                </ul>
                                <p>{translate1('richSnippetsPragraph13')}</p>
                              </>
                              :
                              <>
                                <h4 className="red-text">{translate1('richSnippetsPragraph4')}</h4>
                                <p>{translate1('richSnippetsPragraph16')}:</p>
                                <p>{translate1('richSnippetsPragraph9')}</p>
                                <p className="red-text">{translate1('richSnippetsPragraph11')}</p>
                              </>
                            }
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="Page" title={<>{translate('pages')} <div className={`badge badge-${breadcrumbStatus ? 'success' : 'danger'}`}>{breadcrumbStatus ? page.count : 0}</div></>}>
                        <div className="consoleArea-tabDetails">
                          <div className="consoleTab-box">
                            {breadcrumbStatus ?
                              <>
                                <h4 className="green-text">{translate1('richSnippetsPragraph1')}</h4>
                                <p>{translate1('richSnippetsPragraph18')}:</p>
                                <ul>
                                  {page.url.map((item, key) => (
                                    <li key={key}><p><a href={`https://search.google.com/test/rich-results?url=${homeUrl}${item}`} target="_blank">{homeUrl}{item}</a></p></li>
                                  ))}
                                </ul>
                                <p>{translate1('richSnippetsPragraph13')}</p>
                              </>
                              :
                              <>
                                <h4 className="red-text">{translate1('richSnippetsPragraph4')}</h4>
                                <p>{translate1('richSnippetsPragraph16')}:</p>
                                <p>{translate1('richSnippetsPragraph9')}</p>
                                <p>{translate1('richSnippetsPragraph19')}</p>
                                <p className="red-text">{translate1('richSnippetsPragraph11')}</p>
                              </>
                            }
                          </div>
                        </div>
                      </Tab>

                    </Tabs>}
                </div>
              </Accordion.Body>
            </Accordion.Item >
            <Accordion.Item eventKey="1">
              <Accordion.Header> {translate('products')}</Accordion.Header>

              <div className="vc-toggle-container">
                <label className="vc-small-switch">
                  <input type="checkbox" className="vc-switch-input" checked={productStatus} onChange={() => {
                    setConfProductModal(true)
                  }} />
                  <span className="vc-switch-label" data-on="ON" data-off="OFF"></span>
                  <span className="vc-switch-handle"></span>
                </label>
              </div>

              <Accordion.Body>
                {loading ? <div className="text-center"><Spinner variant="" /></div> :
                  <div className="richSnippets-productArea">
                    <div className="richSnippets-productBox">
                      <div className="richSnippets-productLeft">
                        <h3>{translate('sourceOfReview')}</h3>
                        <p>{translate1('richSnippetsPragraph20')}</p>
                      </div>

                      <div className="richSnippets-productRight">
                        <div className="autoSearch-dropi snippets-businessBox">
                          <span className="autoSearch-dropiHeadig">{translate('productReviewApp')}</span>
                          <Select
                            value={reviewAppJson.data.find((item: any) => (item.value == reviewApp))}
                            onChange={(selectedValue: any) => setReviewApp(selectedValue.value)}
                            options={reviewAppJson.data}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="richSnippets-productBox">
                      <div className="richSnippets-productLeft">
                        <h3>{translate('defaultBrandName')}</h3>
                        <p>{translate1('richSnippetsPragraph21')}</p>
                      </div>

                      <div className="richSnippets-productRight">
                        <div className="custom-input big-input snippets-businessBox">
                          <span>{translate('brandName')}</span>
                          <input type="text" className="form-control" value={brandName} onChange={((event) => {
                            setBrandName(event.target.value)
                          })} />
                        </div>
                      </div>
                    </div>

                    <div className="richSnippets-productBox">
                      <div className="richSnippets-productLeft">
                        <h3>{translate('priceValidUntil')}</h3>
                        <p>{translate1('richSnippetsPragraph22')}</p>
                      </div>

                      <div className="richSnippets-productRight price-valid-until">

                        <div className="headChannel-dropi custom-dropi big-dropi snippets-businessBox">
                          <div className="autoSearch-dropi snippets-businessBox">
                            <span className="autoSearch-dropiHeadig">{translate('selectNumber')}</span>
                            <Select
                              value={PriceValidJson.data.find((item: any) => (item.value == priceValid.value))}
                              onChange={(selectedValue: any) => setPriceValid((oldValue) => ({ ...oldValue, value: selectedValue.value }))}
                              options={PriceValidJson.data}
                            />
                          </div>
                        </div>

                        <div className="headChannel-dropi custom-dropi big-dropi snippets-businessBox">
                          <div className="autoSearch-dropi snippets-businessBox">
                            <span className="autoSearch-dropiHeadig">{translate('selectDuration')}</span>
                            <Select
                              value={PriceValidJson.data1.find((item: any) => (item.value == priceValid.duration))}
                              onChange={(selectedValue: any) => setPriceValid((oldValue) => ({ ...oldValue, duration: selectedValue.value }))}
                              options={PriceValidJson.data1}
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="text-align-right">
                      <button type="button" onClick={()=>{
                        toast.success(translate('informationUpdatedSuccessMsg'))
                        updateAllData()
                      }} className="custom-btn" disabled={updateLoading}>{updateLoading ? <Spinner size="sm" /> : translate('update')}</button>
                    </div>
                  </div>}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header> {translate('homePage')}

              </Accordion.Header>
              <div className="vc-toggle-container">
                <label className="vc-small-switch">
                  <input type="checkbox" className="vc-switch-input" checked={homeStatus} onChange={() => {
                    setConfHomeModal(true)
                  }} />
                  <span className="vc-switch-label" data-on="ON" data-off="OFF"></span>
                  <span className="vc-switch-handle"></span>
                </label>
              </div>
              <Accordion.Body>
                <div className="richSnippets-productArea">
                  <div className="richSnippets-productBox">
                    <div className="richSnippets-productLeft">
                      <h3>{translate('logo')}</h3>
                      <p>{translate('inputURLWebsiteLogo')}</p>
                    </div>

                    <div className="richSnippets-productRight">
                      <div className="custom-input big-input snippets-businessBox">
                        <span>{translate('logo')}</span>
                        <input type="text" placeholder={translate('logoURL')} className="form-control" value={homeLogo} onChange={((event) => {
                          setHomeLogo(event.target.value)
                        })} />
                      </div>
                    </div>
                  </div>

                  <div className="richSnippets-productBox">
                    <div className="richSnippets-productLeft">
                      <h3>{translate('storeName')}</h3>
                      <p>{translate('inputStoreNameLogo')}</p>
                    </div>

                    <div className="richSnippets-productRight">
                      <div className="custom-input big-input snippets-businessBox">
                        <span>{translate('storeName')}</span>
                        <input type="text" placeholder={translate('businessName')} className="form-control" value={storeName} onChange={((event) => {
                          setStoreName(event.target.value)
                        })} />

                      </div>
                    </div>
                  </div>

                  <div className="richSnippets-productBox">
                    <div className="richSnippets-productLeft">
                      <h3>{translate('businessType')}</h3>
                      <p>{translate('selectCategoryStore')}</p>
                      <p>{translate('selectSpecificCategoryMandatoryImagesURL')}</p>
                    </div>

                    <div className="richSnippets-productRight snippets-businessType">
                      <div className="autoSearch-dropi snippets-businessBox">
                        <span className="autoSearch-dropiHeadig">{translate('businessType')}</span>
                        <Select
                          value={businessTypeJson.business.find((item: any) => (item.value == businessType))}
                          onChange={(selectedValue: any) => setBusinessType(selectedValue.value)}
                          options={businessTypeJson.business}
                        />
                      </div>


                      <div className="custom-input big-input snippets-businessBox">
                        <span>{translate('enterImageURL')}</span>
                        <input type="text" placeholder={translate('enterImageURL')} className="form-control" value={singleImageUrl} onChange={((event) => {
                          setSingleImageUrl(event.target.value)
                        })} />
                      </div>

                      {Object.keys(multiImageUrl).map((key: any) => (
                        <div className="custom-input big-input snippets-businessBox snippets-addImage-box" key={key}>
                          <span>{translate('enterImageURL')}</span>
                          <input type="text" className="form-control" value={multiImageUrl[key].img_url} onChange={((event) => {
                            setMultiImageUrl((multiImageUrl: any) => ({ ...multiImageUrl, [key]: { img_url: event.target.value } }))
                          })} />
                          <button type="button" className="snippets-imageClose" onClick={() => {
                            setMultiImageUrl((multiImageUrl: any) => {
                              const updatedImageUrl = { ...multiImageUrl }
                              delete updatedImageUrl[key]
                              return updatedImageUrl
                            })
                          }}>
                            <Image src={`${basePath}/images/delete-icon.svg`} width={20} height={20} alt="" />
                          </button>
                        </div>
                      ))}


                      <div className="text-align-left">
                        <button className="custom-btn" onClick={() => {
                          setMultiImageUrl((multiImageUrl: any) => ({ ...multiImageUrl, [Object.keys(multiImageUrl).length + 1]: { 'img_url': '' } }))
                        }}>{translate('addImageURL')}</button>
                      </div>
                    </div>
                  </div>

                  <div className="richSnippets-productBox richSnippets-contactDetails">
                    <div className="richSnippets-productLeft">
                      <h3>{translate('addressAndContactDetails')}</h3>
                      <p>{translate('msgProvideStoreDetails')}</p>
                    </div>

                    <div className="richSnippets-productRight snippets-businessType">
                      <div className="row snippetsAddress-box">
                        <div className="col-md-6 col-sm-12">
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('businessPhoneNumber')}</span>
                            <input type="text" placeholder={translate('businessPhoneNumber')} className="form-control" value={businessPhoneNumber} onChange={((event) => {
                              setBusinessPhoneNumber(event.target.value)
                            })} />
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('businessFaxNumber')}</span>
                            <input type="text" placeholder={translate('businessFaxNumber')} className="form-control" value={businessFaxNumber} onChange={((event) => {
                              setBusinessFaxNumber(event.target.value)
                            })} />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('businessEmail')}</span>
                            <input type="text" placeholder={translate('businessEmail')} className="form-control" value={businessEmail} onChange={((event) => {
                              setBusinessEmail(event.target.value)
                            })} />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('storeAddress')}</span>
                            <input type="text" placeholder={translate('storeAddress')} className="form-control" value={storeAddress} onChange={((event) => {
                              setStoreAddress(event.target.value)
                            })} />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('storeAddress2_OPTIONAL')}</span>
                            <input type="text" placeholder={translate('storeAddress')} className="form-control" value={storeAddress2} onChange={((event) => {
                              setStoreAddress2(event.target.value)
                            })} />
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('city')}</span>
                            <input type="text" placeholder={translate('city')} className="form-control" value={city} onChange={((event) => {
                              setCity(event.target.value)
                            })} />
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('StateOrProvince')}</span>
                            <input type="text" placeholder={translate('StateOrProvince')} className="form-control" value={state} onChange={((event) => {
                              setState(event.target.value)
                            })} />
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('ZipOrPostalCode')}</span>
                            <input type="text" placeholder={translate('ZipOrPostalCode')} className="form-control" value={zipCode} onChange={((event) => {
                              setZipCode(event.target.value)
                            })} />
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                          <div className="autoSearch-dropi snippets-businessBox mb-18">
                            <span className="autoSearch-dropiHeadig">{translate('country')}</span>
                            <Select
                              value={countryList.find((item: any) => item.value == selectedCountry)}
                              onChange={(selectedValue: any) => setSelectedCountry(selectedValue.value)}
                              options={countryList}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="richSnippets-productBox">
                    <div className="richSnippets-productLeft">
                      <h3>{translate('socialMediaProfiles')}</h3>
                      <p>{translate('socialMediaProfilesMsg')}</p>
                    </div>

                    <div className="richSnippets-productRight snippets-businessType">
                      <div className="custom-input big-input icon-input snippets-businessBox">
                        <span>{translate('facebookURL')}</span>
                        <i className="input-icon"><Image src={`${basePath}/images/facebook-icon.svg`} width={14} height={14} alt="" /></i>
                        <input type="text" placeholder={translate('enterFbUsername')} className="form-control" value={facebookUrl} onChange={((event) => {
                          setFacebookUrl(event.target.value)
                        })} />
                      </div>

                      <div className="custom-input big-input icon-input snippets-businessBox">
                        <span>{translate('xURL')}</span>
                        <i className="input-icon"><Image src={`${basePath}/images/twitter-icon.svg`} width={14} height={14} alt="" /></i>
                        <input type="text" placeholder={translate('enterXUsername')} className="form-control" value={twitterUrl} onChange={((event) => {
                          setTwitterUrl(event.target.value)
                        })} />
                      </div>

                      <div className="custom-input big-input icon-input snippets-businessBox">
                        <span>{translate('instagramURL')}</span>
                        <i className="input-icon"><Image src={`${basePath}/images/instagram-icon.svg`} width={14} height={14} alt="" /></i>
                        <input type="text" placeholder={translate('enterInstagramUsername')} className="form-control" value={instagramUrl} onChange={((event) => {
                          setInstagramUrl(event.target.value)
                        })} />
                      </div>

                      <div className="custom-input big-input icon-input snippets-businessBox">
                        <span>{translate('youTubeURL')}</span>
                        <i className="input-icon"><Image src={`${basePath}/images/youtube-icon.svg`} width={14} height={14} alt="" /></i>
                        <input type="text" placeholder={translate('enterYoutubeUsername')} className="form-control" value={youtubeUrl} onChange={((event) => {
                          setYoutubeUrl(event.target.value)
                        })} />
                      </div>

                      <div className="custom-input big-input icon-input snippets-businessBox">
                        <span>{translate('linkedInURL')}</span>
                        <i className="input-icon"><Image src={`${basePath}/images/linkedin-icon.svg`} width={14} height={14} alt="" /></i>
                        <input type="text" placeholder={translate('enterLinkedinUsername')} className="form-control" value={linkedinUrl} onChange={((event) => {
                          setLinkedinUrl(event.target.value)
                        })} />
                      </div>

                      <div className="custom-input big-input icon-input snippets-businessBox">
                        <span>{translate('snapchatURL')}</span>
                        <i className="input-icon"><Image src={`${basePath}/images/snapchat-icon.svg`} width={14} height={14} alt="" /></i>
                        <input type="text" placeholder={translate('enterSnapchatUsername')} className="form-control" value={snapchatUrl} onChange={((event) => {
                          setSnapchatUrl(event.target.value)
                        })} />
                      </div>

                      <div className="custom-input big-input icon-input snippets-businessBox">
                        <span>{translate('pinterestURL')}</span>
                        <i className="input-icon"><Image src={`${basePath}/images/pinterest-icon.svg`} width={14} height={14} alt="" /></i>
                        <input type="text" placeholder={translate('enterPinterestUsername')} className="form-control" value={pinterestUrl} onChange={((event) => {
                          setPinterestUrl(event.target.value)
                        })} />
                      </div>
                    </div>
                  </div>

                  <div className="richSnippets-productBox">
                    <div className="richSnippets-productLeft">
                      <h3>{translate('priceRange')}</h3>
                      <p>{translate('selectPriceRangeMsg')}</p>
                    </div>

                    <div className="richSnippets-productRight snippetsRange-area">
                      <p>{translate('priceRangeForYourStore')}</p>
                      <div className="snippetsMinMax-area">
                        <div className="scippets-rangeMin">{translate('min')}: {currency}{priceRange.min.toLocaleString()}</div>
                        <div className="scippets-rangeMax">{translate('max')}: {currency}{priceRange.max.toLocaleString()}</div>
                      </div>
                      <RangeSlider
                        value={[priceRange.min, priceRange.max]}
                        min={0}
                        max={10000}
                        onChange={(data: any) => {
                          setPriceRange({ min: data[0], max: data[1] })
                        }}
                        tooltip={true}
                      />


                    </div>
                  </div>

                  <div className="richSnippets-productBox snippets-fullBox">
                    <div className="richSnippets-productLeft">
                      <h3>
                        {translate('breadcrumbs')}
                        <div className="vc-toggle-container">
                          <label className="vc-small-switch">
                            <input type="checkbox" className="vc-switch-input" checked={breadcrumbStatus} onChange={() => {
                              setConfBreadcrumbModal(true)
                            }} />
                            <span className="vc-switch-label" data-on="ON" data-off="OFF"></span>
                            <span className="vc-switch-handle"></span>
                          </label>
                        </div>
                      </h3>
                      <p>{translate1('richSnippetsPragraph23')}</p>
                    </div>
                  </div>

                  <div className="richSnippets-productBox snippets-fullBox">
                    <div className="richSnippets-productLeft">
                      <h3>
                        {translate('sitelinksSearch')}
                        <div className="vc-toggle-container">
                          <label className="vc-small-switch">
                            <input type="checkbox" className="vc-switch-input" checked={sitelinkSearchStatus} onChange={() => {
                              setConfSitelinkModal(true)
                            }} />
                            <span className="vc-switch-label" data-on="ON" data-off="OFF"></span>
                            <span className="vc-switch-handle"></span>
                          </label>
                        </div>
                      </h3>
                      <p>{translate1('richSnippetsPragraph24')}</p>
                    </div>
                  </div>

                  <div className="richSnippets-productBox snippets-fullBox">
                    <div className="richSnippets-productLeft">
                      <h3>
                        {translate('blogPosts')}
                        <div className="vc-toggle-container">
                          <label className="vc-small-switch">
                            <input type="checkbox" className="vc-switch-input" checked={blogPostStatus} onChange={() => {
                              setConfBlogpostModal(true)
                            }} />
                            <span className="vc-switch-label" data-on="ON" data-off="OFF"></span>
                            <span className="vc-switch-handle"></span>
                          </label>
                        </div>
                      </h3>
                      <p>{translate1('richSnippetsPragraph25')}</p>
                    </div>
                  </div>

                  <div className="text-align-right tab-textLeft">
                    <button type="button" className="custom-btn" onClick={()=>{
                      toast.success(translate('informationUpdatedSuccessMsg'))
                      updateAllData()
                    }} disabled={updateLoading}>{updateLoading ? <Spinner size="sm" /> : translate('update')}</button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header> {translate('FAQsPage')}


              </Accordion.Header>
              <div className="vc-toggle-container">
                <label className="vc-small-switch">
                  <input type="checkbox" className="vc-switch-input" checked={faqStatus} onChange={() => {
                    if (faqUrl.trim() == '') {
                      toast.error(translate('FAQsSNIPPETErrorMsg'))
                      return false
                    }
                    setConfFaqModal(true)
                  }} />
                  <span className="vc-switch-label" data-on="ON" data-off="OFF"></span>
                  <span className="vc-switch-handle"></span>
                </label>
              </div>
              <Accordion.Body>
                <div className="richSnippets-productArea">
                  <div className="richSnippets-productBox">
                    <div className="richSnippets-productLeft">
                      <h3>{translate('FAQsSNIPPET')}</h3>
                      <p>{translate1('richSnippetsPragraph26')}</p>
                    </div>

                    <div className="richSnippets-productRight">
                      <div className="custom-input big-input snippets-businessBox">
                        <span>{translate('enterURL')}</span>
                        <input type="text" placeholder={translate('enterURL')} className="form-control" value={faqUrl} onChange={((event) => {
                          setFaqUrl(event.target.value)
                        })} />
                      </div>


                      {Object.keys(faqs).map((key) => (
                        <div className="snippetsAdd-faqBox" key={key}>
                          <button type="button" className="snippetsFaq-closeBtn" onClick={() => {
                            setFaqs((faqs: any) => {
                              const updatedFaqs = { ...faqs }
                              delete updatedFaqs[key]
                              return updatedFaqs
                            })
                          }}><Image src={`${basePath}/images/close-icon.svg`} width={20} height={20} alt="" /></button>
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('enterQuestion')}</span>
                            <input type="text" placeholder={translate('enterQuestion')} className="form-control" value={faqs[key].faq_question} onChange={((event) => {
                              setFaqs((faqs: any) => ({ ...faqs, [key]: { ...faqs[key], faq_question: event.target.value } }))
                            })} />
                          </div>
                          <div className="custom-input big-input snippets-businessBox">
                            <span>{translate('enterAnswer')}</span>
                            <input type="text" placeholder={translate('enterAnswer')} className="form-control" value={faqs[key].faq_answer} onChange={((event) => {
                              setFaqs((faqs: any) => ({ ...faqs, [key]: { ...faqs[key], faq_answer: event.target.value } }))
                            })} />
                          </div>
                        </div>

                      ))}


                      <div className="text-align-left">
                        <button type="button" className="custom-btn mb-22" onClick={() => {
                          setFaqs((faqs: any) => ({ ...faqs, [Object.keys(faqs).length + 1]: { 'faq_question': '', 'faq_answer': '' } }))
                        }}>{translate('addFAQ')}</button>
                      </div>
                    </div>
                  </div>

                  <div className="text-align-right tab-textLeft">
                    <button type="button" className="custom-btn" onClick={()=>{
                      toast.success(translate('informationUpdatedSuccessMsg'))
                      updateAllData()
                    }} disabled={updateLoading}>{updateLoading ? <Spinner size="sm" /> :  translate('update')}</button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion >

        </div>
        :
        <>
          <div className="richSnippets-Area">
            <div className="richSnippets-consoleArea">
              <h3>{translate1('richSnippetsPragraph27')}</h3>
            </div>
          </div>

        </>

      }

    </div>

  </>

  )
}
