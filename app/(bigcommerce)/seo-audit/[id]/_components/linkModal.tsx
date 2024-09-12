import { Api } from "@/app/_api/apiCall"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Modal, Spinner } from "react-bootstrap"
// import { basePath } from "@/next.config"
import Image from "next/image"
import { useTranslations } from "next-intl"

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''
export default function Home(Props: any) {
	const translate = useTranslations('common');

  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [link, setLink] = useState([])
  const [httpLink, setHttpLink] = useState([])

  const getItemIssueDetails = () => {
    setLoading(true)
    Api('getItemIssueDetails', {
      id: params.id,
      type: 'content_issues',
      item_name: Props.itemName,
      target_keyword: Props.targetKeyword,
      title_tag: Props.titleTag,
      meta_description: Props.metaDescription,
      description: Props.description,
    }).then(({ data }) => {
      setLoading(false)
      setLink(data.detailsData.broken_link)
      setHttpLink(data.detailsData.http_value)
    })
  }


  let sno = 0

  return (<>
    <Modal show={Props.show} onHide={Props.onHide} centered={true} size="lg" onShow={getItemIssueDetails}>
      <Modal.Header closeButton={true}><h1>{translate('link')}</h1></Modal.Header>
      <Modal.Body>
        <div className="custom-table keywordSuggestion-table">
          {loading ? <Spinner size="sm" /> :
            <table className="table">
              <thead>
                <tr>
                  <th>{translate('SNo')}</th>
                  <th>{translate('anchorText')}</th>
                  <th>{translate('url')}</th>
                </tr>
              </thead>
              <tbody>
                {Props.linkType == 'internal' && link.map((item: any, key: any) => {
                  if (item.type == 1)
                    sno = sno + 1
                  return (<>
                    {item.type == 1 &&
                      <tr>
                        <td>{sno}</td>
                        <td>{item.text}</td>
                        <td>{item.link}<Image src={`${basePath}/images/link-icon.svg`} width={16} height={16} alt="" /></td>
                      </tr>}
                  </>)
                })}

                {Props.linkType == 'external' && link.map((item: any, key: any) => {
                  if (item.type == 2)
                    sno = sno + 1
                  return (<>
                    {item.type == 2 &&
                      <tr>
                        <td>{sno}</td>
                        <td>{item.text}</td>
                        <td>{item.link}<Image src={`${basePath}/images/link-icon.svg`} width={16} height={16} alt="" /></td>
                      </tr>}
                  </>)
                })}

                {Props.linkType == 'http' && httpLink.map((item: any, key: any) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{item.text}</td>
                    <td>{item.link}<a href={item.link} target="__blank"><Image src={`${basePath}/images/link-icon.svg`} width={16} height={16} alt="" /></a></td>
                  </tr>))}
              </tbody>
            </table>}
        </div>
      </Modal.Body>
    </Modal >
  </>)
}