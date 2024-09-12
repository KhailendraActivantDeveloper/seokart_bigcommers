'use client'

import dynamic from "next/dynamic"
import { useState } from "react"
import { Api } from "@/app/_api/apiCall"
import { toast } from "react-toastify"
import { Modal } from "react-bootstrap"

const ChannelList = dynamic(() => import("@/app/[locale]/_components/channelList"), { ssr: false })
const Howitwork = dynamic(() => import("@/app/_howitwork/modal"), { ssr: false })
const CountSection = dynamic(() => import('./_components/countSection'), { ssr: false })
const ListSection = dynamic(() => import('./_components/listSection'), { ssr: false })
import Confirmation from "@/app/[locale]/_components/confirmation"
import UpgradeButton from "../../_components/upgradeButton"
import Hamburger from '../../_components/hamburger'
import Languagedropdown from '@/app/[locale]/_components/languageDropdown'
import { useTranslations } from "next-intl"



export default function Home() {
	const [syncStatus, setSyncStatus] = useState(0)
	const [syncModal, setSyncModal] = useState(false)
	const [ConfirmationModal, setConfirmationModal] = useState(false)
	const translate = useTranslations('seoAudit');
	const translate1 = useTranslations('common');


	const synchronization = () => {
		setConfirmationModal(false)
		Api('synchronization').then((data) => {
			setSyncStatus(0)
			toast.success(translate('SynchronizationJobSuccess'));
		})
	}
	return (<>
		<Confirmation
			show={ConfirmationModal}
			handleClose={() => setConfirmationModal(false)}
			message={<><p>{translate('confirmationForSynchronizationP1')}</p><p>{translate('confirmationForSynchronizationP2')}</p></>}
			handleYes={synchronization}
			handleNo={() => setConfirmationModal(false)}
		/>
		<Modal centered show={syncModal} onHide={() => setSyncModal(false)} backdrop="static">
			<Modal.Header><h4>{translate('modalHeaderHeading')}</h4></Modal.Header>
			<Modal.Body>
				<p>{translate('modalBodyPragraph1')}</p>
				<p>{translate('modalBodyPragraph2')}</p>
			</Modal.Body>
			<Modal.Footer>
				<button className="custom-btn" onClick={() => setSyncModal(false)}>{translate1('close')}</button>
			</Modal.Footer>
		</Modal>

		<div className="content-frame-main">
			<div className="content-frame-head flex justify-content-between align-item-center">
				<div className="content-frameHead-left flex align-item-center gap-2">					
					<h1 className="Text--headingLg flex align-item-center gap-2">
						{translate1("seoOptimizer")}
						<Howitwork page='seoaudit'/>						
					</h1>
					<ChannelList />
				</div>

				<div className="content-frameHead-right">
					<button type="button" className="btn-primary headBtn-link" onClick={() => {
						if (syncStatus == 2)
							setSyncModal(true)
						else
						setConfirmationModal(true)
					}
					} disabled={syncStatus == 0 ? true : false}>{syncStatus == 0 ? translate1('syncStatus0') : translate1('syncStatus1')}</button>
					<Languagedropdown />
					<UpgradeButton />
					<Hamburger />
				</div>
			</div>

			<div className="seo-optimizerMain">
				<CountSection setSyncStatus={(status: number) => setSyncStatus(status)} />
				<ListSection />
			</div>
		</div>
	</>)
}