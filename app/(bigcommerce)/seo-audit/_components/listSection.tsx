
import { Tab, Nav } from "react-bootstrap"
import PageList from './pageList'
import ErrorList from './errorList'
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl";

export default function Home() {
	const translate = useTranslations('common');

  const searchParams = useSearchParams()
  return (<>
    <div className="card">
      <Tab.Container defaultActiveKey={searchParams.get('tab')??'pages'}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="pages" style={{ "textDecoration": "none" }}>{translate('pages')}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="errors" style={{ "textDecoration": "none" }}>{translate('errors')}</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="pages"><PageList /></Tab.Pane>
          <Tab.Pane eventKey="errors"><ErrorList /></Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  </>)
}