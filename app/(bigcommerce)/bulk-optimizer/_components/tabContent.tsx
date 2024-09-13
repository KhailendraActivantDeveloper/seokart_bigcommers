import { OverlayTrigger, Tooltip, Dropdown, Spinner } from 'react-bootstrap'
import Image from 'next/image'
// import { basePath } from '@/next.config'
import { useEffect, useState } from 'react'
import { Api } from '@/app/_api/apiCall'
import { toast } from 'react-toastify'
import CustomItemModal from './customItemList'
import ConfirmModal from './confirmModal'
import { useTranslations } from '@/translator'

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''
type TranslateFunction = (key: string, options?: { [key: string]: string | number }) => string;

export default function Home({ bulkHomeData, currentTab, selectedItem, refresh }: { bulkHomeData: any, currentTab: any, selectedItem: any, refresh: any }) {
  const [template, setTemplate] = useState('')
  const [previewData, setPreviewData] = useState<any>({})
  const [homeUrl, setHomeUrl] = useState('')
  const [cruiseControl, setCruiseControl] = useState<boolean>(false)
  const [customModalShow, setCustomModalShow] = useState(false)
  const [confirmModalShow, setConfirmModalShow] = useState(false)
  const [updateType, setUpdateType] = useState('')

  const [range, setRange] = useState<any>({ start: 1, end: 2 })
  const [rangeBlank, setRangeBlank] = useState<any>({ start: 1, end: 2 })

  const translate = useTranslations('common');
  const translate1: TranslateFunction = useTranslations('bulkOptimizer');

  const getLivePreviewData = () => {
    Api('bulkOptimizer/getLivePreviewData', { type: selectedItem }).then(({ data }: { data: any }) => {
      setPreviewData(data)
    })
  }

  const updateBulkTemplate = () => {
    let fieldKey = ''
    if (currentTab == 'titleTag' && selectedItem == 'product') {
      fieldKey = 'prd_title'
    }
    if (currentTab == 'metaDescription' && selectedItem == 'product') {
      fieldKey = 'prd_desc'
    }
    if (currentTab == 'altText' && selectedItem == 'product') {
      fieldKey = 'prd_alt_tag'
    }
    if (currentTab == 'titleTag' && selectedItem == 'category') {
      fieldKey = 'cat_title'
    }
    if (currentTab == 'metaDescription' && selectedItem == 'category') {
      fieldKey = 'cat_desc'
    }
    if (currentTab == 'titleTag' && selectedItem == 'brand') {
      fieldKey = 'brand_title'
    }
    if (currentTab == 'metaDescription' && selectedItem == 'brand') {
      fieldKey = 'brand_desc'
    }
    Api('bulkOptimizer/updateBulkTemplate', { template: template, field_key: fieldKey }).then((data) => {
      toast.success(translate('templateSaved'))
      refresh()
    })
  }

  const updateCruiseStatus = () => {
    const isPaid = localStorage.getItem('manage_service') ?? 0
    if (isPaid == 0) {
      toast.error(translate('pleaseUpgradeYourAccount'))
      return false
    }
    setCruiseControl(!cruiseControl)
    let obj = {}
    if (currentTab == 'titleTag') {
      obj = { title: String(!cruiseControl), meta_desc: String(bulkHomeData.data.template.product_cruise.desc) }
    }
    if (currentTab == 'metaDescription') {
      obj = { title: String(bulkHomeData.data.template.product_cruise.title), meta_desc: String(!cruiseControl) }
    }
    Api('bulkOptimizer/updateCruiseStatus', { item_type: selectedItem, ...obj }).then(() => {
      toast.success(translate('cruiseControlON'))
      refresh()
    })
  }

  const setBulkQueue = (checkedItem = []) => {
    toast.info(translate('pleaseWaitMessage'))
    setConfirmModalShow(false)
    setCustomModalShow(false)

    let templateType = (currentTab == 'titleTag') ? translate('title') : (currentTab == 'metaDescription') ? translate('description') : translate('alttag')
    let extraData;
    if (updateType == 'update_range') {
      extraData = [String(range.start), String(range.end)]
    }

    if (updateType == 'update_range_blank') {
      extraData = [String(rangeBlank.start), String(rangeBlank.end)]
    }

    if (updateType == 'update_custom') {
      extraData = checkedItem
    }

    Api('bulkOptimizer/setBulkQueue', {
      template_type: templateType,
      template_value: template,
      item_type: selectedItem,
      update_type: updateType,
      extra_data: extraData
    }).then((data) => {
      refresh()
      if (data.status_code == 200)
        toast.success(data.message)
      else
        toast.error(data.message)
    })
  }

  useEffect(() => {
    getLivePreviewData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])


  useEffect(() => {
    if (bulkHomeData.loading == false) {
      if (currentTab == 'titleTag' && selectedItem == 'product') {
        setTemplate(bulkHomeData.data.template.prd_title?.replaceAll('^ ', ' ') ?? '')
        setCruiseControl(bulkHomeData.data.template.product_cruise.title == 'true' ? true : false)
      }

      if (currentTab == 'metaDescription' && selectedItem == 'product') {
        setTemplate(bulkHomeData.data.template.prd_desc?.replaceAll('^ ', ' ') ?? '')
        setCruiseControl(bulkHomeData.data.template.product_cruise.desc == 'true' ? true : false)
      }

      if (currentTab == 'altText' && selectedItem == 'product') {
        setTemplate(bulkHomeData.data.template.prd_alt_tag?.replaceAll('^ ', ' ') ?? '')
      }


      if (currentTab == 'titleTag' && selectedItem == 'category') {
        setTemplate(bulkHomeData.data.template.cat_title?.replaceAll('^ ', ' ') ?? '')
        setCruiseControl(bulkHomeData.data.template.category_cruise.title == 'true' ? true : false)
      }

      if (currentTab == 'metaDescription' && selectedItem == 'category') {
        setTemplate(bulkHomeData.data.template.cat_desc?.replaceAll('^ ', ' ') ?? '')
        setCruiseControl(bulkHomeData.data.template.category_cruise.desc == 'true' ? true : false)
      }


      if (currentTab == 'titleTag' && selectedItem == 'brand') {
        setTemplate(bulkHomeData.data.template.brand_title?.replaceAll('^ ', ' ') ?? '')
      }

      if (currentTab == 'metaDescription' && selectedItem == 'brand') {
        setTemplate(bulkHomeData.data.template.brand_desc?.replaceAll('^ ', ' ') ?? '')
      }

    }

  }, [bulkHomeData, currentTab, selectedItem])


  useEffect(() => {
    const channelObj = JSON.parse(localStorage.getItem('channel') ?? '')
    setHomeUrl(channelObj.domain)

  }, [])


  return (<>
    {customModalShow &&
      <CustomItemModal
        show={customModalShow}
        handleClose={() => setCustomModalShow(false)}
        itemType={selectedItem}
        setBulkQueue={(checkedItem: any) => setBulkQueue(checkedItem)}
      />}


    {confirmModalShow &&
      <ConfirmModal
        show={confirmModalShow}
        handleClose={() => setConfirmModalShow(false)}
        previewData={previewData}
        currentTab={currentTab}
        selectedItem={selectedItem}
        template={template}
        homeUrl={homeUrl}
        handleYes={() => setBulkQueue()}
      />
    }

    <div className="bulk-optimizerTab-area">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="custom-textarea">
            <span className="textarea-heading">{translate('template')}</span>
            <textarea className="form-control" value={template?.replaceAll('^ ', ' ').trimStart()} onChange={(e) => setTemplate(e.target.value)}></textarea>
          </div>

          <div className="optisa-btns">
            <ul>
              {selectedItem == 'product' &&
                <>
                  <li>
                    <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[product name]]`)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('productName')}
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[sku]]`)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('sku')}
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[price]]`)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('price')}
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} ${bulkHomeData.data.currency_code}`)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('currency')}
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[type]]`)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('type')}
                    </button>
                  </li>
                </>
              }
              {(selectedItem == 'category' || selectedItem == 'product') &&
                <li>
                  <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[category name]]`)}>
                    <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('categoryName')}
                  </button>
                </li>}
              {selectedItem == 'brand' &&
                <li>
                  <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[name]]`)}>
                    <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('name')}
                  </button>
                </li>}
              {selectedItem == 'product' &&
                <>
                  <li>
                    <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[brand]]`)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('brand')}
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[mpn]]`)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} />{translate('mpn')}
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} [[condition]]`)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} /> {translate('condition')}
                    </button>
                  </li>
                </>
              }

              <li>
                <button type="button" className="btn btn-default" onClick={() => setTemplate((prev: any) => `${prev} ${bulkHomeData.data.store_name}`)}>
                  <Image src={`${basePath}/images/plus-icon.svg`} alt='' width={20} height={20} />{translate('storeName')}
                </button>
              </li>
            </ul>
          </div>

          <div className="bulk-update-main-btn">
            <div className="dropdown flex-grow-1">
              <Dropdown>
                <Dropdown.Toggle className='custom-btn dropdown-toggle' variant='secondary'>
                  {translate('update')}
                </Dropdown.Toggle>

                <Dropdown.Menu variant='secondary'>
                  <div className="BulkOptimizer-BtnOpen">
                    <ul>
                      <li>
                        <Dropdown.Item className='btn btn-custom'>
                          <button type="button" className="bulk-update-btn" onClick={updateBulkTemplate}>{translate('save')}</button>
                        </Dropdown.Item>
                      </li>

                      <li>
                        <Dropdown.Item className='btn btn-custom'>
                          <button type="button" className="bulk-update-btn" onClick={() => {
                            setUpdateType('update_all')
                            setConfirmModalShow(true)
                          }}>{translate('saveUpdateAll')}</button>
                        </Dropdown.Item>
                      </li>

                      <li>
                        <div className="BulkUpdate-Btn">
                          <span className="BulkUpdate-BtnTitle">{translate('saveUpdate')}</span>
                          <div className="BulkUpdate-Filter">
                            <div className="custom-input">
                              <input type="number" min={1} className="form-control" value={range.start} onChange={(e) => setRange((prev: any) => ({ ...prev, start: e.target.value }))} />
                            </div>
                            <span>{translate('to')}</span>
                            <div className="custom-input">
                              <input type="number" min={2} className="form-control" value={range.end} onChange={(e) => setRange((prev: any) => ({ ...prev, end: e.target.value }))} />
                            </div>
                            <Dropdown.Item className='btn btn-custom'>
                              <button type="button" className="custom-btn" disabled={Number(range.start) >= Number(range.end)} onClick={() => {
                                setUpdateType('update_range')
                                setConfirmModalShow(true)
                              }}>{translate('GO')}</button>
                            </Dropdown.Item>

                          </div>
                        </div>
                      </li>

                      <li>
                        <Dropdown.Item className='btn btn-custom'>
                          <button type="button" className="bulk-update-btn" onClick={() => {
                            setUpdateType('update_blank')
                            setConfirmModalShow(true)
                          }}>{translate('saveUpdateAllBlanks')}</button>
                        </Dropdown.Item>
                      </li>

                      <li>
                        <div className="BulkUpdate-Btn">
                          <span className="BulkUpdate-BtnTitle">{translate('saveUpdateAllBlanksBetween')}</span>
                          <div className="BulkUpdate-Filter">
                            <div className="custom-input">
                              <input type="number" min={1} className="form-control" value={rangeBlank.start} onChange={(e) => setRangeBlank((prev: any) => ({ ...prev, start: e.target.value }))} />
                            </div>
                            <span>{translate('to')}</span>
                            <div className="custom-input">
                              <input type="number" min={2} className="form-control" value={rangeBlank.end} onChange={(e) => setRangeBlank((prev: any) => ({ ...prev, end: e.target.value }))} />
                            </div>
                            <Dropdown.Item className='btn btn-custom'>
                              <button type="button" className="custom-btn" disabled={Number(rangeBlank.start) >= Number(rangeBlank.end)} onClick={() => {
                                setUpdateType('update_range_blank')
                                setConfirmModalShow(true)
                              }}>{translate('GO')}</button>
                            </Dropdown.Item>

                          </div>
                        </div>
                      </li>

                      <li>
                        <Dropdown.Item className='btn btn-custom'>
                          <button type="button" className="bulk-update-btn" onClick={() => {
                            setCustomModalShow(true)
                            setUpdateType('update_custom')
                          }}>{translate('saveUpdateCustom')}</button>
                        </Dropdown.Item>
                      </li>
                    </ul>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {currentTab != 'altText' && (selectedItem == 'product' || selectedItem == 'category') &&
              <div className="cruise-controller-box">
                <div className="cruise-controller-text">{translate('cruiseControl')}
                  <OverlayTrigger overlay={
                    <Tooltip>
                      {currentTab == 'titleTag' && selectedItem == 'product' && translate1('pragraph1')}

                      {currentTab == 'metaDescription' && selectedItem == 'product' && translate1('pragraph2')}


                      {currentTab == 'titleTag' && selectedItem == 'category' && translate1('pragraph3')}

                      {currentTab == 'metaDescription' && selectedItem == 'category' && translate1('pragraph4')}
                    </Tooltip>}>
                    <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />

                  </OverlayTrigger>
                </div>
                <div className="cruise-controller-toggle">
                  <div className="vc-toggle-container">
                    <label className="vc-small-switch">
                      <input type="checkbox" className="vc-switch-input" checked={cruiseControl} onChange={() => {
                        updateCruiseStatus()
                      }} />
                      <span className="vc-switch-label" data-on="ON" data-off="OFF"></span>
                      <span className="vc-switch-handle"></span>
                    </label>
                  </div>
                </div>
              </div>}
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div className="BulkOptimizer-PreviewArea">
            <div className="BulkOptimizer-Preview-Heading">
              <h6 className="Text--headingMd">{translate('livePreview')}</h6>
            </div>

            <div className="BulkOptimizer-Preview-Pera">
              <p className="pl-16 pr-16">
                {/* {`Our app will optimize all ${selectedItem == 'product' ? 'products' : selectedItem == 'category' ? 'categories' : 'brands'} based on the template value entered on the left side. Please see below for a sample of a ${selectedItem == 'product' ? 'product' : selectedItem == 'category' ? 'category' : 'brand'}'s ${currentTab == 'titleTag' ? 'Title Tag' : (currentTab == 'metaDescription') ? 'Meta Description' : 'Alt Text'}.`} */}
                {
                  translate1('pragraph5',
                    {
                      item1: selectedItem == 'product' ? 'products' : selectedItem == 'category' ? 'categories' : 'brands', 
                      item2: selectedItem == 'product' ? 'product' : selectedItem == 'category' ? 'category' : 'brand', 
                      item3: currentTab == 'titleTag' ? 'Title Tag' : (currentTab == 'metaDescription') ? 'Meta Description' : 'Alt Text'
                    }
                  )
                }
              </p>
              <ul>
                <li>
                  <div className="d-flex align-item-center gap-3">
                    <span className="badge">{selectedItem == 'product' ? translate('product') : selectedItem == 'category' ? translate('category') : translate('brand')} {translate('url')}:</span>
                    <a href={`${homeUrl}${previewData.url}`} target="_blank" className='bulk-productURL'>
                      {homeUrl}{previewData.url}
                    </a>
                  </div>
                </li>

                <li>
                  <div className="d-flex align-item-center gap-3">
                    <span className="badge">{translate('current')} {currentTab == 'titleTag' ? translate('titleTag') : currentTab == 'metaDescription' ? translate('metaDescription') : translate('altText')}:</span>
                    <p>{currentTab == 'titleTag' ? previewData.title_tag : currentTab == 'metaDescription' ? previewData.meta_desc : previewData.product_img_alt}</p>
                  </div>
                </li>

                <li>
                  <div className="d-flex align-item-center gap-3">
                    <span className="badge">{translate('new')} {currentTab == 'titleTag' ? translate('titleTag') : currentTab == 'metaDescription' ? translate('metaDescription') : translate('altText')}:</span>
                    <p>{template?.replaceAll('[[product name]]', previewData.product_name).replaceAll('[[sku]]', previewData.sku).replaceAll('[[price]]', previewData.price).replaceAll('[[type]]', previewData.type).replaceAll('[[category name]]', previewData.category_name).replaceAll('[[brand]]', previewData.brand_name).replaceAll('[[mpn]]', previewData.mpn).replaceAll('[[condition]]', previewData.condition).replaceAll('[[condition]]', previewData.condition).replaceAll('[[name]]', previewData.brand_name)}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>)
}