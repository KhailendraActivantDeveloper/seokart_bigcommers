import { Api } from '@/app/_api/apiCall'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
// import { basePath } from '@/next.config'

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home(Props: any) {
  const [item, setItem] = useState<any>({ data: [], loading: true })
  const [pageInfo, setPageInfo] = useState(1)
  const [filter, setFilter] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const selectedItem = new Map();
  const translate = useTranslations('common');



  const getCustomItemList = useCallback(() => {
    Api('bulkOptimizer/getCustomItemList', { item_type: Props.itemType, filter_type: filter, search_keyword: searchKeyword, page_info: pageInfo }).then(({ data }) => {
      setItem((item: any) => ({ data: [...item.data, ...data], loading: false }))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo, filter, searchKeyword])




  useEffect(() => {
    getCustomItemList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo, filter, searchKeyword])


  return (<>
    <Modal show={Props.show} onHide={Props.handleClose} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title><h1>{translate('updateCustom')}</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="keyword-suggestionModal">
          <div className="custom-searchIcon d-flex gap-3">
            <div className="custom-input flex-grow-1">
              <span>{translate('name')}</span>
              <input type="text" placeholder={translate('enterName')} className="form-control pr-50" value={searchKeyword} onChange={
                (e) => {
                  setPageInfo(1)
                  setItem({ data: [], loading: true })
                  setSearchKeyword(e.target.value)
                }
              } />

              <button type="button" className="competitor-clearBtn"><img src="images/search-icon.svg" alt="" /></button>
            </div>

            <div className="custom-dropi flex-grow-1">
              <span>{translate('filter')}</span>
              <select className="form-select" aria-label="Default select example" value={filter} onChange={(e) => {
                setPageInfo(1)
                setItem({ data: [], loading: true })
                setFilter(e.target.value)
              }}>
                <option value='all'>{translate('all')}</option>
                <option value='empty_title_tag'>{translate('emptyTitleTag')}</option>
                <option value='empty_meta_desc'>{translate('emptyMetaDescription')}</option>
                {Props.itemType == 'product' &&
                  <option value='empty_alt_text'>{translate('emptyAltTexts')}</option>}
              </select>
            </div>
          </div>

          <div className="customUpdate-listArea mt-22" onScroll={(e: any) => {
            if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
              setPageInfo((pageInfo) => pageInfo + 1)
            }
          }}>
            {item.loading ? <div className='text-center'><Spinner /></div> : (item.data.length == 0) ?
              <div className="custom-listBox">
                <div className="form-check d-flex align-item-center gap-2">
                  <p className="mb-0">{translate('noItemFound')}</p>
                </div>
              </div>
              : item.data.map((item: any, key: any) => (
                <div className="custom-listBox" key={key}>
                  <div className="form-check d-flex align-item-center gap-2">
                    <input className="form-check-input" type="checkbox" onChange={(e) => {
                      if (e.target.checked) {
                        selectedItem.set(key, item.item_id)
                      } else {
                        selectedItem.delete(key)
                      }
                    }} />
                    <label className="form-check-label d-flex align-item-center gap-3" >
                      <div className="optimizerProduct-img">
                        {item.itemImg ?
                          <Image src={`https://store-${localStorage.getItem('shop')}.mybigcommerce.com/product_images/${item.itemImg}`} alt='' width={20} height={20} />
                          :
                          <Image src={`${basePath}/images/ProductDefault.gif`} alt='' width={20} height={20} />
                        }
                      </div>
                      <p className="mb-0">{item.item_name}</p>
                    </label>
                  </div>
                </div>
              ))}
          </div>

          <div className="full-btn">
            <button type="button" className="custom-btn" onClick={()=>{
              if(selectedItem.size!=0)
                Props.setBulkQueue(Array.from(selectedItem.values()))
            }}>{translate('submit')}</button>
          </div>
        </div>
      </Modal.Body>

    </Modal>
  </>)
}