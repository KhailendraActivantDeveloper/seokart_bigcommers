import { useTranslations } from 'next-intl';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap'

export default function Home(Props: any) {
  const translate = useTranslations('common');

  return (
    <>
      <Modal show={Props.show} onHide={Props.handleClose}>
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5">{translate("emptyTitleTag")}</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-bulkOptimizer-modal">
            <div className="dashboard-bulkModal-list flex align-item-center justify-content-between">
              <div className="DBM-left">{translate('home')}:</div>
              <div className="DBM-left">{Props.home}</div>
            </div>

            <div className="dashboard-bulkModal-list flex align-item-center justify-content-between">
              <div className="DBM-left">{translate('product')}:</div>
              <div className="DBM-left">{Props.product}</div>
            </div>

            <div className="dashboard-bulkModal-list flex align-item-center justify-content-between">
              <div className="DBM-left">{translate('category')}:</div>
              <div className="DBM-left">{Props.category}</div>
            </div>

            <div className="dashboard-bulkModal-list flex align-item-center justify-content-between">
              <div className="DBM-left">{translate('brands')}:</div>
              <div className="DBM-left">{Props.brand}</div>
            </div>

            <div className="dashboard-bulkModal-list flex align-item-center justify-content-between">
              <div className="DBM-left">{translate('pages')}:</div>
              <div className="DBM-left">{Props.page}</div>
            </div>

            <div className="dashboard-bulkModal-list flex align-item-center justify-content-between">
              <div className="DBM-left">{translate('blogs')}:</div>
              <div className="DBM-left">{Props.blog}</div>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>)
}