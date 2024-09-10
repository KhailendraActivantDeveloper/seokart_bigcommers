import Dropdown from 'react-bootstrap/Dropdown';
import Image from "next/image"
import { useTranslations } from 'next-intl';
//import { basePath } from "../../next.config.js"

const basePath = process.env.NEXT_PUBLIC_BASEPATH??''

export default function Home() {
  const translate = useTranslations('common');

  return (<>
    <div className="topHeader-menu">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <Image src={`${basePath}/images/hamburger-menu.svg`} alt="" width={16} height={14} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href={`${basePath}/upgrade?tab=app`}><Image src={`${basePath}/images/upgrade-icon.svg`} alt='' width={20} height={20} /> {translate('upgrade')}</Dropdown.Item>
          <Dropdown.Item href={`${basePath}/upgrade?tab=seoServices`}><Image src={`${basePath}/images/seo-services-icon.svg`} alt='' width={20} height={20} /> {translate('seoServices')}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href={`${basePath}/help?tab=faqs`}><Image src={`${basePath}/images/faqs-icon.svg`} alt='' width={20} height={20} /> {translate('faqs')}</Dropdown.Item>
          <Dropdown.Item href={`${basePath}/help?tab=ask-an-expert`}><Image src={`${basePath}/images/ask-and-expert-icon.svg`} alt='' width={20} height={20} /> {translate('askAnExpert')}</Dropdown.Item>
          <Dropdown.Item href={`${basePath}/help?tab=report-restore`}><Image src={`${basePath}/images/report-restore-icon.svg`} alt='' width={20} height={20} /> {translate('reportRestore')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </>)
}