'use client'

import Image from "next/image"
// import { basePath } from "@/next.config"
import { Api } from "@/app/_api/apiCall"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import LinkModal from './linkModal'
import SpellModal from './spellModal'
import { useParams } from "next/navigation"
import { useTranslations } from '@/translator'


const basePath = process.env.NEXT_PUBLIC_BASEPATH??''
export default function Home(Props: any) {
	const translate = useTranslations('common');
	const translate1 = useTranslations('errorList');
	const translate2 = useTranslations('seoAudit');

  const param = useParams()
  const [linkModalShow, setLinkModalShow] = useState(false)
  const [spellModalShow, setSpellModalShow] = useState(false)
  const [linkType, setLinkType] = useState('internal')
  const [spellStatus, setSpellStatus] = useState(Props.spellStatus)


  const updateSpellErrorStatus = (spellStatus:any)=>{
    Api('updateSpellErrorStatus',{type:spellStatus,id:param.id})
  }

  useEffect(() => {
    setSpellStatus(Props.spellStatus)
  }, [Props.spellStatus])



  return (<>
    <LinkModal
      show={linkModalShow}
      onHide={() => setLinkModalShow(false)}
      itemName={Props.itemName}
      targetKeyword={Props.targetKeyword}
      titleTag={Props.titleTag}
      metaDescription={Props.metaDescription}
      description={Props.description}
      linkType={linkType}
    />

    <SpellModal
      show={spellModalShow}
      onHide={() => setSpellModalShow(false)}
      itemName={Props.itemName}
      targetKeyword={Props.targetKeyword}
      titleTag={Props.titleTag}
      metaDescription={Props.metaDescription}
      description={Props.description}
    />
    <div className="card seoOptimizer-left">
      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate1('contentIssuePoint5')}</p>
        {(Props.tKDescriptionIssue.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.tKDescriptionIssue.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate1('contentIssuePoint10')}</p>
        {(Props.loremIpsumDescriptionIssue.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.loremIpsumDescriptionIssue.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate2('internalBrokenLinks')} <a href="#" onClick={() => {
          setLinkType('internal')
          setLinkModalShow(true)
        }}> ({Props.internalBrokenCount.data})</a></p>
        {(Props.internalBrokenCount.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.internalBrokenCount.data ? 'close-red-icon.svg' : 'check-green.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate2('externalBrokenLinks')} <a href="#" onClick={() => {
          setLinkType('external')
          setLinkModalShow(true)
        }}> ({Props.externalBrokenCount.data})</a></p>
        {(Props.externalBrokenCount.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.externalBrokenCount.data ? 'close-red-icon.svg' : 'check-green.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
        <p>{translate2('HTTPLinks')} <a href="#" onClick={() => {
          setLinkType('http')
          setLinkModalShow(true)
        }}> ({Props.httpCount.data})</a></p>
        {(Props.httpCount.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${Props.httpCount.data ? 'close-red-icon.svg' : 'check-green.svg'}`} alt="" width={20} height={20} /></span>}
      </div>

      <div className="spelling-listIssues">
        <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
          <p>{translate1('spellingErrorsdescription')} <a href="#" onClick={() => {
            setSpellModalShow(true)
          }}> ({Props.spellErrorDescriptionCount.data})</a></p>
          {(Props.spellErrorDescriptionCount.loading) ?
          <Spinner size="sm" /> :
          <span><Image src={`${basePath}/images/${(Props.spellErrorDescriptionCount.data && spellStatus=='on') ? 'close-red-icon.svg' : 'check-green.svg'}`} alt="" width={20} height={20} /></span>}
        </div>

        <div className="custom-dropi without-labelDropi">
          <select className="form-select" aria-label="Default select example" value={spellStatus} onChange={(e)=>{
            setSpellStatus(e.target.value)
            updateSpellErrorStatus(e.target.value)
          }}>
            <option value='off_store'>{translate1('off_store')}</option>
            <option value='on'>{translate('on')}</option>
            <option value='off_page'>{translate1('off_page')}</option>
          </select>
        </div>
      </div>
    </div>
  </>)
}