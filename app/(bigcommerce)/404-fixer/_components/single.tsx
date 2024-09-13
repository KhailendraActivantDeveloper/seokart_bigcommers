import Image from "next/image"
// import { basePath } from "@/next.config"
import { useState, useEffect } from "react"
import { Api } from "@/app/_api/apiCall"
import { toast } from "react-toastify"
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useTranslations } from '@/translator'
const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home({ item }: { item: any }) {
  const [redirectUrl, setRedirectUrl] = useState(item[item.length - 1].redirect_url ?? '')
  const [homeUrl, setHomeUrl] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const translate = useTranslations('common');
  const translate1 = useTranslations('NotFoundFixer');

  const updateInternalLink = () => {
    setButtonLoading(true)
    Api('404Fixer/updateInternalLink', {
      current_url: item[0].link,
      redirect_url: redirectUrl
    }).then((data) => {
      setButtonLoading(false)
      toast.success(translate1('errorFixed'))
    })
  }

  const refresh = () => {
    Api('getSingleItemOptimize', { id: item[item.length - 1].seoaudit_id }).then(() => {
      toast.success(translate('pleaseWaitMessage'))
      window.location.reload()
    })
  }

  useEffect(() => {
    const channelObj = JSON.parse(localStorage.getItem('channel') ?? '')
    setHomeUrl(channelObj.domain)
  }, [])

  return (<>
    <div className={item.length > 1 ? 'groupLink-box' : ''}>
      <div className={item.length > 1 ? 'groupLink-inner' : ''}>
        <div className="error-fixerBox">
          {item.map((row: any, key: any) => (
            <div className="optimizerList-box d-flex align-item-center gap-3" key={key}>
              <div className="optimizerProduct-imgfeild flex-grow-1 d-flex align-item-center gap-3">
                <div className="custom-input link-iconDropi flex-grow-1">
                  <span>
                    {translate('brokenURL')}
                    <a href={row.link} target="_blank"><Image src={`${basePath}/images/link-icon.svg`} width={16} height={16} alt="" /></a>
                  </span>
                  <input type="text" className="form-control" value={row.link} disabled />
                </div>

                <div className="custom-input link-iconDropi flex-grow-1">
                  <span>
                    {translate('foundAt')}
                    <a href={`${homeUrl}${row.seoaudit.url}`} target="_blank"><Image src={`${basePath}/images/link-icon.svg`} width={16} height={16} alt="" /></a>
                  </span>
                  <input type="text" className="form-control" value={`${homeUrl}${row.seoaudit.url}`} disabled />
                </div>
              </div>
            </div>
          ))}


          <div className="error-fixedRedirect d-flex align-item-center gap-3">
            <div className="custom-input link-iconDropi flex-grow-1">
              <span>{translate('redirectURL')}</span>
              <input type="text" className="form-control" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} />
            </div>
            <button type="button" className={`btn btn-default ${(redirectUrl.length == 0 || buttonLoading) ? 'btn-disable' : ''}`} onClick={updateInternalLink} disabled={(redirectUrl.length == 0 || buttonLoading)}>{buttonLoading ? <Spinner size="sm" /> : translate('saved')}</button>



            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{translate('refresh')}</Tooltip>}>
              <button type="button" className="custom-btn black-iconBtn" onClick={refresh}>
                <Image src={`${basePath}/images/refresh-icon.svg`} width={16} height={16} alt="" />
              </button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  </>)
}