'use client'

import Image from "next/image"
// import { basePath } from "@/next.config"
import { Api } from "@/app/_api/apiCall"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import DuplicateModal from './duplicateModal'
import { useTranslations } from "next-intl"
const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home(Props: any) {
	const translate = useTranslations('seoAudit');
	const translate1 = useTranslations('errorList');

  const [duplicateModalShow, setDuplicateModalShow] = useState(false)
  const [type, setType] = useState('title_tag')

  return (<>
    <DuplicateModal
      show={duplicateModalShow}
      onHide={() => setDuplicateModalShow(false)}
      type={type}
      itemName={Props.itemName}
      targetKeyword={Props.targetKeyword}
      titleTag={Props.titleTag}
      metaDescription={Props.metaDescription}
      description={Props.description}
    />
    <div className="card seoOptimizer-left">
      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate('titleLength40to60')}</p>
        {(Props.titleLengthIssue.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.titleLengthIssue.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate('metaDescriptionLength120to160')}</p>
        {(Props.metaDescriptionLengthIssue.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.metaDescriptionLengthIssue.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate1('metaTagIssuePoint3')}</p>
        {(Props.tKTitleIssue.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.tKTitleIssue.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate1('metaTagIssuePoint4')}</p>
        {(Props.tKMetaDescriptionIssue.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.tKMetaDescriptionIssue.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate1('metaTagIssuePoint6')} <a href="#" onClick={() => {
          setType('title_tag')
          setDuplicateModalShow(true)
        }}>({Props.duplicateTitleCount.data})</a></p>
        {(Props.duplicateTitleCount.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.duplicateTitleCount.data ? 'close-red-icon.svg' : 'check-green.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3">
        <p>{translate1('metaTagIssuePoint7')} <a href="#" onClick={() => {
          setType('meta_description')
          setDuplicateModalShow(true)
        }}>({Props.duplicateMetaDescriptionCount.data})</a></p>
        {(Props.duplicateMetaDescriptionCount.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.duplicateMetaDescriptionCount.data ? 'close-red-icon.svg' : 'check-green.svg'}`} alt="" width={20} height={20} /></span>}

      </div>
    </div>
  </>)
}