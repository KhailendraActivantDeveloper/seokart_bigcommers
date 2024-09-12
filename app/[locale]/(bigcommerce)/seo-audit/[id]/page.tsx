'use client'

import Image from 'next/image';
// import { basePath } from '@/next.config';
import { Api } from '@/app/_api/apiCall';
import { useEffect, useState, useCallback } from 'react';
import { Spinner, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import {Link} from '@/navigation';
import Skeleton from 'react-loading-skeleton'
import MetaTagIssue from './_components/metaTagIssue'
import ContentIssue from './_components/contentIssue'
import Singleimagerow from './_components/singleImageRow'
import GptModalBox from './_components/gptModal'
import Select from "react-select"

import _ from 'lodash'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
const KeywordRankModal = dynamic(() => import('./_components/keywordRankModal'), { ssr: false })
const CustomEditor = dynamic(() => {
  return import('../../../../_ckeditor/custom-editor');
}, { ssr: false, loading: () => <Skeleton count={15} /> });

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''



export default function Home({ params }: { params: { id: number } }) {
  const router = useRouter();
  const localeLang = useLocale();
  const id = params.id

  const [loading, setLoading] = useState(true)
  const [seoScore, setSeoScore] = useState(0)
  const [name, setName] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemId, setItemId] = useState()
  const [targetKeyword, setTargetKeyword] = useState('')
  const [titleTag, setTitleTag] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [description, setDescription] = useState('')
  const [googleSuggestedKeyword, setGoogleSuggestedKeyword] = useState([])
  const [googleSuggestedKeywordShow, setGoogleSuggestedKeywordShow] = useState(false)
  const [keywordRankModal, setKeywordRankModal] = useState(false)
  const [titleLengthIssue, setTitleLengthIssue] = useState({ loading: true, data: '' })
  const [metaDescriptionLengthIssue, setMetaDescriptionLengthIssue] = useState({ loading: true, data: '' })
  const [tKTitleIssue, setTKTitleIssue] = useState({ loading: true, data: '' })
  const [tKMetaDescriptionIssue, setTKMetaDescriptionIssue] = useState({ loading: true, data: '' })
  const [duplicateTitleCount, setDuplicateTitleCount] = useState({ loading: true, data: '' })
  const [duplicateMetaDescriptionCount, setDuplicateMetaDescriptionCount] = useState({ loading: true, data: '' })
  const [tKDescriptionIssue, setTKDescriptionIssue] = useState({ loading: true, data: '' })
  const [loremIpsumDescriptionIssue, setLoremIpsumDescriptionIssue] = useState({ loading: true, data: '' })
  const [internalBrokenCount, setInternalBrokenCount] = useState({ loading: true, data: '' })
  const [externalBrokenCount, setExternalBrokenCount] = useState({ loading: true, data: '' })
  const [httpCount, setHttpCount] = useState({ loading: true, data: '' })
  const [spellErrorDescriptionCount, setSpellErrorDescriptionCount] = useState({ loading: true, data: '' })
  const [altTextIssue, setAltTextIssue] = useState({ loading: true, data: '' })
  const [urlLengthIssue, setUrlLengthIssue] = useState({ loading: true, data: '' })
  const [tKurl, setTKurl] = useState({ loading: true, data: '' })
  const [aiTargetKeyword, setAiTargetKeyword] = useState<any>({ loading: false, data: {} })
  const [aiTitleTag, setAiTitleTag] = useState<any>({ loading: 3, data: {} })
  const [aiMetaDescription, setAiMetaDescription] = useState<any>({ loading: 3, data: '' })
  const [aiDescription, setAiDescription] = useState<any>({ loading: 3, data: '' })
  const [imageData, setImageData] = useState([])
  const [updateImageData, setUpdateImageData] = useState<any>([])
  const [oldData, setOldData] = useState([])
  const [primaryImageAltText, setPrimaryImageAltText] = useState('')
  const [spellStatus, setSpellStatus] = useState('')
  const [urlData, setUrlData] = useState([])
  const [url, setUrl] = useState('')
  const [newUrl, setNewUrl] = useState<any>('')
  const [redirectUrl, setRedirectUrl] = useState<any>('')
  const [homeUrl, setHomeUrl] = useState('')
  const [saveBtnLoading, setSaveBtnLoading] = useState(false)
  const [gptModal, setGptModal] = useState({ status: false, needToShow: false })
  const [gptLanguage, setGptLanguage] = useState('english')

	const translate = useTranslations('errorList');
	const translate1 = useTranslations('common');


  useEffect(() => {
    const channelObj = JSON.parse(localStorage.getItem('channel') ?? '')
    setHomeUrl(channelObj.domain)
  }, [])

  const getSingleItemOptimize = () => {
    Api('getSingleItemOptimize', { id: id }).then((data) => {
      setLoading(false)
      if (data.gpt_popup_show == 0)
        setGptModal({ status: false, needToShow: true })
      setGptLanguage(data.gpt_language)
      setSeoScore(data.total_seo_score)
      const itemData = data?.data?.item_data
      setName(itemData.item_name)
      setTargetKeyword(itemData.target_keyword)
      setTitleTag(itemData.title_tag)
      setMetaDescription(itemData.meta_description)
      setDescription(itemData.description)
      setItemType(itemData.item_type)
      setItemId(itemData.item_id)
      setImageData(itemData.image_data)
      setUpdateImageData(itemData.image_data)
      setOldData(data.data.old_data)

      let item_disable_spell_error = itemData.item_disable_spell_error
      let store_disable_spell_error = itemData.store_disable_spell_error
      if (item_disable_spell_error == 1) {
        setSpellStatus('off_page')
      }
      if (store_disable_spell_error == 1) {
        setSpellStatus('off_store')
      }
      if (item_disable_spell_error == 0 && store_disable_spell_error == 0) {
        setSpellStatus('on')
      }

      setUrlData(itemData.urleditor)
      setUrl(itemData.url)
    })
  }

  const getGoogleSuggestedKeyword = () => {
    Api('getGoogleSuggestedKeyword', { keyword: targetKeyword }).then(({ data }) => {
      setGoogleSuggestedKeyword(data)
    })
  }

  const getAiTargetKeyword = () => {
    if (!name) {
      toast.error(translate1('nameIsRequired'));
      return false
    }
    gptModal.needToShow == true ? setGptModal({ status: true, needToShow: false }) : setGptModal({ status: false, needToShow: false })
    setAiTargetKeyword({ loading: true, data: {} })
    Api('getAiTragetKeyword', { item_name: name, item_id: itemId, type: itemType }).then(({ data }) => {
      setAiTargetKeyword({ loading: false, data: data })
    })
  }

  const getItemIssue = () => {
    Api('getItemIssue', { id: id }).then(({ data }) => {
      setTitleLengthIssue({ loading: false, data: data.metaTagIssues.title_length })
      setMetaDescriptionLengthIssue({ loading: false, data: data.metaTagIssues.meta_description_length })
      setTKTitleIssue({ loading: false, data: data.metaTagIssues.target_keyword_in_the_title_tag })
      setTKMetaDescriptionIssue({ loading: false, data: data.metaTagIssues.target_keyword_in_the_meta_description })


      setTKDescriptionIssue({ loading: false, data: data.contentIssues.target_keyword_present_in_the_description })
      setLoremIpsumDescriptionIssue({ loading: false, data: data.contentIssues.lorem_ipsum_content_in_the_description })

      setAltTextIssue({ loading: false, data: data.imageIssues.alt_text_in_the_primary_image })

      setUrlLengthIssue({ loading: false, data: data.urlIssues.url_length_is_less_48_char })
      setTKurl({ loading: false, data: data.urlIssues.target_keyword_in_URL })
    })
  }

  const getItemIssueCount = () => {
    Api('getItemIssueCount', { id: id }).then(({ data }) => {
      setDuplicateTitleCount({ loading: false, data: data.metaTagIssues.duplicate_title_tags })
      setDuplicateMetaDescriptionCount({ loading: false, data: data.metaTagIssues.duplicate_meta_descriptions })


      setInternalBrokenCount({ loading: false, data: data.contentIssues.internal_broken_links })
      setExternalBrokenCount({ loading: false, data: data.contentIssues.external_broken_links })
      setHttpCount({ loading: false, data: data.contentIssues.http_inks })
      setSpellErrorDescriptionCount({ loading: false, data: data.contentIssues.spelling_errors_in_the_description })
    })
  }

  const updateAiKeywordUseItStatus = (mainId: any, resId: any) => {
    Api('updateAiKeywordUseItStatus', { mainId: mainId, resId: resId })
  }

  const getAiItemTitle = () => {
    if (!targetKeyword) {
      toast.error(translate1('targetKeywordIsRequired'))
      return false
    }
    if (!name) {
      toast.error(translate1('nameIsRequired'))
      return false
    }
    gptModal.needToShow == true ? setGptModal({ status: true, needToShow: false }) : setGptModal({ status: false, needToShow: false })
    setAiTitleTag({ loading: 1, data: '' })
    Api('getAiItemTitle', { item_name: name, target_keyword: targetKeyword, item_id: itemId, type: itemType }).then(({ data }) => {
      setAiTitleTag({ loading: 2, data: data })
    })
  }

  const getAiItemMetaDesc = () => {
    if (!targetKeyword) {
      toast.error(translate1('targetKeywordIsRequired'))
      return false
    }
    if (!name) {
      toast.error(translate1('nameIsRequired'))
      return false
    }
    gptModal.needToShow == true ? setGptModal({ status: true, needToShow: false }) : setGptModal({ status: false, needToShow: false })
    setAiMetaDescription({ loading: 1, data: '' })
    Api('getAiItemMetaDesc', { item_name: name, target_keyword: targetKeyword, item_id: itemId, type: itemType }).then(({ data }) => {
      setAiMetaDescription({ loading: 2, data: data })
    })
  }

  const getAiItemDesc = () => {
    if (!targetKeyword) {
      toast.error(translate1('targetKeywordIsRequired'))
      return false
    }
    if (!name) {
      toast.error(translate1('nameIsRequired'))
      return false
    }
    gptModal.needToShow == true ? setGptModal({ status: true, needToShow: false }) : setGptModal({ status: false, needToShow: false })
    setAiDescription({ loading: 1, data: '' })
    if (itemType == 'product') {
      Api('getAiProductDesc', { item_name: name, target_keyword: targetKeyword, item_id: itemId, type: itemType }).then(({ data }) => {
        setAiDescription({ loading: 2, data: data })
      })
    } else {
      Api('getAiItemDesc', { item_name: name, target_keyword: targetKeyword, item_id: itemId, type: itemType }).then(({ data }) => {
        setAiDescription({ loading: 2, data: data })
      })
    }

  }

  const updateAiUseItStatus = (insertId: any) => {
    Api('updateAiUseItStatus', { insertId: insertId })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAuditScoreOnChange = useCallback(_.debounce((name, targetKeyword, titleTag, metaDescription, description, imageAlt, url) => {
    setTitleLengthIssue({ loading: true, data: '' })
    setMetaDescriptionLengthIssue({ loading: true, data: '' })
    setTKTitleIssue({ loading: true, data: '' })
    setTKMetaDescriptionIssue({ loading: true, data: '' })


    setTKDescriptionIssue({ loading: true, data: '' })
    setLoremIpsumDescriptionIssue({ loading: true, data: '' })

    setAltTextIssue({ loading: true, data: '' })

    setUrlLengthIssue({ loading: true, data: '' })
    setTKurl({ loading: true, data: '' })

    setDuplicateTitleCount({ loading: true, data: '' })
    setDuplicateMetaDescriptionCount({ loading: true, data: '' })


    setInternalBrokenCount({ loading: true, data: '' })
    setExternalBrokenCount({ loading: true, data: '' })
    setHttpCount({ loading: true, data: '' })
    setSpellErrorDescriptionCount({ loading: true, data: '' })

    Api('getAuditScoreOnChange', {
      id: id,
      item_name: name,
      target_keyword: targetKeyword,
      title_tag: titleTag,
      meta_description: metaDescription,
      description: description,
      image_alt: imageAlt,
      url: url
    }).then(({ data }) => {
      setTitleLengthIssue({ loading: false, data: data.metaTagIssues.title_length })
      setMetaDescriptionLengthIssue({ loading: false, data: data.metaTagIssues.meta_description_length })
      setTKTitleIssue({ loading: false, data: data.metaTagIssues.target_keyword_in_the_title_tag })
      setTKMetaDescriptionIssue({ loading: false, data: data.metaTagIssues.target_keyword_in_the_meta_description })


      setTKDescriptionIssue({ loading: false, data: data.contentIssues.target_keyword_present_in_the_description })
      setLoremIpsumDescriptionIssue({ loading: false, data: data.contentIssues.lorem_ipsum_content_in_the_description })

      setAltTextIssue({ loading: false, data: data.imageIssues.alt_text_in_the_primary_image })

      setUrlLengthIssue({ loading: false, data: data.urlIssues.url_length_is_less_48_char })
      setTKurl({ loading: false, data: data.urlIssues.target_keyword_in_URL })

      setDuplicateTitleCount({ loading: false, data: data.metaTagIssues.duplicate_title_tags })
      setDuplicateMetaDescriptionCount({ loading: false, data: data.metaTagIssues.duplicate_meta_descriptions })


      setInternalBrokenCount({ loading: false, data: data.contentIssues.internal_broken_links })
      setExternalBrokenCount({ loading: false, data: data.contentIssues.external_broken_links })
      setHttpCount({ loading: false, data: data.contentIssues.http_inks })
      setSpellErrorDescriptionCount({ loading: false, data: data.contentIssues.spelling_errors_in_the_description })

      setSeoScore(data.score)
    })
  }, 2000), [])

  const updateSeoAuditItem = (type: any) => {
    if (!targetKeyword) {
      toast.error(translate1('targetKeywordIsRequired'))
      return false
    }
    if (!name) {
      toast.error(translate1('nameIsRequired'))
      return false
    }

    setSaveBtnLoading(true)
    Api('updateSeoAuditItem', {
      id: id,
      item_name: name,
      target_keyword: targetKeyword,
      title_tag: titleTag,
      meta_description: metaDescription,
      description: description,
      alt_data: JSON.stringify(updateImageData),
      old_url: url,
      new_url: newUrl,
      redirect_url: redirectUrl
    }).then((data) => {
      setSaveBtnLoading(false)
      toast.success(translate1('pageSaved'))
      if (type == 'exit') {
        router.push(`/${localeLang}/seo-audit`)
      }
    })
  }

  const deleteRedirectUrl = () => {
    Api('urlEditor/deleteRedirectUrl', { item_id: itemId, item_type: itemType }).then(() => {
      window.location.reload()
    })
  }

  useEffect(() => {
    getGoogleSuggestedKeyword()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKeyword])


  useEffect(() => {
    getSingleItemOptimize()
    getItemIssueCount()
    getItemIssue()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setRedirectUrl(newUrl)
  }, [newUrl])

  const handleOnChangeLanguage = (selectedValue: any) => {
    setGptLanguage(selectedValue.value)
    Api('updateGptLanguage', { language: selectedValue.value }).then((response) => {
      response.status_code == 200 ?
        toast.success(translate1('languageChangeSucces')) : toast.error(translate1('somethingWentWrong'))
    })

  }

  const languageList = [
    { label: 'EN', value: 'english' },
    { label: 'ES', value: 'spanish' },
    { label: 'FR', value: 'french' },
    { label: 'DE', value: 'german' },
    { label: 'ZH-CN', value: 'chinese (simplified)' },
    { label: 'ZH-TW', value: 'chinese (traditional)' },
    { label: 'JA', value: 'japanese' },
    { label: 'HI', value: 'hindi' },
    { label: 'KO', value: 'korean' },
    { label: 'PT', value: 'portuguese' },
    { label: 'IT', value: 'italian' },
    { label: 'NL', value: 'dutch' },
    { label: 'RU', value: 'russian' },
    { label: 'AR', value: 'arabic' },
    { label: 'TR', value: 'turkish' },
    { label: 'PL', value: 'polish' },
    { label: 'SV', value: 'swedish' },
    { label: 'DA', value: 'danish' },
    { label: 'FI', value: 'finnish' },
    { label: 'NO', value: 'norwegian' },
    { label: 'EL', value: 'greek' },
    { label: 'HE', value: 'hebrew' },
    { label: 'TH', value: 'thai' },
    { label: 'VI', value: 'vietnamese' },
    { label: 'ID', value: 'indonesian' }
  ];

  return (<>
    <GptModalBox show={gptModal.status} handleClose={() => setGptModal({ status: false, needToShow: false })} />
    <KeywordRankModal show={keywordRankModal} onHide={() => setKeywordRankModal(false)} targetKeyword={targetKeyword} />
    <div className="content-frame-main" onClick={() => {
      setGoogleSuggestedKeywordShow(false)
    }}>
      <div className="content-frame-head flex justify-content-between align-item-center">
        <div className="content-frameHead-left flex gap-2">
          <h1 className="Text--headingLg flex align-item-center gap-2">
            <Link href={'/seo-audit'}>
              <button type="button" className="headBack-btn">
                <Image src={`${basePath}/images/back-icon.svg`} alt='' width="20" height="20" />
              </button>
            </Link>
            {translate1('seoOptimizer')}
            
          </h1>
          {loading == false ?
              <Select
                value={languageList.find((item) => item.value == gptLanguage)}
                onChange={handleOnChangeLanguage}
                options={languageList}
              />
              : <Spinner size='sm' />}
        </div>

        <div className="content-frameHead-right">

          <button type="button" disabled={saveBtnLoading} className="custom-btn" onClick={() => {
            updateSeoAuditItem('')
          }}>{saveBtnLoading ? <Spinner size='sm' /> : translate1('saveAll')}</button>
          <button type="button" disabled={saveBtnLoading} className="btn-primary" onClick={() => {
            updateSeoAuditItem('exit')
          }}>{saveBtnLoading ? <Spinner size='sm' /> : translate1('saveAll_Exit')}</button>
        </div>
      </div>

      <div className="seo-optimizerMain">
        <div className="d-flex gap-24 seo-optimizerLogo-head">
          <div className="card">
            <div className="d-flex align-item-center gap-3 optimizerScore justify-content-center">
              <div className="optimizer-logo">
                <Image src={`${basePath}/images/seokart-logo-icon.svg`} alt='' width="50" height="50" />
              </div>

              <div className="optimizer-auditInfo">
                <div className="d-flex align-items-baseline mb-1">
                  <h2 className="Text--headingXl mb-0 green-text">
                    {loading ? <Spinner size='sm' /> : seoScore}%
                  </h2>
                </div>
                <h2 className="Text--headingMd mb-0">{translate1('seoScore')}</h2>
              </div>
            </div>
          </div>

          <div className="card flex-grow-1">
            {loading ? <Skeleton count={2} /> :
              <div className="d-flex gap-3 seo-optimizer-headRight tab-align-item-center">
                <div className="optimizer-headRightBox d-flex flex-grow-1 gap-3 tab-flex-direction-column">
                  <div className="custom-input flex-grow-1">
                    <span>{translate1('name')}</span>
                    <input type="text" className="form-control" value={name} onChange={(e) => {
                      getAuditScoreOnChange(e.target.value, targetKeyword, titleTag, metaDescription, description, primaryImageAltText, url)
                      setName(e.target.value)
                    }} />
                  </div>

                  <div className="custom-input flex-grow-1 position-relative">
                    <span>{translate1('targetKeyword')}</span>
                    <input type="text" className="form-control" value={targetKeyword} onChange={(e) => {
                      getAuditScoreOnChange(name, e.target.value, titleTag, metaDescription, description, primaryImageAltText, url)
                      setTargetKeyword(e.target.value)
                      setGoogleSuggestedKeywordShow(true)
                    }} />


                    {googleSuggestedKeyword?.length > 0 && googleSuggestedKeywordShow &&
                      <div className="optimizer-keywordDropi">
                        <ul>
                          {googleSuggestedKeyword.map((item: any, key: any) => (
                            <li key={key} onClick={() => {
                              setTargetKeyword(item)
                            }}><span>{item}</span></li>
                          ))}
                        </ul>
                      </div>}

                  </div>
                </div>

                <div className='optimizer-headRightBox d-flex gap-3'>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{translate1('aiAssist')}</Tooltip>}>
                    <div className="optimizer-aiAssist dropdown">
                      <Dropdown onToggle={(nextShow) => {
                        if (nextShow) {
                          getAiTargetKeyword()
                        }
                      }}>
                        <Dropdown.Toggle variant='secondary' className="custom-btn white-icon-btn" >
                          <Image src={`${basePath}/images/ai-assist-icon.svg`} alt='' width="20" height="20" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                          {aiTargetKeyword.loading ? <Spinner size='sm' /> :
                            <>
                              <Dropdown.Item as="button" onClick={() => {
                                setTargetKeyword(aiTargetKeyword.data.result1)
                                updateAiKeywordUseItStatus(aiTargetKeyword.data.mainId, aiTargetKeyword.data.resId1)
                                getAuditScoreOnChange(name, aiTargetKeyword.data.result1, titleTag, metaDescription, description, primaryImageAltText, url)
                              }}><span>{aiTargetKeyword.data.result1}</span>
                              </Dropdown.Item>
                              <Dropdown.Item as="button" onClick={() => {
                                setTargetKeyword(aiTargetKeyword.data.result2)
                                updateAiKeywordUseItStatus(aiTargetKeyword.data.mainId, aiTargetKeyword.data.resId2)
                                getAuditScoreOnChange(name, aiTargetKeyword.data.result1, titleTag, metaDescription, description, primaryImageAltText, url)
                              }}><span>{aiTargetKeyword.data.result2}</span></Dropdown.Item>
                              <Dropdown.Item as="button" onClick={() => {
                                setTargetKeyword(aiTargetKeyword.data.result3)
                                updateAiKeywordUseItStatus(aiTargetKeyword.data.mainId, aiTargetKeyword.data.resId3)
                                getAuditScoreOnChange(name, aiTargetKeyword.data.result1, titleTag, metaDescription, description, primaryImageAltText, url)
                              }}><span>{aiTargetKeyword.data.result3}</span></Dropdown.Item>
                            </>
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </OverlayTrigger>


                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{translate1('addKeywordToRankTracker')}</Tooltip>}>
                    <button className="btn btn-default" type="button" onClick={() => setKeywordRankModal(true)}>
                      <Image src={`${basePath}/images/plus-icon.svg`} alt='' width="20" height="20" />
                    </button>
                  </OverlayTrigger>
                </div>
              </div>}
          </div>
        </div>

        <div className="seo-optimizer--innerArea">
          <h1 className="Text--headingLg">{translate('metaTagIssues')}</h1>
          <div className="d-flex gap-24 seo-optimizerInner-mainBox">
            <MetaTagIssue
              titleLengthIssue={titleLengthIssue}
              metaDescriptionLengthIssue={metaDescriptionLengthIssue}
              tKTitleIssue={tKTitleIssue}
              tKMetaDescriptionIssue={tKMetaDescriptionIssue}
              duplicateTitleCount={duplicateTitleCount}
              duplicateMetaDescriptionCount={duplicateMetaDescriptionCount}
              titleTag={titleTag}
              metaDescription={metaDescription}
              targetKeyword={targetKeyword}
              description={description}
              itemName={name}
            />
            <div className="card seoOptimizer-right flex-grow-1">
              {loading ? <Skeleton count={14} /> :
                <>
                  <div className="row">
                    <div className="col-md-12 mb-22">
                      <div className="d-flex gap-3 align-items-end">
                        <div className="custom-input flex-grow-1">
                          <span>{translate1('titleTag')}</span>
                          <input type="text" disabled={itemType == 'home' || itemType == 'blog'} className="form-control" value={titleTag} onChange={(e) => {
                            getAuditScoreOnChange(name, targetKeyword, e.target.value, metaDescription, description, primaryImageAltText, url)
                            setTitleTag(e.target.value)
                          }} />
                          <div className="keyword-count false">{titleTag.length}</div>
                        </div>
                        {itemType != 'home' &&
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>{translate1('aiAssist')}</Tooltip>}>
                            <button className="custom-btn white-icon-btn" onClick={getAiItemTitle}><Image src={`${basePath}/images/ai-assist-icon.svg`} alt='' width="20" height="20" /></button>
                          </OverlayTrigger>}
                      </div>
                      {aiTitleTag.loading == 1 ? <Spinner size='sm' /> : aiTitleTag.loading == 2 ?
                        <div className="ai-useArea mt-24">
                          <div className="d-flex gap-3">
                            <div className="flex-grow-1">
                              <p className="mb-0">{aiTitleTag.data.result}</p>
                            </div>

                            <button type="button" className="custom-btn" onClick={() => {
                              updateAiUseItStatus(aiTitleTag.data.insertId)
                              setTitleTag(aiTitleTag.data.result)
                              getAuditScoreOnChange(name, targetKeyword, aiTitleTag.data.result, metaDescription, description, primaryImageAltText, url)
                            }}>Use It</button>
                          </div>
                        </div> : ''}
                    </div>



                    <div className="col-md-12 mb-22">
                      <div className="d-flex gap-3 align-items-end">
                        <div className="custom-textarea flex-grow-1">
                          <span className="textarea-heading ">{translate1('metaDescription')}</span>
                          <textarea className="form-control height110" disabled={itemType == 'home'} value={metaDescription} onChange={(e) => {
                            getAuditScoreOnChange(name, targetKeyword, titleTag, e.target.value, description, primaryImageAltText, url)
                            setMetaDescription(e.target.value)
                          }}></textarea>
                          <div className="keyword-count false">{metaDescription.length}</div>
                        </div>

                        {itemType != 'home' &&
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>{translate1('aiAssist')}</Tooltip>}>
                            <button className="custom-btn white-icon-btn" onClick={getAiItemMetaDesc}><Image src={`${basePath}/images/ai-assist-icon.svg`} alt='' width="20" height="20" /></button>
                          </OverlayTrigger>}
                      </div>
                      {aiMetaDescription.loading == 1 ? <Spinner size='sm' /> : aiMetaDescription.loading == 2 ?
                        <div className="ai-useArea mt-24">
                          <div className="d-flex gap-3">
                            <div className="flex-grow-1">
                              <p className="mb-0">{aiMetaDescription.data.result}</p>
                            </div>

                            <button type="button" className="custom-btn" onClick={() => {
                              updateAiUseItStatus(aiMetaDescription.data.insertId)
                              setMetaDescription(aiMetaDescription.data.result)
                              getAuditScoreOnChange(name, targetKeyword, titleTag, aiMetaDescription.data.result, description, primaryImageAltText, url)
                            }}>{translate1('useIt')}</button>
                          </div>
                        </div> : ''}
                    </div>
                  </div>



                  <div className="optimizer-restoreArea">
                    <div className="optimizer-aiAssist dropdown">
                      <Dropdown>
                        <Dropdown.Toggle variant='Secondary' className="btn btn-default">
                        {translate1('restore')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {oldData.map((item: any, key: any) => (
                            <div key={key}>
                              {item.type == 2 &&
                                <Dropdown.Item as='button' onClick={() => {
                                  setTitleTag(item.value)
                                }}>{translate1('titleTag')} ({item.created_at})</Dropdown.Item>
                              }
                            </div>
                          ))}

                          {oldData.map((item: any, key: any) => (
                            <div key={key}>
                              {item.type == 3 &&
                                <Dropdown.Item as='button' onClick={() => {
                                  setMetaDescription(item.value)
                                }}>{translate1('metaDescription')} ({item.created_at})</Dropdown.Item>
                              }
                            </div>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </>}
            </div>
          </div>
        </div>

        <div className="seo-optimizer--innerArea seo-optimizerInner-mainBox">
          <h1 className="Text--headingLg">{translate('contentIssues')}</h1>

          <div className="d-flex gap-24 seo-optimizerInner-mainBox">
            <ContentIssue
              tKDescriptionIssue={tKDescriptionIssue}
              loremIpsumDescriptionIssue={loremIpsumDescriptionIssue}
              internalBrokenCount={internalBrokenCount}
              externalBrokenCount={externalBrokenCount}
              httpCount={httpCount}
              spellErrorDescriptionCount={spellErrorDescriptionCount}
              titleTag={titleTag}
              metaDescription={metaDescription}
              targetKeyword={targetKeyword}
              description={description}
              itemName={name}
              spellStatus={spellStatus}
            />

            <div className="card seoOptimizer-right flex-grow-1">
              <div className="row">

                <div className="col-md-12 mb-22">
                  <div className="d-flex gap-3 align-items-end">
                    <div className="custom-textarea flex-grow-1">
                      <span className="textarea-heading ">{translate1('description')}</span>
                      {loading ? '' :
                        <CustomEditor
                          disabled={(itemType == 'home') ? true : false}
                          initialData={description}
                          onChange={(event: any, editor: any) => {
                            const data = editor.getData()
                            setDescription(data)
                            getAuditScoreOnChange(name, targetKeyword, titleTag, metaDescription, data, primaryImageAltText, url)
                          }}
                        />}
                    </div>

                    {itemType != 'home' &&
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>{translate1('aiAssist')}</Tooltip>}>
                        <button className="custom-btn white-icon-btn" onClick={getAiItemDesc}><Image src={`${basePath}/images/ai-assist-icon.svg`} alt='' width="20" height="20" /></button>
                      </OverlayTrigger>}
                  </div>
                  {aiDescription.loading == 1 ? <Spinner size='sm' /> : aiDescription.loading == 2 ?
                    <div className="ai-useArea mt-24">
                      <div className="d-flex gap-3">
                        <div className="flex-grow-1">
                          <p className="mb-0">{aiDescription.data?.result}</p>
                        </div>

                        <button type="button" className="custom-btn" onClick={() => {
                          updateAiUseItStatus(aiDescription?.data.insertId)
                          setDescription(aiDescription.data.result)
                          getAuditScoreOnChange(name, targetKeyword, titleTag, metaDescription, aiDescription.data.result, primaryImageAltText, url)
                        }}>{translate1('useIt')}</button>
                      </div>
                    </div> : ''}
                </div>
              </div>


              <div className="optimizer-restoreArea">
                <div className="optimizer-aiAssist dropdown">
                  <Dropdown>
                    <Dropdown.Toggle variant='Secondary' className="btn btn-default">
                    {translate1('restore')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {oldData.map((item: any, key: any) => (
                        <div key={key}>
                          {item.type == 4 &&
                            <Dropdown.Item as='button' onClick={() => {
                              setDescription(item.value)
                            }}>{item.created_at}</Dropdown.Item>
                          }
                        </div>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        {itemType == 'product' &&
          <div className="seo-optimizer--innerArea seo-optimizerInner-mainBox">
            <h1 className="Text--headingLg">{`Images' Issues`}</h1>

            <div className="d-flex gap-24">
              <div className="card seoOptimizer-left">
                <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
                  <p>{translate1('AltTextAvailableInPrimaryImage')}</p>
                  {(altTextIssue.loading) ?
                    <Spinner size="sm" /> :
                    <span><Image src={`${basePath}/images/${altTextIssue.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}
                </div>
              </div>

              <div className="card seoOptimizer-right flex-grow-1 pt-4">
                {imageData.map((item, key) => (
                  <Singleimagerow
                    image={item}
                    key={key}
                    componentKey={key}
                    setPrimaryImageAltText={(val: any) => setPrimaryImageAltText(val)}
                    setUpdateImageData={(key: any, altText: any) => {
                      setUpdateImageData((updateImageData: any) => ({ ...updateImageData, [key]: { ...updateImageData[key], alt: altText } }))
                    }}
                  />
                ))}
              </div>
            </div>
          </div>}

        {itemType != 'home' &&
          <div className="seo-optimizer--innerArea">
            <h1 className="Text--headingLg">{translate('URLIssues')}</h1>

            <div className="d-flex gap-24 seo-optimizerInner-mainBox">
              <div className="card seoOptimizer-left">
                <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
                  <p>{translate('urlIssuePoint13')}</p>
                  {(urlLengthIssue.loading) ?
                    <Spinner size="sm" /> :
                    <span><Image src={`${basePath}/images/${urlLengthIssue.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}

                </div>

                <div className="d-flex justify-content-between align-item-center gap-3 mb-16">
                  <p>{translate('urlIssuePoint14')}</p>
                  {(tKurl.loading) ?
                    <Spinner size="sm" /> :
                    <span><Image src={`${basePath}/images/${tKurl.data ? 'check-green.svg' : 'close-red-icon.svg'}`} alt="" width={20} height={20} /></span>}

                </div>
              </div>

              <div className="card seoOptimizer-right flex-grow-1 pt-4">
                {urlData.map((item: any, key) => (
                  <div className="optimizerList-box d-flex align-item-center gap-3" key={key}>

                    <div className="optimizerProduct-imgfeild flex-grow-1 d-flex align-item-center gap-3">
                      <div className="custom-input link-iconDropi flex-grow-1">
                        <span>
                          {translate1('currentURL')}
                          <a href={`${homeUrl}${item.old_url}`} target="_blank"><Image src={`${basePath}/images/link-icon.svg`} width={20} height={20} alt='' /></a>
                        </span>
                        <input type="text" className="form-control" value={`${homeUrl} ${item.old_url}`} disabled />
                      </div>

                      <div className="custom-input flex-grow-1">
                        <span>{translate1('newURL')}
                          <a href={`${homeUrl}${item.new_url}`} target="_blank"><Image src={`${basePath}/images/link-icon.svg`} width={20} height={20} alt='' /></a>
                        </span>
                        <input type="text" className="form-control" value={`${homeUrl} ${item.new_url}`} disabled />
                      </div>

                      <div className="custom-input flex-grow-1">
                        <span>{translate1('redirectURL')}
                          <a href={`${homeUrl}${item.redirect_url}`} target="_blank"><Image src={`${basePath}/images/link-icon.svg`} width={20} height={20} alt='' /></a>
                        </span>
                        <input type="text" className="form-control" value={`${homeUrl} ${item.redirect_url}`} disabled />
                      </div>
                    </div>
                  </div>
                ))}


                <div className="optimizerList-box d-flex align-item-center gap-3">

                  <div className="URLEditor-inputList">
                    <div className="custom-input link-iconDropi flex-grow-1">
                      <span>
                      {translate1('currentURL')}
                        <a href={`${homeUrl}${url}`} target="_blank"><Image src={`${basePath}/images/link-icon.svg`} width={20} height={20} alt='' /></a>
                      </span>
                      <input type="text" className="form-control" value={`${homeUrl}${url}`} disabled />
                    </div>

                    <div className="custom-input prefix-input flex-grow-1">
                      <span>{translate1('newURL')}</span>
                      <OverlayTrigger overlay={<Tooltip>{homeUrl}</Tooltip>}>
                        <div className="urlEditor-prefix">{homeUrl}</div>
                      </OverlayTrigger>
                      <input type="text" className="form-control" value={newUrl} onChange={(e) => {
                        getAuditScoreOnChange(name, targetKeyword, titleTag, metaDescription, description, primaryImageAltText, e.target.value)
                        setNewUrl(e.target.value)
                      }} />
                      <div className="keyword-count">{homeUrl.length + newUrl.length}</div>
                    </div>

                    <div className="custom-input prefix-input flex-grow-1">
                      <span>{translate1('redirectURL')}</span>
                      <OverlayTrigger overlay={<Tooltip>{homeUrl}</Tooltip>}>
                        <div className="urlEditor-prefix">{homeUrl}</div>
                      </OverlayTrigger>
                      <input type="text" className="form-control" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} />
                      <div className="keyword-count">{homeUrl.length + redirectUrl.length}</div>
                    </div>
                  </div>

                  {urlData.length > 0 &&
                    <div className="optimizerProduct-actionInfo d-flex align-item-center gap-2">
                      <button type="button" className="btn btn-default" onClick={deleteRedirectUrl}><Image src={`${basePath}/images/delete-icon.svg`} width={20} height={20} alt='' /></button>
                    </div>}
                </div>
              </div>
            </div>
          </div>}


        <div className="d-flex gap-3 mb-22 justify-content-end tab-justify-content-start">
          <div className="content-frameHead-right">
            <button type="button" disabled={saveBtnLoading} className="custom-btn" onClick={() => {
              updateSeoAuditItem('')
            }}>{saveBtnLoading ? <Spinner size='sm' /> : translate1('saveAll')}</button>
            <button type="button" disabled={saveBtnLoading} className="btn-primary" onClick={() => {
              updateSeoAuditItem('exit')
            }}>{saveBtnLoading ? <Spinner size='sm' /> : translate1('saveAll_Exit')}</button>
          </div>
        </div>
      </div>
    </div >
  </>)
}