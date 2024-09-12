import { useTranslations } from "next-intl";
import { Modal } from "react-bootstrap"

export default function Home(Props: any) {
	const translate = useTranslations('common');
	const translate1 = useTranslations('seoAudit');

  return (<>

    <Modal centered show={Props.show} onHide={Props.handleClose} backdrop="static">
      <Modal.Header><h4>{translate('alert')}</h4></Modal.Header>
      <Modal.Body><h4><p>{translate1('gptModalPragraph')}</p></h4></Modal.Body>
      <Modal.Footer>
        <button onClick={Props.handleClose} className="custom-btn">{translate('iUnderstand')}</button>
      </Modal.Footer>
    </Modal>

  </>)
}