'use client'

import { Api } from "@/app/_api/apiCall"
import { useTranslations } from '@/translator'
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { Pagination } from 'rsuite'
const Channel = dynamic(() => import('@/app/_components/channelList'), { ssr: false })
const Howitwork = dynamic(() => import('@/app/_howitwork/modal'), { ssr: false })
const Upgrade = dynamic(() => import('@/app/_components/upgradeButton'), { ssr: false })
const Single = dynamic(() => import('./_components/single'), { ssr: false })


export default function Home() {
  const [type, setType] = useState('fixed')
  const [items, setItems] = useState({ data: [], loading: true })
  const [total, setTotal] = useState(1)
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const translate = useTranslations('common');
  const translate1 = useTranslations('NotFoundFixer');

  const getInternalLinkList = () => {
    setItems({ data: [], loading: true })
    Api('404Fixer/getInternalLinkList', { filter_type: type, page: currentPage,limit:limit }).then((data) => {
      setItems({ data: data.data, loading: false })
      setTotal(data.total_page_count)
    })
  }

  useEffect(() => {
    getInternalLinkList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit,currentPage,type])

  return (<>
    <div className="content-frame-main">
      <div className="content-frame-head flex justify-content-between align-item-center">
        <div className="content-frameHead-left flex align-item-center gap-2">
          <h1 className="Text--headingLg flex align-item-center gap-2 mb-0">
            {translate1('404Fixer')}
            <Howitwork page='404fixer' />
          </h1>          
          <Channel />
        </div>
        <div className="content-frameHead-right">
          <Upgrade />
        </div>
      </div>

      <div className="image-optimizerMain">
        <div className="card">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-item-center gap-3">
              <div className="custom-dropi without-labelDropi">
                <select value={type} onChange={(e) => setType(e.target.value)} className="form-select" aria-label="Default select example">
                  <option value='all'>{translate1('errorsAll')}</option>
                  <option value='fixed'>{translate1('errorsFixed')}</option>
                  <option value='not_fixed'>{translate1('errorsNotFixed')}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="optimizerList-area">
            {items.loading ? <div className='text-center'><Spinner /></div> :
              items.data.map((item, key) => (
                <Single item={item} key={key} />
              ))
            }
            <Pagination total={total} limit={limit} limitOptions={[5, 10, 20]} prev={true} next={true} first={true} last={true}
              layout={['limit', 'pager', 'skip', '-']}
              maxButtons={4}
              ellipsis={true}
              boundaryLinks={true}
              activePage={currentPage}
              onChangePage={(page) => {
                setCurrentPage(page)
              }}
              onChangeLimit={(limit) => {
                setLimit(limit)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </>)
}