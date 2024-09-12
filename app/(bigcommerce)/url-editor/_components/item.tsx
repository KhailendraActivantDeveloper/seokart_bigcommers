import { Api } from "@/app/_api/apiCall"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { Pagination } from 'rsuite'

const Singleitem = dynamic(() => import('./singleItem'), { ssr: false })

export default function Home() {
  const [platform, setPlatform] = useState('bigcommerce')
  const [itemType, setItemType] = useState('product')
  const [items, setItems] = useState({ data: [], loading: true })
  const [total, setTotal] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const translate = useTranslations('common');
  const translate1 = useTranslations('richSnippets');

  const getItemUrlEditorList = () => {
    setItems({ data: [], loading: true })
    return Api('urlEditor/getItemUrlEditorList', {
      item_type: itemType,
      page_link: currentPage,
      search_keyword: searchKeyword,
      limit: limit
    }).then(({ data }) => {
      setItems({ data: data.list, loading: false })
      setTotal(data.link)
    })
  }



  useEffect(() => {
    getItemUrlEditorList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, currentPage, searchKeyword, itemType])


  useEffect(() => {
    const channelObj = JSON.parse(localStorage.getItem('channel') ?? '')
    setPlatform(channelObj.platform)
  }, [])
  return (<>
    {platform == 'bigcommerce' ?
      <div className="image-optimizerMain">
        <div className="card">
          <div className="d-flex justify-content-between page-filter">
            <div className="d-flex align-item-center gap-3 seo-optimierPage-left">
              <div className="custom-dropi without-labelDropi">
                <select value={itemType} className="form-select" onChange={(e) => {
                  setItemType(e.target.value)
                  setItems({ data: [], loading: true })
                }}>
                  <option value='product'>{translate('products')}</option>
                  <option value='category'>{translate('category')}</option>
                  <option value='brand'>{translate('brand')}</option>
                  <option value='page'>{translate('pages')}</option>
                  <option value='blog'>{translate('blogs')}</option>
                </select>
              </div>
            </div>

            <div className="d-flex align-item-center gap-3 seo-optimierPage-right">
              <div className="custom-input icon-input without-labelInput">
                <i className="input-icon"><img src="images/search-icon.svg" alt="" /></i>
                <input type="text" placeholder="Search" className="form-control" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="optimizerList-area">

            {items.loading ? <div className='text-center'><Spinner /></div> : items.data.map((item, key) => (
              <Singleitem item={item} key={key} itemType={itemType} refresh={getItemUrlEditorList}/>
            ))}
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
      </div> :
      <>
        <div className="richSnippets-Area">
          <div className="richSnippets-consoleArea">
            <h3>{translate1('richSnippetsPragraph27')}</h3>
          </div>
        </div>
      </>
    }
  </>)
}