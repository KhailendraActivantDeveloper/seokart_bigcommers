// import { basePath } from "@/next.config"
import Image from "next/image"
import { useEffect, useState } from "react"
import { OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { Api } from "@/app/_api/apiCall"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Previewmodal from '@/app/(bigcommerce)/image-optimizer/_components/previewModal'
import { useTranslations } from '@/translator'
const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home({ image, setPrimaryImageAltText,setUpdateImageData,componentKey }: { image: any, setPrimaryImageAltText: any,setUpdateImageData:any,componentKey:any }) {
  const router = useRouter()
  const [altText, setAltText] = useState(image.description)
  const [optimizeStatus, setOptimizeStatus] = useState(image.is_optimize)
  const [previewModal, setPreviewModal] = useState(false)
  const [checked,setChecked] = useState(false)
	const translate = useTranslations('common');
	const translate1 = useTranslations('seoAudit');

  useEffect(() => {
    if(image.is_thumbnail)
      setPrimaryImageAltText(altText)
    setUpdateImageData(componentKey,altText)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altText])

  const imageOptimize = () => {
    setOptimizeStatus(5)
    Api('imageOptimizer/imageOptimize',
      {
        img_alt: altText,
        old_alt_text: image.description,
        img_name: image.image_file.split('/').pop(),
        real_image: image.image_file,
        product_id: image.product_id,
        image_id: image.id,
        is_thumbnail: image.is_thumbnail,
        sort_order: image.sort_order
      }).then((data) => {
        if (data.status_code == 202) {
          router.push('/image-optimizer-setting')
        }
        if (data.status_code == 200) {
          setOptimizeStatus(2)
          toast.success(translate1('queuedForOptimizationSuccessMessage'))
        }
        if (data.status_code == 204 || data.status_code == 203) {
          setOptimizeStatus(0)
          toast.error(data.message)
        }
      })
  }

  const RestoreOptimizeImage = () => {
    setOptimizeStatus(5)
    Api('imageOptimizer/RestoreOptimizeImage', { product_id: image.product_id, image_id: image.id }).then((data) => {
      if (data.status_code == 204 || data.status_code == 203) {
        setOptimizeStatus(1)
        toast.error(data.message)
      }
      if (data.status_code == 200) {
        setOptimizeStatus(3)
        toast.success(translate1('queuedForRestoreSuccessMessage'))
      }

    })
  }



  return (<>
    <Previewmodal show={previewModal} onHide={() => setPreviewModal(false)} image={image} RestoreOptimizeImage={RestoreOptimizeImage} />
    <div className="d-flex align-item-center gap-3 optimizerList-box">
      <div className={`optimizerProduct-img ${checked ? 'check_active':''}`}>
        {image.is_thumbnail &&
          <span className="optimizer-favourite">
            <Image src={`${basePath}/images/star-icon.svg`} width={16} height={16} alt="" />
          </span>}
        <Image src={image.url_thumbnail} width={38} height={38} alt="" />
        <div className="optimizerProduct-imgHover">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={checked} onChange={()=>setChecked(!checked)} />
          </div>
        </div>
      </div>

      <div className="optimizerProduct-imgfeild flex-grow-1 d-flex align-item-center gap-3">
        <div className="custom-input link-iconDropi flex-grow-1">
          <span>
            {translate('fileName')}
            <a href="" target="_blank"><Image src={`${basePath}/images/link-icon.svg`} width={16} height={16} alt="" /></a>
          </span>
          <input type="text" placeholder={translate('fileName')} className="form-control" value={image.image_file.split('/').pop()} disabled />
        </div>

        <div className="custom-input flex-grow-1">
          <span>{translate('altText')}</span>
          <input type="text" placeholder={translate('altText')} className="form-control" value={altText} onChange={(e) => setAltText(e.target.value)} />
        </div>
      </div>

      <div className="optimizerProduct-actionInfo d-flex align-item-center gap-3">
        <span>{image.image_size}</span>
        {optimizeStatus == 5 ?
          <>
            <button type="button" className="imageOptimize-btn btn btn-default btn-disable"><Spinner size="sm" /></button>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{translate('restore')}</Tooltip>}>
              <button type="button" className="custom-btn black-iconBtn btn-disable">
                <Spinner size="sm" />
              </button>
            </OverlayTrigger>
          </> :
          optimizeStatus == 1 ?
            <>
              <button type="button" className="imageOptimize-btn custom-btn" onClick={() => setPreviewModal(true)}>{translate('preview')}</button>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{translate('restore')}</Tooltip>}>
                <button type="button" className="custom-btn black-iconBtn" onClick={RestoreOptimizeImage}>
                  <Image src={`${basePath}/images/restore-icon.svg`} width={20} height={20} alt="" />
                </button>
              </OverlayTrigger>
            </> :
            optimizeStatus == 2 ?
              <>
                <button type="button" className="imageOptimize-btn btn btn-default btn-disable">{translate('optimizing')}</button>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{translate('restore')}</Tooltip>}>
                  <button type="button" className="custom-btn black-iconBtn btn-disable">
                    <Image src={`${basePath}/images/restore-icon.svg`} width={20} height={20} alt="" />
                  </button>
                </OverlayTrigger>
              </> :
              optimizeStatus == 3 ?
                <>
                  <button type="button" className="imageOptimize-btn btn btn-default btn-disable">{translate('restoring')}</button>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{translate('restore')}</Tooltip>}>
                    <button type="button" className="custom-btn black-iconBtn btn-disable">
                      <Image src={`${basePath}/images/restore-icon.svg`} width={20} height={20} alt="" />
                    </button>
                  </OverlayTrigger>
                </> :
                <>
                  <button type="button" className="btn btn-default" onClick={imageOptimize}>{translate('optimize')}</button>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{translate('restore')}</Tooltip>}>
                    <button type="button" className="custom-btn black-iconBtn btn-disable" >
                      <Image src={`${basePath}/images/restore-icon.svg`} width={20} height={20} alt="" />
                    </button>
                  </OverlayTrigger>
                </>}
      </div>
    </div>
  </>)
}