import { Api } from "@/app/_api/apiCall"
import { useEffect, useState } from "react"
import SingleItem from './singleItem'
import { Pagination } from 'rsuite';
import { Spinner } from 'react-bootstrap'
import { useTranslations } from "next-intl";

export default function Home() {
	const translate = useTranslations('common');
	const translate1 = useTranslations('errorList');

  const [errorHeading, setErrorHeading] = useState(localStorage.getItem('errorHeading') ?? 'metaTagIssue')

  const [errorType, setErrorType] = useState<any>()

  const [errorCount, setErrorCount] = useState<any>({})
  const [errorItem, setErrorItem] = useState({ data: [], loading: true, total: 0 })
  const [currentPage, setCurrentPage] = useState<any>(localStorage.getItem('currentPage') ?? 1)

  const [point, setPoint] = useState(localStorage.getItem('point') ?? 'point1')
  const [limit, setLimit] = useState<any>(localStorage.getItem('limit') ?? 10)

  const getSeoAuditErrorCount = () => {
    Api('getSeoAuditErrorCount').then(({ data }) => {
      setErrorCount(data)
      setErrorType({
        'metaTagIssue':
          [
            { key: 'point1', value: translate1('metaTagIssuePoint1'), count: data.title_tag_length },
            { key: 'point2', value: translate1('metaTagIssuePoint2'), count: data.meta_description_length },
            { key: 'point3', value: translate1('metaTagIssuePoint3'), count: data.target_keyword_present_title },
            { key: 'point4', value: translate1('metaTagIssuePoint4'), count: data.target_keyword_present_title },
            { key: 'point6', value: translate1('metaTagIssuePoint6'), count: data.duplicate_title },
            { key: 'point7', value: translate1('metaTagIssuePoint7'), count: data.duplicate_meta_descriptions }
          ],
        'contentIssue':
          [
            { key: 'point5', value: translate1('contentIssuePoint5'), count: data.target_keyword_present_description },
            { key: 'point10', value: translate1('contentIssuePoint10'), count: data.lorem_Ipsum },
            { key: 'point11', value: translate1('contentIssuePoint11'), count: data.spelling_errors },
          ],
        'imagesIssue':
          [
            { key: 'point8', value: translate1('imagesIssuePoint8'), count: data.alt_text }
          ],
        'brokenLinksIssue':
          [
            { key: 'internal_count', value: translate1('brokenLinksIssueInternalCount'), count: data.internal_count },
            { key: 'external_count', value: translate1('brokenLinksIssueExternalCount'), count: data.external_count },
            { key: 'point12', value: translate1('brokenLinksIssuePoint12'), count: data.http_links },
          ],
        'urlIssue':
          [
            { key: 'point13', value: translate1('urlIssuePoint13'), count: data.url_length },
            { key: 'point14', value: translate1('urlIssuePoint14'), count: data.target_keyword_present_url }
          ]
      })
    })
  }

  const getSeoAuditErrorItem = () => {
    setErrorItem({ data: [], loading: true, total: 0 })
    Api('getSeoAuditErrorItem', { page: currentPage, point: point, limit: limit }).then((data) => {
      setErrorItem({ data: data.data, loading: false, total: data.total_page_count })
    })
  }

  useEffect(() => {
    getSeoAuditErrorCount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getSeoAuditErrorItem()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, currentPage, point])


  useEffect(() => {
    localStorage.setItem('currentPage', currentPage)
  }, [currentPage])

  useEffect(() => {
    localStorage.setItem('limit', limit)
  }, [limit])

  useEffect(() => {
    localStorage.setItem('errorHeading', errorHeading)
  }, [errorHeading])

  useEffect(() => {
    localStorage.setItem('point', point)
  }, [point])

  return (<>
    <div className="PageSpeed-URL-Area">
      <div className="d-flex justify-content-between">
        {errorType &&
          <div className="d-flex align-item-center gap-3 seo-optimierPage-left">
            <div className="custom-dropi without-labelDropi">
              <select className="form-select" aria-label="Default select example" value={errorHeading} onChange={(e) => {
                setErrorHeading(e.target.value)
                setPoint(errorType[e.target.value][0].key)
                setCurrentPage(1)
              }}>
                <option value='metaTagIssue'>{translate1('metaTagIssues')}</option>
                <option value='contentIssue'>{translate1('contentIssues')}</option>
                <option value='imagesIssue'>{translate1('imagesIssues')}</option>
                <option value='brokenLinksIssue'>{translate1('brokenLinksIssues')}</option>
                <option value='urlIssue'>{translate1('URLIssues')}</option>
              </select>
            </div>

            <div className="custom-dropi without-labelDropi">
              <select className="form-select" aria-label="Default select example" value={point} onChange={(e) => {
                setCurrentPage(1)
                setPoint(e.target.value)
              }}>
                {errorType[errorHeading].map((item: any, key: any) => (
                  <option key={key} value={item.key}>{item.value} ({item.count})</option>
                ))}
              </select>
            </div>
          </div>}

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
            {errorItem.loading ?
              <tr><td colSpan={5}><Spinner /></td></tr> :
              errorItem.data.map((item, key) => (
                <SingleItem key={key} item={item} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="mt-3">
      <Pagination total={errorItem.total} limit={Number(limit)} limitOptions={[5,10,20]} prev={true} next={true} first={true} last={true}
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
