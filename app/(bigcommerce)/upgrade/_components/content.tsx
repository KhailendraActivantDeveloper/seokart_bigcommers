import Image from "next/image"
// import { basePath } from "@/next.config"
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import dynamic from "next/dynamic";
import Payment from './payment'
import { useEffect } from 'react'
import { useTranslations } from '@/translator'


const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home(Props: any) {

  const translate = useTranslations('common');
  const translate1 = useTranslations('pricingFeature');

  return (<>
    <div className="content-frame-head flex justify-content-between align-item-center">
      <div className="content-frameHead-left">
        <h1 className="Text--headingLg flex align-item-center gap-2">
          <button type="button" className="headBack-btn" onClick={Props.setShowInnerPage}>
            <Image src={`${basePath}/images/back-icon.svg`} alt='' width={20} height={20} />
          </button>
          {translate('back')}
        </h1>
      </div>
    </div>

    <div className="pricing-Detailsmain">
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            <p className="text-subbed mb-2">{Props.planName}</p>
            <h5 className="Text--headingLg mb-0">US$ {Props.price}/{translate('month')}</h5>
          </div>

          <div className="card">
            {Props.planName == 'pro' ?
              <div className="d-grid grid-column-2 gap-24">
                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('products')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph1')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('keywordsRankTracking')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph2')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('advancedSEOAudit')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph3')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('rankTrackingFrequency')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph4')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('imageOptimizer')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph5')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('bulkOptimizer')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph6')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('seoRichSnippets')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph7')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate1('coreFeaturesListItem2')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph8')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('analytics')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph9')}</p>
                </div>

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('urlEditor')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph10')}</p>
                </div>
     

               

                <div className="card-border">
                  <h5 className="Text--headingLg">{translate('subUsersAccess')}</h5>
                  <p className="mb-0">{translate1('overlayTriggerPragraph11')}</p>
                </div>
              </div> :
              Props.planName == 'startup' ?
                <div className="d-grid grid-column-2 gap-24">
                  <div className="card-border">
                    <h5 className="Text--headingLg">{translate('keywordsResearch')} </h5>
                    <p className="mb-0"> {translate1('overlayTriggerPragraph12')}</p>
                  </div>

                  <div className="card-border">
                    <h5 className="Text--headingLg">{translate('technicalAudit')}</h5>
                    <p className="mb-0"> {translate1('overlayTriggerPragraph13')}</p>
                  </div>

                  <div className="card-border">
                    <h5 className="Text--headingLg">{translate('advancedOnPageOptimization')}</h5>
                    <p className="mb-0">{translate1('overlayTriggerPragraph14')}</p>
                  </div>

                  <div className="card-border">
                    <h5 className="Text--headingLg">{translate('standardBacklinks')}</h5>
                    <p className="mb-0">{translate1('overlayTriggerPragraph19')}</p>
                  </div>

                  <div className="card-border">
                    <h5 className="Text--headingLg">{translate('onePointContact')}</h5>
                    <p className="mb-0"> {translate1('overlayTriggerPragraph17')}</p>
                  </div>

                  <div className="card-border">
                    <h5 className="Text--headingLg">{translate('monthlyReporting')} </h5>
                    <p className="mb-0">{translate1('overlayTriggerPragraph18')}</p>
                  </div>


                </div> :
                Props.planName == 'professional' ?
                  <div className="d-grid grid-column-2 gap-24">
                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('keywordsResearch')} </h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph12')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('technicalAudit')}</h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph13')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('advancedOnPageOptimization')}</h5>
                      <p className="mb-0">{translate1('overlayTriggerPragraph14')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('standardBacklinks')}</h5>
                      <p className="mb-0">{translate1('overlayTriggerPragraph19')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('onePointContact')}</h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph17')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('blogPosts')} </h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph16')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('monthlyReporting')} </h5>
                      <p className="mb-0">{translate1('overlayTriggerPragraph18')}</p>
                    </div>


                  </div> :

                  <div className="d-grid grid-column-2 gap-24">
                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('keywordsResearch')} </h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph12')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('technicalAudit')}</h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph13')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('advancedOnPageOptimization')}</h5>
                      <p className="mb-0">{translate1('overlayTriggerPragraph14')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('standardBacklinks')}</h5>
                      <p className="mb-0">{translate1('overlayTriggerPragraph19')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('onePointContact')}</h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph17')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('blogPosts')} </h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph16')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg"> {translate('highDALinks')} </h5>
                      <p className="mb-0"> {translate1('overlayTriggerPragraph15')}</p>
                    </div>

                    <div className="card-border">
                      <h5 className="Text--headingLg">{translate('monthlyReporting')} </h5>
                      <p className="mb-0">{translate1('overlayTriggerPragraph18')}</p>
                    </div>


                  </div>
            }

            <div className="full-btn mt-24">
              <button type="button" className="custom-btn" onClick={Props.setShowInnerPage}>{translate('changePlan')}</button>
            </div>
          </div>
        </div>
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENTID ?? '',
            components: "buttons",
            intent: "subscription",
            vault: true,
          }}
        >
          <Payment Props={Props} />
        </PayPalScriptProvider>
      </div>
    </div>
  </>)
}