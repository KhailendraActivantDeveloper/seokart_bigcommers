import { Modal } from "react-bootstrap"
import { useState } from "react"
import Image from "next/image"
import { useTranslations } from '@/translator'
// import { basePath } from "@/next.config"
const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home(Props: any) {
  const translate = useTranslations('analytics');
  return (
    <>
      <Modal show={Props.show} onHide={Props.onHide} centered size="lg">
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5">
           {translate('stepModalPragraph1')}
          </h1>
        </Modal.Header>
        <Modal.Body>
          <h5 className="Text--headingLg">GA4</h5>


          <h5 className="Text--headingSm mt-24">{translate('stepModalPragraph2')}</h5>
          <div className="howWork-modalImg mb-16">
            <Image src={`${basePath}/images/analytics/ga1.png`} width={709} height={262} alt=""/>
          </div>


          <h5 className="Text--headingSm mt-24">{translate('stepModalPragraph3')}</h5>
          <div className="howWork-modalImg mb-16">
            <Image src={`${basePath}/images/analytics/ga2.png`} width={709} height={262} alt=""/>
          </div>


          <h5 className="Text--headingSm mt-24">{translate('stepModalPragraph4')}</h5>
          <div className="howWork-modalImg widthAuto mb-16">
            <Image src={`${basePath}/images/analytics/ua4.png`} width={709} height={262} alt=""/>
          </div>


          <h5 className="Text--headingSm mt-24">{translate('stepModalPragraph5')}</h5>
          <div className="howWork-modalImg mb-16">
            <Image src={`${basePath}/images/analytics/ga5.png`} width={709} height={262} alt=""/>
          </div>


          <h5 className="Text--headingSm mt-24">{translate('stepModalPragraph6')}</h5>
          <div className="howWork-modalImg mb-16">
            <Image src={`${basePath}/images/analytics/ga6.png`} width={709} height={262} alt=""/>
          </div>


          <div className="howWork-modalImg">
            <p className="mb-0">{translate('stepModalPragraph7')}</p>
          </div>


          <h5 className="Text--headingSm mt-24"></h5>

        </Modal.Body>
      </Modal>
    </>)
}