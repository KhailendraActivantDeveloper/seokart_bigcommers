import { Api } from '@/app/_api/apiCall';
// import { basePath } from '@/next.config';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Progress } from 'rsuite';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home(Props:any) {
  const translate = useTranslations('common');
  const [count, setCount] = useState<any>({ data: {}, loading: true })

  const getSeoAuditCount = (refresh: number) => {
    Api('getSeoAuditCount', { refresh: refresh }).then(({ data }: any) => {
      setCount({ data: data, loading: false })
      if(data.totalAuditCount==data.totalLiveCount){
        Props.setSyncStatus(Number(data.re_audit_status))
      }else{
        Props.setSyncStatus(2)
      }
      
    })
  }

  useEffect(() => {
    getSeoAuditCount(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
    <div className="d-flex gap-24 flex-direction-column991">
      <div className="card mb-0-991">
        <div className="d-flex align-item-center gap-3">
          <div className="optimizer-logo">
            <Image src={`${basePath}/images/seokart-logo-icon.svg`} alt='' width="70" height="70"/>
          </div>

          {count.loading ? <Spinner size='sm' /> :
            <div className="optimizer-auditInfo">
              <div className="d-flex align-items-baseline">
                <h2 className="Text--heading2xl mb-0 green-text">{count.data.totalAuditCount}</h2>
                <span>/{count.data.totalLiveCount}</span>
              </div>
              <h2 className="Text--headingLg mb-0">{translate('pagesAudited')}</h2>
              <div className="audit-progress">
                <Progress.Line percent={(count.data.totalAuditCount/count.data.totalLiveCount)*100} showInfo={false} />
              </div>
            </div>}
        </div>
      </div>

      <div className="card flex-grow-1">
        <div className="d-flex text-align-center pages-optimizersResults">
          <div className="optimizer-auditInfo2 flex-grow-1">
            {count.loading ? <Spinner size='sm' /> :
              <div className="d-flex align-items-baseline justify-content-center mb-2">
                <h2 className="Text--heading2xl mb-0 green-text">{count.data.individual_db_count.product}</h2>
                <span>/{count.data.individual_live_count.product}</span>
              </div>}
            <h2 className="Text--headingMd text-subbed mb-0">{translate('products')}</h2>
          </div>

          <div className="optimizer-auditInfo2 flex-grow-1">
            {count.loading ? <Spinner size='sm' /> :
              <div className="d-flex align-items-baseline justify-content-center mb-2">
                <h2 className="Text--heading2xl mb-0 green-text">{count.data.individual_db_count.category}</h2>
                <span>/{count.data.individual_live_count.category}</span>
              </div>}
            <h2 className="Text--headingMd text-subbed mb-0">{translate('category')}</h2>
          </div>

          <div className="optimizer-auditInfo2 flex-grow-1">
            {count.loading ? <Spinner size='sm' /> :
              <div className="d-flex align-items-baseline justify-content-center mb-2">
                <h2 className="Text--heading2xl mb-0 green-text">{count.data.individual_db_count.brand}</h2>
                <span>/{count.data.individual_live_count.brand}</span>
              </div>}
            <h2 className="Text--headingMd text-subbed mb-0">{translate('brand')}</h2>
          </div>

          <div className="optimizer-auditInfo2 flex-grow-1">
          {count.loading ? <Spinner size='sm' /> :
              <div className="d-flex align-items-baseline justify-content-center mb-2">
                <h2 className="Text--heading2xl mb-0 green-text">{count.data.individual_db_count.page}</h2>
                <span>/{count.data.individual_live_count.page}</span>
              </div>}
            <h2 className="Text--headingMd text-subbed mb-0">{translate('pages')}</h2>
          </div>

          <div className="optimizer-auditInfo2 flex-grow-1">
          {count.loading ? <Spinner size='sm' /> :
              <div className="d-flex align-items-baseline justify-content-center mb-2">
                <h2 className="Text--heading2xl mb-0 green-text">{count.data.individual_db_count.blog}</h2>
                <span>/{count.data.individual_live_count.blog}</span>
              </div>}
            <h2 className="Text--headingMd text-subbed mb-0">{translate('blogs')}</h2>
          </div>
        </div>
      </div>
    </div>
  </>)
}