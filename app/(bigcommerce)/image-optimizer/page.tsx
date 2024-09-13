'use client'

import { Api } from '@/app/_api/apiCall';
import ChannelList from '@/app/_components/channelList'
import Howitwork from '@/app/_howitwork/modal'
import { useEffect, useState,useCallback } from 'react';
import { debounce } from 'lodash';
import { Pagination } from 'rsuite';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
// import { basePath } from '@/next.config';
import Image from 'next/image';
import Upgrade from '@/app/_components/upgradeButton'
import Singleimage from './_components/singleImage'
import Link from 'next/link'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/app/_components/confirmation'
import Hamburger from '../../_components/hamburger'
import { useTranslations } from '@/translator'

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home() {
  const router = useRouter()
  let componentKey = 0
  const [imageList, setImageList] = useState({ data: [], loading: true })
  const [quota, setQuota] = useState({ used: 0, limit: 0, optimizedImage: 0, inProgressImage: 0, restoredImage: 0 })
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [masterCheckbox, setMasterCheckbox] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [updatedAltText, setUpdatedAltText] = useState<any>({})
  const [updateAltTextBtnLoading, setUpdateAltTextBtnLoading] = useState(false)
  const [checkedImage, setCheckedImage] = useState<any>({})
  const [masterButtonLoading, setMasterButtonLoading] = useState(false)
  const [allProductButton, setAllProductButton] = useState(false)
  const [optimizeConfirmModalShow, setOptimizeConfirmModalShow] = useState(false)
  const [restoreConfirmModalShow, setRestoreConfirmModalShow] = useState(false)
  const [jobStatus,setJobStatus] = useState(false)
  const [jobStatusLoad,setJobStatusLoad] = useState(false)

  const translate = useTranslations('common');
  const translate1 = useTranslations('seoAudit');
  const translate2 = useTranslations('imageOptimizer');




  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getImageList = useCallback(debounce((pageLink:number,searchKeyword='') => {
    Api('imageOptimizer/getImageList', { filter_type: filter, page_link: pageLink, search_keyword: searchKeyword, limit: limit }).then((data) => {
      setImageList({ data: data.data, loading: false })
      setTotal(data.totalProductCount)
      setQuota({ used: data.totalUsedImage, limit: data.optimizeLimit, optimizedImage: data.optimizedImage, inProgressImage: data.inprogressImage, restoredImage: data.restoredImage })
    })
  }, 3000), [limit, filter]);



  useEffect(() => {
    setCurrentPage(1)
    getImageList(1,searchKeyword)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, filter, searchKeyword])


  const updateAltText = () => {
    setUpdateAltTextBtnLoading(true)
    Api('imageOptimizer/updateAltText', { alt_data: JSON.stringify(Object.values(updatedAltText)) }).then((data) => {
      setUpdateAltTextBtnLoading(false)
      toast.success(translate('yourChangesSaved'))
    })
  }

  const handleMasterOptimize = () => {
    if (allProductButton == true) {
      setOptimizeConfirmModalShow(true)
    } else {
      const checkedImageArray = Object.values(checkedImage)
      const filterArray = checkedImageArray.filter((item: any) => item.is_optimize == 0)
      if (filterArray.length == 0) {
        toast.error(translate('pleaseSelectImages'))
      } else {
        setMasterCheckbox(false)
        setMasterButtonLoading(true)
        Api('imageOptimizer/checkboxImageOptimize', { bulk_img_data: JSON.stringify(Object.values(checkedImage)) }).then((data: any) => {
          setMasterButtonLoading(false)
          setImageList({ data: [], loading: true })
          getImageList(currentPage)
          if (data.status_code == 200) {
            toast.success(translate1('queuedForOptimizationSuccessMessage'))
          }
          if (data.status_code == 202) {
            router.push('/image-optimizer-setting')
          }
          if (data.status_code == 204 || data.status_code == 203) {
            toast.error(data.message)
          }
        })
      }
    }

  }

  const handleMasterRestore = () => {
    if (allProductButton == true) {
      setRestoreConfirmModalShow(true)
    } else {
      const checkedImageArray = Object.values(checkedImage)
      const filterArray = checkedImageArray.filter((item: any) => item.is_optimize == 1)
      if (filterArray.length == 0) {
        toast.error(translate('pleaseSelectImages'))
      } else {
        setMasterCheckbox(false)
        setMasterButtonLoading(true)
        Api('imageOptimizer/checkboxRestoreImage', { bulk_img_data: JSON.stringify(Object.values(checkedImage)) }).then((data: any) => {
          setMasterButtonLoading(false)
          setImageList({ data: [], loading: true })
          getImageList(currentPage)
          if (data.status_code == 200) {
            toast.success(translate1('queuedForRestoreSuccessMessage'))
          }
          if (data.status_code == 202) {
            router.push('/image-optimizer-setting')
          }
          if (data.status_code == 204 || data.status_code == 203) {
            toast.error(data.message)
          }
        })
      }
    }

  }

  const BulkImageOptimize = () => {
    setAllProductButton(false)
    setMasterCheckbox(false)
    setMasterButtonLoading(true)
    Api('imageOptimizer/BulkImageOptimize').then((data) => {
      setMasterButtonLoading(false)
      if (data.status_code == 200) {
        toast.success(translate1('queuedForOptimizationSuccessMessage'))
      }
      if (data.status_code == 202) {
        router.push('/image-optimizer-setting')
      }
      if (data.status_code == 204 || data.status_code == 203) {
        toast.error(data.message)
      }
    })
  }

  const RestoreBulkOptimizeImage = () => {
    setAllProductButton(false)
    setMasterCheckbox(false)
    setMasterButtonLoading(true)
    Api('imageOptimizer/RestoreBulkOptimizeImage').then((data) => {
      setMasterButtonLoading(false)
      if (data.status_code == 200) {
        toast.success(translate1('queuedForRestoreSuccessMessage'))
      }
      if (data.status_code == 202) {
        router.push('/image-optimizer-setting')
      }
      if (data.status_code == 204 || data.status_code == 203) {
        toast.error(data.message)
      }
    })
  }

  const getImgJobStatus = ()=>{
    setJobStatusLoad(true)
    Api('imageOptimizer/getImgJobStatus').then(({data})=>{
      setJobStatusLoad(false)
      setJobStatus(!!data.isJobRunning)
    })
  }

  useEffect(()=>{
    getImgJobStatus()
  },[])

  return (<>
    <ConfirmModal show={optimizeConfirmModalShow} handleClose={() => setOptimizeConfirmModalShow(false)}
      message={<><p>{translate2('confirmModalPragraph1')}</p>
        <p>{translate2('confirmModalPragraph2')}</p></>}
      handleYes={() => {
        BulkImageOptimize()
        setOptimizeConfirmModalShow(false)
      }}
      handleNo={() => setOptimizeConfirmModalShow(false)}
    />


    <ConfirmModal show={restoreConfirmModalShow} handleClose={() => setRestoreConfirmModalShow(false)}
      message={<><p>{translate2('confirmModalPragraph3')}</p>
        <p>{translate2('confirmModalPragraph4')}</p></>}
      handleYes={() => {
        RestoreBulkOptimizeImage()
        setRestoreConfirmModalShow(false)
      }}
      handleNo={() => setRestoreConfirmModalShow(false)}
    />
    <div className="content-frame-main">
      <div className="content-frame-head flex justify-content-between align-item-center gap-2">
      <div className="content-frameHead-left flex align-item-center gap-2">
          <h1 className="Text--headingLg flex align-item-center gap-2 mb-0">
            {translate('imageOptimizer')}
            <Howitwork page='imageoptimizer' />            
          </h1>
          <ChannelList />
        </div>

        <div className="content-frameHead-right imageOptimizer-headRight">
          <div className="badge badge-success"> {translate('quotaUsed')}: {quota.used} /{quota.limit}</div>
          
          <div className="d-flex align-item-center gap-2">
          {jobStatusLoad ? <Spinner size='sm'/> :           
            <div className={`badge badge-${jobStatus ? 'warning' : 'success'}`}>{jobStatus ? translate2('imageOptimizationRunning') : translate('noPendingQueue')}</div>}
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>
                {translate('optimized')}: {quota.optimizedImage}<br />
                {translate('inProgress')}: {quota.inProgressImage}<br />
                {translate('restored')}: {quota.restoredImage}
              </Tooltip>}
            >
              <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
            </OverlayTrigger> 
            </div>         
          <Upgrade />
          <Hamburger />
        </div>
      </div>

      <div className="image-optimizerMain">
        <div className="card">
          <div className="d-flex justify-content-between gap-2 image-optimizerFilter">
            <div className="d-flex align-item-center gap-3 image-optimizerFilter-left">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={masterCheckbox} onChange={() => setMasterCheckbox(!masterCheckbox)} />
              </div>
              {masterButtonLoading ? <Spinner size='sm' /> :
                <>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{translate('optimize')}</Tooltip>}>
                    <button type="button" className={`custom-btn black-iconBtn ${Object.keys(checkedImage).length == 0 ? 'btn-disable' : ''}`} onClick={handleMasterOptimize}>
                      <Image src={`${basePath}/images/optimize-icon.svg`} width={21} height={21} alt='' />
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{translate('restore')}</Tooltip>}>
                    <button type="button" className={`custom-btn black-iconBtn ${Object.keys(checkedImage).length == 0 ? 'btn-disable' : ''}`} onClick={handleMasterRestore}>
                      <Image src={`${basePath}/images/restore-icon.svg`} width={21} height={21} alt='' />
                    </button>
                  </OverlayTrigger>
                </>}


              <div className="custom-dropi without-labelDropi">
                <select className="form-select" aria-label="Default select example" value={filter} onChange={(e) => {
                  setImageList({ data: [], loading: true })
                  setFilter(e.target.value)
                }}>
                  <option value='all'>{translate2('showAllImages')}</option>
                  <option value='optimize'>{translate2('showOptimizedImages')}</option>
                  <option value='unoptimize'>{translate2('showUnoptimizedImages')}</option>
                </select>
              </div>
            </div>

            <div className="d-flex align-item-center gap-3 image-optimizerFilter-right">
              <div className="custom-input icon-input without-labelInput">
                <i className="input-icon"><Image src={`${basePath}/images/search-icon.svg`} width={20} height={20} alt='' /></i>
                <input type="text" placeholder="Search" className="form-control" value={searchKeyword} onChange={(e) => {
                  setImageList({ data: [], loading: true })
                  setSearchKeyword(e.target.value)
                }} />
              </div>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{translate('setting')}</Tooltip>}>
                <Link href='/image-optimizer-setting'>
                  <button type="button" className="custom-btn black-iconBtn">
                    <Image src={`${basePath}/images/setting-icon.svg`} width={20} height={21} alt='' />
                  </button>
                </Link>

              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{translate('refresh')}</Tooltip>}>
                <button type="button" className="custom-btn black-iconBtn" onClick={() => {
                  setImageList({ data: [], loading: true })
                  getImageList(currentPage)
                }}>
                  <Image src={`${basePath}/images/refresh-icon.svg`} width={20} height={21} alt='' />
                </button>
              </OverlayTrigger>



              <button type="button" className="custom-btn whitespace-nowrap" onClick={updateAltText} disabled={updateAltTextBtnLoading}>
                {updateAltTextBtnLoading ? <Spinner size='sm' /> : 'Save Alt Text'}
              </button>
            </div>
          </div>

          {masterCheckbox &&
            <div className="AllSelected-box">
              {allProductButton == false &&
                <div className="AllSelected-inner">{limit} {translate2('productsOnPageSelected')} <button type="button" className="plain-btn" onClick={() => {
                  setAllProductButton(true)
                }}>{translate('selectAll')} {total} {translate('products')}</button></div>}
              {allProductButton &&
                <div className="AllSelected-inner">{total} {translate('productsSelected')} <button type="button" className="plain-btn" onClick={() => {
                  setAllProductButton(false)
                  setMasterCheckbox(false)
                }}>{translate('clearSelection')}</button></div>}
            </div>
          }


          <div className="optimizerList-area">
            {imageList.loading ? <div className='text-center'><Spinner /></div> :
              <>
                {imageList.data.map((product: any, key) => (
                  <div className={product.length > 1 ? 'groupLink-box' : ''} key={key}>
                    <div className={product.length > 1 ? 'groupLink-inner' : ''}>
                      {product.map((image: any, key: any) => (
                        <Singleimage
                          key={key}
                          componentKey={componentKey++}
                          image={image}
                          checkbox={masterCheckbox}
                          setUpdatedAltText={(newObj: any, componentKey: any) => {
                            setUpdatedAltText((updatedAltText: any) => ({ ...updatedAltText, [componentKey]: newObj }))
                          }}
                          setCheckedImage={(checked: any, newObj: any, componentKey: any) => {
                            if (checked == true) {
                              setCheckedImage((checkedImage: any) => ({ ...checkedImage, [componentKey]: newObj }))
                            } else {
                              setCheckedImage((checkedImage: any) => {
                                const updatedImage = { ...checkedImage }
                                delete updatedImage[componentKey]
                                return updatedImage
                              })
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            }




            <Pagination total={total} limit={limit} limitOptions={[5, 10, 20]} prev={true} next={true} first={true} last={true}
              layout={['limit', 'pager', 'skip', '-']}
              maxButtons={4}
              ellipsis={true}
              boundaryLinks={true}
              activePage={currentPage}
              onChangePage={(page) => {
                setImageList({ data: [], loading: true })
                setCurrentPage(page)
                getImageList(page)
              }}
              onChangeLimit={(limit) => {
                setImageList({ data: [], loading: true })
                setLimit(limit)
              }}
            />
          </div>
        </div>
      </div>
    </div >
  </>)
} 