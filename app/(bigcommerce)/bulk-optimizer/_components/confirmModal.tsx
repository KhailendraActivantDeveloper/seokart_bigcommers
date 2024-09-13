import { useTranslations } from '@/translator'
import { useState } from "react"
import { Modal } from "react-bootstrap"

type TranslateFunction = (key: string, options?: { [key: string]: string | number }) => string;

export default function Home(Props: any) {
  const translate = useTranslations('common');
  const translate1:TranslateFunction = useTranslations('bulkOptimizer');

  return (<>
    <Modal show={Props.show} onHide={Props.handleClose} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title><h1>{translate('livePreview')}</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="BulkOptimizer-PreviewArea">
          <div className="BulkOptimizer-Preview-Heading">
            <h6 className="Text--headingMd">{translate('livePreview')}</h6>
          </div>

          <div className="BulkOptimizer-Preview-Pera">
            <p className="pl-16 pr-16">
            {/* {`Our app will optimize all ${Props.selectedItem == 'product' ? translate('products') : Props.selectedItem == 'category' ? translate('categories') : translate('brands')} based on the template value entered on the left side. Please see below for a sample of a ${Props.selectedItem == 'product' ? translate('product') : Props.selectedItem == 'category' ? translate('category') : translate('brand')}'s ${Props.currentTab == 'titleTag' ? translate('titleTag') : (Props.currentTab == 'metaDescription') ? translate('metaDescription') : translate('altText')}.`} */}
            {
              translate1('pragraph5',
                {
                  item1: Props.selectedItem == 'product' ? translate('products') : Props.selectedItem == 'category' ? translate('categories') : translate('brands'), 
                  item2: Props.selectedItem == 'product' ? translate('product') : Props.selectedItem == 'category' ? translate('category') : translate('brand'), 
                  item3: Props.currentTab == 'titleTag' ? translate('titleTag') : (Props.currentTab == 'metaDescription') ? translate('metaDescription') : translate('altText')
                }
              )
            }
            </p>

            <ul>
              <li>
                <div className="d-flex align-item-center gap-3">
                  <span className="badge">{Props.selectedItem == 'product' ? translate('product') : Props.selectedItem == 'category' ? translate('category') : translate('brand')} {translate('url')}:</span>
                  <a href="" target="_blank">
                    {Props.homeUrl}{Props.previewData.url}
                  </a>
                </div>
              </li>

              <li>
                <div className="d-flex align-item-center gap-3">
                  <span className="badge">{translate('current')} {Props.currentTab == 'titleTag' ? translate('titleTag') : Props.currentTab == 'metaDescription' ? translate('metaDescription')  : translate('altText')}:</span>
                  <p>{Props.currentTab == 'titleTag' ? Props.previewData.title_tag : Props.currentTab == 'metaDescription' ? Props.previewData.meta_desc : Props.previewData.product_img_alt}</p>
                </div>
              </li>

              <li>
                <div className="d-flex align-item-center gap-3">
                  <span className="badge">{translate('new')} {Props.currentTab == 'titleTag' ? translate('titleTag') : Props.currentTab == 'metaDescription' ? translate('metaDescription') : translate('altText')}:</span>
                  <p>{Props.template?.replaceAll('[[product name]]', Props.previewData.product_name).replaceAll('[[sku]]', Props.previewData.sku).replaceAll('[[price]]', Props.previewData.price).replaceAll('[[type]]', Props.previewData.type).replaceAll('[[category name]]', Props.previewData.category_name).replaceAll('[[brand]]', Props.previewData.brand_name).replaceAll('[[mpn]]', Props.previewData.mpn).replaceAll('[[condition]]', Props.previewData.condition).replaceAll('[[condition]]', Props.previewData.condition).replaceAll('[[name]]', Props.previewData.brand_name)}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="custom-btn" onClick={Props.handleClose}>{translate('no')}</button>
        <button className="custom-btn" onClick={Props.handleYes}>{translate('yes')}</button>
      </Modal.Footer>
    </Modal>
  </>)
}