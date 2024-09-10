import DataTable from 'react-data-table-component';
import { useEffect, useRef, useState, memo } from 'react'
import { Api } from '@/app/_api/apiCall'
import { Spinner } from 'react-bootstrap';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
// import { basePath } from '@/next.config';

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''



function Home() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterText, setFilterText] = useState('')
  const [queueStatus, setQueueStatus] = useState({ loading: true, message: '' })
  const translate = useTranslations('common');


  const getBulkOptimizerHistory = () => {
    Api('bulkOptimizer/getBulkOptimizerHistory').then(({ data }) => {
      setData(data)
      setLoading(false)
    })
  }

  const getQueueStatus = () => {
    setQueueStatus({ loading: true, message: '' })
    Api('bulkOptimizer/getQueueStatus').then((data) => {
      getBulkOptimizerHistory()
      setQueueStatus({ loading: false, message: data.message })
    })
  }

  useEffect(() => {
    getBulkOptimizerHistory()
    getQueueStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (filterText.length > 0)
      setFilterData(data.filter((item: any) => (item.item_type.toLowerCase().includes(filterText.toLowerCase())) || (item.update_type.toLowerCase().includes(filterText.toLowerCase()))))
    else
      setFilterData([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText])

  const columns = [
    {
      name: translate('createdDate'),
      selector: (row: any) => row.date,
      maxWidth: '12%'
    },
    {
      name: translate('completedDate'),
      selector: (row: any) => row.complete_date,
      maxWidth: '12%'
    },
    {
      name: translate('itemType'),
      selector: (row: any) => row.item_type,
      maxWidth: '10%'
    },
    {
      name: translate('updateType'),
      selector: (row: any) => row.update_type,
      maxWidth: '10%'
    },
    {
      name: translate('templateType'),
      selector: (row: any) => row.template_type,
      maxWidth: '10%'
    },
    {
      name: translate('totalItems'),
      selector: (row: any) => row.total_items,
      maxWidth: '5%'
    },
    {
      name: translate('updatedItems'),
      selector: (row: any) => row.update_items,
      maxWidth: '5%'
    },
    {
      name: translate('templateValue'),
      selector: (row: any) => row.template_value
    },
    {
      name: translate('status'),
      selector: (row: any) => row.status,
      format: (row: any) => { return (<span className={`badge badge-${row.status == 1 ? 'success' : 'danger'}`}>{row.status == 1 ? translate('completed') : translate('pending')}</span>) },
      maxWidth: '5%',
      right: true
    },
  ];



  return (<>
    {loading ? <Spinner animation='grow' /> :
      <>
        <div className='customTable-head d-flex align-item-center justify-content-between mb-22 page-filter'>
          <h2 className="Text--headingLg mb-0 seo-optimierPage-left tab-fullWidth tab-textLeft">{translate('bulkOptimizerHistory')}</h2>
          <div className='d-flex align-item-center gap-3 seo-optimierPage-right tab-fullWidth tab-textLeft bulk-optimizeHistory-right'>
            <div className="bulk-optimizerTab--headRight d-flex gap-3 align-item-center">
              {queueStatus.loading ? <Spinner size='sm'/> :
                <>
                  <p className='whitespace-nowrap mb-0'>{queueStatus.message}</p>
                  <button type="button" className="custom-btn black-iconBtn" onClick={getQueueStatus}>
                    <Image src={`${basePath}/images/refresh-icon.svg`} alt="" width={20} height={21} />
                  </button>
                </>
              }
            </div>

            <div className='custom-input icon-input'>
              {(filterData.length > 0 || data.length > 0) &&
                <>
                  <i className="input-icon"><Image src={`${basePath}/images/search-icon.svg`} alt="" width={20} height={21} /></i>
                  <input type='text'
                    className='form-control'
                    placeholder={translate('itemTypeUpdateType')}
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </>
              }
            </div>
          </div>
        </div>
        <div className='custom-table'>
          <DataTable
            columns={columns}
            data={filterText.length > 0 ? filterData : data}
            pagination
          />
        </div>
      </>}
  </>)
}

export default memo(Home)