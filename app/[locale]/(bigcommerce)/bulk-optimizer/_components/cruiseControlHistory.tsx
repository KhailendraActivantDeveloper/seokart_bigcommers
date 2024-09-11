import DataTable from 'react-data-table-component';
import { useEffect, useRef, useState, useMemo } from 'react'
import { Api } from '@/app/_api/apiCall'
import { Spinner } from 'react-bootstrap';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
// import { basePath } from '@/next.config';

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''



export default function Home() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterText, setFilterText] = useState('');
  const translate = useTranslations('common');


  const getCruiseControlHistory = () => {
    Api('bulkOptimizer/getCruiseControlHistory').then(({ data }) => {
      setData(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getCruiseControlHistory()
  }, [])

  useEffect(() => {
    if (filterText.length > 0)
      setFilterData(data.filter((item: any) => (item.item_type.toLowerCase().includes(filterText.toLowerCase())) || (item.template_type.toLowerCase().includes(filterText.toLowerCase()))))
    else
      setFilterData([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText])

  const columns = [
    {
      name: translate('date'),
      selector: (row: any) => row.date,
      maxWidth: '10%'
    },
    {
      name: translate('itemType'),
      selector: (row: any) => row.item_type,
      maxWidth: '10%'
    },
    {
      name: translate('templateType'),
      selector: (row: any) => row.template_type,
      maxWidth: '12%'
    },
    {
      name: translate('updatedItems'),
      selector: (row: any) => row.total_update,
      maxWidth: '10%'
    },
    {
      name: translate('templateValue'),
      selector: (row: any) => row.template_value
    }
  ];



  return (<>
    {loading ? <Spinner animation='grow' /> :
      <>
        <div className='customTable-head d-flex align-item-center justify-content-between mb-22 page-filter'>
          <h2 className="Text--headingLg mb-0 seo-optimierPage-left tab-fullWidth tab-textLeft">{translate('cruiseControlHistory')}</h2>
          <div className='custom-input icon-input seo-optimierPage-right tab-fullWidth tab-textLeft'>
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