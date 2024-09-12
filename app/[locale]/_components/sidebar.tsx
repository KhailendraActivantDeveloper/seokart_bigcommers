'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import Image from 'next/image'
import {Link} from '@/navigation'
import { Dropdown } from 'react-bootstrap'
import { useTranslations } from 'next-intl'

const basePath = process.env.NEXT_PUBLIC_BASEPATH??""

export default function Sidebar({handleOnChange}:{handleOnChange:any}) {
  const translate = useTranslations('common');
  const translate1 = useTranslations('NotFoundFixer');

  const segment = useSelectedLayoutSegment()

  return (<>
    <div className="sidebar">
      <nav className="custom-navbar">
        <ul>
          <li className="nav-logo">
            <a href="#">
              <div className="logo-icon"><Image src={`${basePath}/images/logo-icon.svg`} alt='' width={40} height={40} /></div>
              <div className="menu-hover-logo align-item-center gap-3">
                <Image src={`${basePath}/images/logo.svg`} alt='' width={155} height={34} />
                <button type="button" onClick={handleOnChange}><Image src={`${basePath}/images/menu-icon.svg`} alt='' width={20} height={18} /></button>
              </div>
            </a>
          </li>

          <li>
            <Link prefetch={false} href="/dashboard" className={segment == 'dashboard' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/dashboard-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('dashboard')}</span>
            </Link>
          </li>

          <li>
            <Link prefetch={false} href="/analytics" className={segment == 'analytics' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/analytics-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('analytics')}</span>
            </Link>
          </li>

          <li>
            <Link prefetch={false} href="/rank-tracker" className={segment == 'rank-tracker' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/rank-tracker-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('rankTracker')}</span>
            </Link>
          </li>

          <li className="nav-separator"></li>

          <li>
            <Link prefetch={false} href="/seo-audit" className={segment == 'seo-audit' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/seo-audit-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('seoOptimizer')}</span>
            </Link>
          </li>

          <li>
            <Link prefetch={false} href="/bulk-optimizer" className={segment == 'bulk-optimizer' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/bulk-optimizer-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('bulkOptimizer')}</span>
            </Link>
          </li>

          <li>
            <Link prefetch={false} href="/image-optimizer" className={segment == 'image-optimizer' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/image-optimizer-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('imageOptimizer')}</span>
            </Link>
          </li>

          <li>
            <Link prefetch={false} href="/rich-snippets" className={segment == 'rich-snippets' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/rich-snippets-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('richSnippets')}</span>
            </Link>
          </li>

          <li>
            <Dropdown>
              <Dropdown.Toggle>
                <div className="nav-icon"><Image src={`${basePath}/images/url-editor-main-icon.svg`} width={20} height={20} alt='' /></div>
                <span className="nav-text">{translate('404URL')}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>

                <Link href="/404-fixer" className={segment == '404-fixer' ? 'active' : ''}>
                  <div className="nav-icon">
                    <Image src={`${basePath}/images/404-fixer-icon.svg`} width={20} height={20} alt='' />
                  </div>
                  <span className="nav-text">{translate1('404Fixer')}</span>
                </Link>


                <Link href="/url-editor" className={segment == 'url-editor' ? 'active' : ''}>
                  <div className="nav-icon">
                    <Image src={`${basePath}/images/url-editor-icon.svg`} width={20} height={20} alt='' />
                  </div>
                  <span className="nav-text">{translate('urlEditor')}</span>
                </Link>

              </Dropdown.Menu>
            </Dropdown>

          </li>

          <li>
            <Link prefetch={false} href="/page-speed" className={segment == 'page-speed' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/page-speed-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('pageSpeed')}</span>
            </Link>
          </li>

          <li className="nav-separator"></li>

          <li>
            <Link prefetch={false} href="/upgrade?tab=app" className={segment == 'upgrade?tab=app' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/upgrade-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('upgrade')}</span>
            </Link>
          </li>

          <li>
            <Link prefetch={false} href="/upgrade?tab=seoServices" className={segment == 'upgrade?tab=seoServices' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/seo-services-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('seoServices')}</span>
          </Link>
          </li>

          <li>
            <Link prefetch={false} href="/help" className={segment == 'help' ? 'active' : ''}>
              <div className="nav-icon"><Image src={`${basePath}/images/help-icon.svg`} alt='' width={20} height={20} /></div>
              <span className="nav-text">{translate('help')}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </>)

}