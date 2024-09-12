'use client'

import { useState } from "react"
import { Api } from "@/app/_api/apiCall"
import { toast } from "react-toastify"
import { Spinner } from "react-bootstrap"
import { useTranslations } from "next-intl"

export default function Home() {

  const translate = useTranslations('common');
  const translate1 = useTranslations('help');

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [subject, setSubject] = useState(translate('pageSpeedImprovement'))
  const [query, setQuery] = useState('')
  const [btnLoading,setBtnLoading] = useState(false)

  const [error, setError] = useState({ name: false, email: false, validEmail: false, website: false, query: false })

  const submitQuery = ()=>{
    setBtnLoading(true)
    Api('askAnExpert',{
      name:name,
      email:email,
      website:website,
      subject:subject,
      yourquery:query
    }).then(()=>{
      setName('')
      setEmail('')
      setWebsite('')
      setQuery('')
      setBtnLoading(false)
      toast.success(translate1('faqQueryMsg'))
    })
  }

  return (<>
    <div className="ask-expertArea">
      <div className="row">
        <div className="col-md-4">
          <div className="ask-expertLeft">
            <h5 className="Text--headingLg">{translate('askAnExpert')}</h5>
            <p>{translate1('faqQueryRegardingMsg')}</p>
          </div>
        </div>

        <div className="col-md-8">
          <div className="ask-expertRight">
            <div className="card">
              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="custom-input mb-26">
                    <span>{translate('yourName')}</span>
                    <input type="text" className="form-control" value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value.trim() == '') {
                          setError((error) => ({ ...error, name: true }))
                        } else {
                          setError((error) => ({ ...error, name: false }))
                        }
                      }}
                    />
                    {error.name && <p className="red-text">{translate('nameRequired')}</p>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="custom-input mb-26">
                    <span>{translate('yourEmail')}</span>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => {
                        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        if (e.target.value.trim() == '') {
                          setError((error) => ({ ...error, email: true }))
                        } else {
                          setError((error) => ({ ...error, email: false }))
                        }
                        if(emailPattern.test(e.target.value.trim())){
                          setError((error) => ({ ...error, validEmail: false }))
                        }else{
                          setError((error) => ({ ...error, validEmail: true }))
                        }
                      }}
                    />
                    {error.email && <p className="red-text">{translate('emailRequired')}</p>}
                    {error.validEmail && <p className="red-text">{translate('emailInvalid')}</p>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="custom-input mb-26">
                    <span>{translate('yourWebsite')}</span>
                    <input type="text" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value.trim() == '') {
                          setError((error) => ({ ...error, website: true }))
                        } else {
                          setError((error) => ({ ...error, website: false }))
                        }
                      }}
                    />
                    {error.website && <p className="red-text">{translate('websiteRequired')}</p>}
                  </div>
                </div>

                <div className="col-md-12 mb-26">
                  <div className="custom-dropi">
                    <span>{translate('selectSubject')}</span>
                    <select className="form-select" aria-label="Default select example" value={subject} onChange={(e) => setSubject(e.target.value)}>
                      <option value="Page Speed Improvement">{translate('pageSpeedImprovement')}</option>
                      <option value="SEO Consultancy">{translate('seoConsultancy')}</option>
                      <option value="Managed Services">{translate('managedServices')}</option>
                      <option value="Others">{translate('others')}</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="custom-textarea">
                    <span className="textarea-heading">{translate1('yourQuery')}</span>
                    <textarea className="form-control" value={query} onChange={(e) => setQuery(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value.trim() == '') {
                        setError((error) => ({ ...error, query: true }))
                      } else {
                        setError((error) => ({ ...error, query: false }))
                      }
                    }}
                    ></textarea>
                    {error.query && <p className="red-text">{translate1('queryRequired')}</p>}
                  </div>
                </div>

                <div className="full-btn mt-22">
                  <button type="button" onClick={submitQuery} className={`custom-btn ${(name.trim() && email.trim() && website.trim() && query.trim() && !error.validEmail) ? '' : 'btn-disable'}`} disabled={(name.trim() && email.trim() && website.trim() && query.trim() && !error.validEmail) ? false :true }>{btnLoading ? <Spinner size="sm"/> : translate1('submitQuery')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}