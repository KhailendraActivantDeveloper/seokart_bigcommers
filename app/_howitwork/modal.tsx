import { Modal } from "react-bootstrap"
import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl";
//import { basePath } from "@/next.config"

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home(Props: any) {
  const translate = useTranslations('howItWorks');

  const [howitwork, setHowitwork] = useState(false)
  return (
    <>
      <div className="headInfo-icon" onClick={() => {
        setHowitwork(true)
      }}>
        <Image src={`${basePath}/images/info-icon.svg`} alt='' width={20} height={20} />
      </div>
      <Modal show={howitwork} onHide={() => setHowitwork(false)} centered size="lg">
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5">
          {translate('headerHeading')}
          </h1>
        </Modal.Header>
        <Modal.Body>
          {Props.page == 'richsnippet' &&
            <p>{translate('richsnippet')}</p>}

          {Props.page == 'ranktracker' &&
            <>
              <p>{translate('ranktrackerPragraph')}</p>
              <ul>
                <li><p>{translate('ranktrackerUlLiPragraph1')}</p></li>
                <li>
                  <p>{translate('ranktrackerUlLiPragraph2')}</p>
                  <p>
                    <div className="howWork-modalImg">
                      <Image src={`${basePath}/images/howitwork/ranktracker.png`} width={694} height={226} alt="" />
                    </div>
                  </p>
                </li>
                <li><p>{translate('ranktrackerUlLiPragraph3')}</p></li>
                <li><p>{translate('ranktrackerUlLiPragraph4')}</p></li>
                <li><p>{translate('ranktrackerUlLiPragraph5')}</p></li>
                <li><p>{translate('ranktrackerUlLiPragraph6')}</p></li>
                <li><p>{translate('ranktrackerUlLiPragraph7')}</p></li>
              </ul>
            </>
          }


          {Props.page == 'bulkoptimizer' &&
            <>
              <p>{translate('bulkoptimizerPragraph')}</p>
              <ul>
                <li><p>{translate('bulkoptimizerUlLiPragraph1')}</p></li>
                <li>
                  <p>
                    <div className="howWork-modalImg widthAuto">
                      <Image src={`${basePath}/images/howitwork/bulkoptimizer1.png`} alt='' width={500} height={137} />
                    </div>
                  </p>
                </li>
                <li><p>{translate('bulkoptimizerUlLiPragraph2')}</p></li>
                <li><p>{translate('bulkoptimizerUlLiPragraph3')}</p></li>
                <li>
                  <p>
                    <div className="howWork-modalImg">
                      <Image src={`${basePath}/images/howitwork/bulkoptimizer2.png`} alt='' width={677} height={342} />
                    </div>
                  </p>
                </li>
                <li><p>{translate('bulkoptimizerUlLiPragraph4')}</p></li>
                <li><p>{translate('bulkoptimizerUlLiPragraph5')}</p></li>
                <li><p>{translate('bulkoptimizerUlLiPragraph6')}</p></li>
              </ul>
            </>
          }


          {Props.page == 'imageoptimizer' &&
            <>
              <p>{translate('imageoptimizerPragraph')}</p>
              <ul>
                <li>{translate('imageoptimizerUlLiPragraph1')}</li>
                <li>{translate('imageoptimizerUlLiPragraph2')}</li>
                <li>{translate('imageoptimizerUlLiPragraph3')}</li>
                <li>{translate('imageoptimizerUlLiPragraph4')}</li>
                <li>{translate('imageoptimizerUlLiPragraph5')}</li>
                <li>{translate('imageoptimizerUlLiPragraph6')}</li>
                <li>{translate('imageoptimizerUlLiPragraph7')}</li>
                <li>{translate('imageoptimizerUlLiPragraph8')}</li>
                <li>{translate('imageoptimizerUlLiPragraph9')}</li>
                <p style={{ "color": "red" }}>{translate('imageoptimizerUlPragraph')}</p>

              </ul>
            </>
          }


          {Props.page == 'urleditor' &&
            <>
              <p>{translate('urleditorPragraph1')}:</p>
              <ul>
                <li>{translate('urleditorUlLiPragraph1')}</li>
                <li>{translate('urleditorUlLiPragraph2')}</li>
                <li>{translate('urleditorUlLiPragraph3')}</li>
              </ul>
              <p>{translate('urleditorPragraph2')}:</p>
                <li>{translate('urleditorUlLiPragraph3')}</li>
              <ul>
                <li>{translate('urleditorUlLiPragraph4')}</li>
                <li>{translate('urleditorUlLiPragraph5')}</li>
              </ul>
            </>
          }

          {Props.page == '404fixer' &&
            <>
              <p>{translate('fixer404Pragraph')}</p>
              <ul>
                <li>{translate('fixer404UlLiPragraph1')}</li>
                <li>{translate('fixer404UlLiPragraph2')}</li>
              </ul>
            </>
          }

          {Props.page == 'analytics' &&
            <>
              <p>{translate('analyticsPragraph')}</p>
              <ul>
                <li>{translate('analyticsUlLiPragraph1')}</li>
                <li>{translate('analyticsUlLiPragraph2')}</li>
                <li>{translate('analyticsUlLiPragraph3')}</li>
              </ul>
            </>
          }

          {Props.page == 'seoaudit' &&
            <>
              <p>{translate('seoauditPragraph')}</p>
              <ul>
                <li>{translate('seoauditUlLiPragraph1')}</li>
                <li>{translate('seoauditUlLiPragraph2')}

                  <ul>
                    <li>{translate('seoauditUlLiPragraph3')}</li>
                    <li>{translate('seoauditUlLiPragraph4')}
                      <Image src='https://app.seokart.com/shop_app/images/faqnew/faq1.jpg' alt="" width={550} height={150} />

                    </li>
                    <li>{translate('seoauditUlLiPragraph5')}</li>
                    <li>{translate('seoauditUlLiPragraph6')}
                    <Image src='https://app.seokart.com/shop_app/images/faqnew/faq2.png' alt="" width={450} height={250} />

                    </li>
                    <li>{translate('seoauditUlLiPragraph7')}</li>
                    <li>{translate('seoauditUlLiPragraph8')}</li>
                  </ul>
                </li>
              </ul>
            </>
          }
        </Modal.Body>
      </Modal>
    </>)
}