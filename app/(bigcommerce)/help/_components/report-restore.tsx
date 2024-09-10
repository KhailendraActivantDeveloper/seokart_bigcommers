import { Api } from "@/app/_api/apiCall"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DateRangePicker, Stack } from 'rsuite';
const { combine, afterToday, allowedRange } = DateRangePicker;
import { format, subDays } from "date-fns"
import Image from "next/image";
// import { basePath } from "@/next.config";
import { Pagination } from 'rsuite';
import { Tabs, Tab,Dropdown } from 'react-bootstrap'
import Singleitem from './singleItem'
import { useTranslations } from "next-intl";
const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home() {

	const translate = useTranslations('common');
	const translate1 = useTranslations('help');

  const [reportStatus, setReportStatus] = useState(false)
  const [reportType, setReportType] = useState('monthly')
  const [email, setEmail] = useState('')
  const [itemType, setItemType] = useState('product')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [itemList, setItemList] = useState([])
  const [reportList, setReportList] = useState([])
  const [restoreList, setRestoreList] = useState([])
  const [masterCheckbox, setMasterCheckbox] = useState(false)
  const [isAllSelect, setIsAllSelect] = useState(false)

  const [nameCheckbox, setNameCheckbox] = useState(false)
  const [titleTagCheckbox, setTitleTagCheckbox] = useState(false)
  const [metaDescriptionCheckbox, setMetaDescriptionCheckbox] = useState(false)
  const [descriptionCheckbox, setDescriptionCheckbox] = useState(false)
  const [urlCheckbox, setUrlCheckbox] = useState(false)

  const [itemIdArray, setItemIdArray] = useState<any>({})

  const [startDate, setStartDate] = useState<any>(subDays(new Date(), 29))
  const [endDate, setEndDate] = useState<any>(new Date())

  const getHomeData = () => {
    Api('reportRestore/getHomeData').then((data) => {
      setEmail(data.data.reportEmail)
      setReportType(data.data.reportStatus)
      if (data.data.reportStatus) {
        setReportStatus(true)
      } else {
        setReportStatus(false)
      }
    })
  }

  const updateReportStatus = () => {
    const report_status = reportStatus ? reportType : ''
    Api('reportRestore/updateReportStatus', { report_status: report_status })
  }

  const updateReportEmail = () => {
    Api('reportRestore/updateReportEmail', { report_email: email }).then((data) => {
      toast.success(translate('emailUpdateSuccessMsg'))
    })
  }

  const getRestoreList = () => {
    Api('reportRestore/getRestoreList', {
      item_type: itemType,
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd'),
      search_keyword: searchKeyword,
      page_info: currentPage
    }).then((data) => {
      setTotal(data.item_count)
      setItemList(data.data)
    })
  }

  const getRestoreStatusList = () => {
    Api('reportRestore/getRestoreStatusList').then((data) => {
      setRestoreList(data.data)
    })
  }

  const getReportStatusList = () => {
    Api('reportRestore/getReportStatusList').then((data) => {
      setReportList(data.data)
    })
  }

  const setReportQueue = () => {
    Api('reportRestore/setReportQueue', {
      item_name_checkbox: nameCheckbox,
      title_tag_checkbox: titleTagCheckbox,
      meta_description_checkbox: metaDescriptionCheckbox,
      description_checkbox: descriptionCheckbox,
      url_checkbox: urlCheckbox,
      item_type: itemType,
      item_id_array: Object.values(itemIdArray),
      is_all_select: Number(isAllSelect),
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd')
    }).then((data) => {
      if (data.status_code == 200)
        toast.success(data.message)
      else
        toast.error(data.message)
    })
  }


  const setRestoreQueue = (restoreType:String) => {
    Api('reportRestore/setRestoreQueue', {
      item_name_checkbox: nameCheckbox,
      title_tag_checkbox: titleTagCheckbox,
      meta_description_checkbox: metaDescriptionCheckbox,
      description_checkbox: descriptionCheckbox,
      url_checkbox: urlCheckbox,
      item_type: itemType,
      item_id_array: Object.values(itemIdArray),
      is_all_select: Number(isAllSelect),
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd'),
      restore_type:restoreType
    }).then((data) => {
      if (data.status_code == 200)
        toast.success(data.message)
      else
        toast.error(data.message)
    })
  }

  useEffect(() => {
    getHomeData()
    getRestoreStatusList()
    getReportStatusList()
  }, [])

  useEffect(() => {
    getRestoreList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, startDate, endDate, searchKeyword, itemType])

  useEffect(() => {
    updateReportStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportStatus, reportType])


  return (<>
    <div className="report-restoreArea">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="d-flex align-item-center gap-3 report-restoreHead">
              <p className="mb-0"><strong>{translate('weeklyMonthlyReport')}</strong> <span className="report-infoBtn ml-5 cursor-pointer" data-bs-toggle="modal" data-bs-target="#reportInfo_Modal"><img src="images/info-icon.svg" alt="" /></span></p>
              <div className="report-toggle">
                <div className="vc-toggle-container">
                  <label className="vc-small-switch">
                    <input type="checkbox" className="vc-switch-input" checked={reportStatus} onChange={() => setReportStatus(!reportStatus)} />
                    <span className="vc-switch-label" data-on="ON" data-off="OFF"></span>
                    <span className="vc-switch-handle"></span>
                  </label>
                </div>
              </div>
              {reportStatus &&
                <div className="reportWeekly-toggle">
                  <div className="vc-toggle-container">
                    <label className="vc-small-switch">
                      <input type="checkbox" className="vc-switch-input" checked={reportType == 'monthly'} onChange={() => setReportType((reportType) => {
                        if (reportType == 'weekly')
                          return 'monthly'
                        else
                          return 'weekly'
                      })} />
                      <span className="vc-switch-label" data-on='Monthly' data-off='Weekly'></span>
                      <span className="vc-switch-handle"></span>
                    </label>
                  </div>
                </div>}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="d-flex align-item-center gap-3">
              <div className="custom-input flex-grow-1">
                <span>{translate('email')}</span>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button type="button" className="custom-btn" onClick={updateReportEmail}>{translate('save')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card reportRestore-Card">
        <div className="border-innerBox">
          <h5 className="Text--headingLg mb-0">{translate('reportRestore')}</h5>
        </div>
        <div className="d-flex align-item-center justify-content-between pt-16 gap-3 reportTable-topFilter">
          <div className="d-flex align-item-center gap-3 reportTable-leftFilter">
            <div className="custom-dropi without-labelDropi">
              <select className="form-select" aria-label="Default select example" value={itemType} onChange={(e) => setItemType(e.target.value)}>
                <option value="product">{translate('products')}</option>
                <option value="category">{translate('categories')}</option>
                <option value="brand">{translate('brand')}</option>
                <option value="page">{translate('pages')}</option>
                <option value="blog">{translate('blogs')}</option>
              </select>
            </div>

            <div className="custom-input icon-input without-labelInput">
              <i className="input-icon"><img src="images/calendar-icon.svg" alt="" /></i>
              <DateRangePicker value={[startDate, endDate]} onChange={(value: any) => {
                setStartDate(value[0])
                setEndDate(value[1])
              }}
                shouldDisableDate={combine(afterToday(), allowedRange(new Date('2006-01-01'), new Date()))}
              />
            </div>
            {masterCheckbox &&
              <>
                {isAllSelect ?
                  <div className="AllSelected-inner">{translate1('allPageSelected',{total:total})} <button type="button" className="plain-btn" onClick={() => {
                    setIsAllSelect(false)
                  }}>{translate('clearSelection')}</button></div>
                  :
                  <div className="AllSelected-inner">{translate1('all10PageSelected')} <button type="button" className="plain-btn" onClick={() => {
                    setIsAllSelect(true)
                  }}>{translate('selectAllNoPages', {total:total})}</button>
                  </div>}
              </>
            }

          </div>

          <div className="custom-input icon-input without-labelInput reportTable-rightFilter">
            <i className="input-icon"><Image src={`${basePath}/images/search-icon.svg`} alt="" width={20} height={20} /></i>
            <input type="text" placeholder="Search" className="form-control" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
        </div>

        <div className="custom-table report-tableArea mt-16 last-childLeft">
          <table className="table">
            <thead>
              <tr>
                <th className="table-check">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={masterCheckbox} onChange={() => setMasterCheckbox(!masterCheckbox)} />
                  </div>
                </th>
                <th>{translate('name')}</th>
                <th className="text-align-left">{translate('pageURL')}</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item: any, key: any) => (
                <Singleitem item={item} key={key} componentKey={key} masterCheckbox={masterCheckbox}
                  setItemIdArray={
                    (id: any, event: any, componentKey: any) => {
                      if (event == 'add')
                        setItemIdArray((prev: any) => ({ ...prev, [componentKey]: id }))
                      else {
                        setItemIdArray((prev: any) => {
                          const updatedItem = { ...prev }
                          delete updatedItem[componentKey]
                          return updatedItem
                        })
                      }

                    }
                  } />
              ))}

            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <Pagination total={total} limit={10} limitOptions={[5, 10, 20]} prev={true} next={true} first={true} last={true}
            layout={['pager', 'skip', '-']}
            maxButtons={4}
            ellipsis={true}
            boundaryLinks={true}
            activePage={Number(currentPage)}
            onChangePage={(page) => {
              setCurrentPage(page)
            }}
          />
        </div>

        <div className="report-restoreField pt-16">
          <div className="d-flex align-item-center justify-content-between reportRestore-filterFooter">
            <div className="report-filedLeft">
              <h5 className="Text--headingSm">{translate('fieldsRestoreReport')}</h5>
              <div className="d-flex align-content-center gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={nameCheckbox} onChange={() => setNameCheckbox(!nameCheckbox)} />
                  <label className="form-check-label">
                    {translate('name')}
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={titleTagCheckbox} onChange={() => setTitleTagCheckbox(!titleTagCheckbox)} />
                  <label className="form-check-label" >
                    {translate('titleTag')}
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={metaDescriptionCheckbox} onChange={() => setMetaDescriptionCheckbox(!metaDescriptionCheckbox)} />
                  <label className="form-check-label">
                    {translate('metaDescription')}
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={descriptionCheckbox} onChange={() => setDescriptionCheckbox(!descriptionCheckbox)} />
                  <label className="form-check-label">
                    {translate('description')}
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={urlCheckbox} onChange={() => setUrlCheckbox(!urlCheckbox)} />
                  <label className="form-check-label" >
                    {translate('url')}
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex align-item-center gap-3">
              <div className="optimizer-aiAssist dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="Secondary" className="btn btn-default">
                  <Image src={`${basePath}/images/restore-icon.svg`} width={20} height={20} alt=""/> {translate('restore')}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>setRestoreQueue('oldest')}>{translate('firstRestorePointOldest')}</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setRestoreQueue('recent')}>{translate('secondRestorePointRecent')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <button type="button" className="custom-btn" onClick={setReportQueue}>{translate('report')}</button>
            </div>

          </div>
        </div>
      </div>

      <div className="card pb-0">
        <Tabs
          defaultActiveKey="report"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="report" title="Report">
            <div className="custom-table report-tableArea mt-16">
              <table className="table">
                <thead>
                  <tr>
                    <th className="pl-16">{translate('createdDate')}</th>
                    <th>{translate('type')}</th>
                    <th>{translate('status')}</th>
                    <th>{translate('action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.map((item: any, key: any) => (
                    <tr key={key}>
                      <td className="pl-16">{item.created_at}</td>
                      <td>{item.item_type}</td>
                      <td><span className={`badge ${item.status == 1 ? 'badge-success' : 'badge-error'}`}>{item.status == 1 ? translate('completed') : translate('pending')}</span></td>
                      <td>
                        <a href={`https://report.seokart.com/bigcommerce/public/app/SEOKart-Report-${item.file_path_date}-${item.id}.xlsx`}>
                          <button type="button" className="custom-btn">{translate('download')}</button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="restore" title="Restore">
            <div className="custom-table report-tableArea mt-16">
              <table className="table">
                <thead>
                  <tr>
                    <th className="pl-16">{translate('createdDate')}</th>
                    <th>{translate('type')}</th>
                    <th>{translate('status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {restoreList.map((item: any, key: any) => (
                    <tr key={key}>
                      <td className="pl-16">{item.created_at}</td>
                      <td>{item.item_type}</td>
                      <td><span className={`badge ${item.status == 1 ? 'badge-success' : 'badge-error'}`}>{item.status == 1 ? translate('completed') : translate('pending')}</span></td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>

      </div>

    </div>
  </>)
}