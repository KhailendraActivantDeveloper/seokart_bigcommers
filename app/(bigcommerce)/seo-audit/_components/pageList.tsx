import { Api } from "@/app/_api/apiCall"
// import { basePath } from "@/next.config";
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { Pagination } from 'rsuite';
import Image from "next/image"
import SingleItem from './singleItem'
import { useTranslations } from '@/translator'
const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home() {
	const translate = useTranslations('common');
	const translate1 = useTranslations('seoAudit');

  const [itemType, setItemType] = useState(localStorage.getItem('itemType') ?? 'all')
  const [sort, setSort] = useState(localStorage.getItem('sort') ?? 'atoz')
  const [emptyType, setEmptyType] = useState(localStorage.getItem('emptyType') ?? 'all')
  const [searchKeyword, setSearchKeyword] = useState(localStorage.getItem('searchKeyword') ?? '')
  const [itemList, setItemList] = useState({ data: [], loading: true, total: 0 })
  const [currentPage, setCurrentPage] = useState<any>(localStorage.getItem('currentPage') ?? 1)
  const [limit, setLimit] = useState<any>(localStorage.getItem('limit') ?? 10)

  const getSeoAuditPageData = () => {
    setItemList({ data: [], loading: true, total: 0 })
    Api('getSeoAuditPageData', {
      item_type: itemType,
      sort: sort,
      empty_type: emptyType,
      search_key: searchKeyword,
      page: currentPage,
      limit: limit
    }).then((data) => {
      setItemList({ data: data.data, loading: false, total: data.total_page_count })
    })
  }
  useEffect(() => {
    getSeoAuditPageData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, emptyType, searchKeyword, currentPage, itemType, limit])

  useEffect(() => {
    localStorage.setItem('itemType', itemType)
  }, [itemType])

  useEffect(() => {
    localStorage.setItem('sort', sort)
  }, [sort])

  useEffect(() => {
    localStorage.setItem('emptyType', emptyType)
  }, [emptyType])

  useEffect(() => {
    localStorage.setItem('searchKeyword', searchKeyword)
  }, [searchKeyword])

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage)
  }, [currentPage])

  useEffect(() => {
    localStorage.setItem('limit', limit)
  }, [limit])
  return (<>
    <div className="PageSpeed-URL-Area">
      <div className="d-flex justify-content-between seo-optimierPage-head">
        <div className="d-flex align-item-center gap-3 seo-optimierPage-left">
          <div className="custom-dropi without-labelDropi">
            <select className="form-select" value={itemType} onChange={(e) => {
              setItemType(e.target.value)
              setCurrentPage(1)
            }} aria-label="Default select example">
              <option value="all">{translate('all')}</option>
              <option value="home">{translate('home')}</option>
              <option value="product">{translate('products')}</option>
              <option value="category">{translate('categories')}</option>
              <option value="brand">{translate('brands')}</option>
              <option value="page">{translate('pages')}</option>
              <option value="blog">{translate('blogs')}</option>
            </select>
          </div>

          <div className="custom-dropi without-labelDropi">
            <select className="form-select" value={sort} onChange={(e) => {
              setSort(e.target.value)
              setCurrentPage(1)
            }} aria-label="Default select example">
              <option value="atoz">{translate1('atoz')}</option>
              <option value="ztoa">{translate1('ztoa')}</option>
              <option value="lth">{translate1('lth')}</option>
              <option value="htl">{translate1('htl')}</option>
              <option value="latest">{translate1('latest')}</option>
            </select>
          </div>

          <div className="custom-dropi without-labelDropi">
            <select className="form-select" value={emptyType} onChange={(e) => {
              setEmptyType(e.target.value)
              setCurrentPage(1)
            }} aria-label="Default select example">
              <option value="all">{translate('selectAll')}</option>
              <option value="meta_title">{translate1('blankTitleTag')}</option>
              <option value="meta_desc">{translate1('blankMetaDescription')}</option>
            </select>
          </div>
        </div>

        <div className="d-flex align-item-center gap-3 seo-optimierPage-right">
          <div className="custom-input icon-input without-labelInput">
            <i className="input-icon"><Image src={`${basePath}/images/search-icon.svg`} width={20} height={20} alt='' /></i>


            <input type="text" placeholder={translate('searchByName')} className="form-control" value={searchKeyword} onChange={(e) => { setSearchKeyword(e.target.value) }} />
          </div>
        </div>
      </div>

      <div className="custom-table mt-20">

        <table className="table">
          <thead>
            <tr>
              <th>{translate('name')}</th>
              <th>{translate('type')}</th>
              <th>{translate('meta')}</th>
              <th>{translate('content')}</th>
              <th>{translate('image')}</th>
              <th>{translate('broken')}</th>
              <th>{translate('url')}</th>
              <th className="text-align-right">{translate('seoScore')}</th>
              <th>{translate('action')}</th>
            </tr>
          </thead>
          <tbody>
            {itemList.loading ?
              <tr><td colSpan={5}><Spinner /></td></tr> :
              itemList.data.map((item: any, key: any) => (
                <SingleItem key={key} item={item}/>
              ))}

          </tbody>
        </table>

      </div>

    </div>
    <div className="mt-3">
      <Pagination total={itemList.total} limit={Number(limit)} limitOptions={[5, 10, 20]} prev={true} next={true} first={true} last={true}
        layout={['limit', 'pager', 'skip', '-']}
        maxButtons={4}
        ellipsis={true}
        boundaryLinks={true}
        activePage={Number(currentPage)}
        onChangePage={(page) => {
          setCurrentPage(page)
        }}
        onChangeLimit={(limit) => {
          setLimit(limit)
        }}
      />
    </div>

  </>)
}
