import { useTranslations } from "next-intl";
import { Modal} from "react-bootstrap"

export default function Home(Props: any) {
  const translate = useTranslations('common');

  return (<>

    <Modal centered show={Props.show} onHide={Props.handleClose} backdrop="static">
      <Modal.Header><h4>{translate("alert")}</h4></Modal.Header>
      <Modal.Body><h4>{Props.message}</h4></Modal.Body>
      <Modal.Footer>
        <button className="custom-btn" onClick={Props.handleNo}>{translate("cancel")}</button>
        <button className="custom-btn" onClick={Props.handleYes}>{translate("continue")}</button>
      </Modal.Footer>
    </Modal>

  </>)
}