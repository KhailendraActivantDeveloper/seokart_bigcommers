import { Accordion, Card } from 'react-bootstrap'
import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from '@/translator'

export default function Home() {
	const translate = useTranslations('common');
	const translate1 = useTranslations('help');
	const [search, setSearch] = useState('')
    const [faqData, setFaqData] =  useState<any[]>([]);

    const loadFaqData = useCallback(()=>{
        setFaqData(
            [
            {
                category: translate('bestPractices'),
                visible: true,
                faqs: [
                    {
                        question: translate1('bestPracticesFAQQuestion1'),
                        answer: (<><p>{translate1('bestPracticesFAQQuestion1Answer1')} </p><p>{translate1('bestPracticesFAQQuestion1Answer2')}</p></>),
                        visible: true,
                        toggleOpen: false
                    },
                    {
                        question: translate1('bestPracticesFAQQuestion2'),
                        answer: (<><p>{translate1('bestPracticesFAQQuestion2Answer1')}</p><p>{translate1('bestPracticesFAQQuestion2Answer2')}</p> <p>{translate1('bestPracticesFAQQuestion2Answer3')} </p></>),
                        visible: true,
                        toggleOpen: false
                    },
                    {
                        question: translate1('bestPracticesFAQQuestion3'),
                        answer: (<><p>{translate1('bestPracticesFAQQuestion3Answer1')} </p><p>{translate1('bestPracticesFAQQuestion3Answer2')} </p><p>{translate1('bestPracticesFAQQuestion3Answer3')}</p><p>{translate1('bestPracticesFAQQuestion3Answer4')}</p></>),
                        visible: true,
                        toggleOpen: false
                    }
                ]
    
            },
        ])
    },[translate, translate1])

    const searchFaq = useCallback(() => {
		const categoryResults = [];
		for (const category of faqData) {
			const results = []; let isAnyFaqVisible = 0
			for (const faq of category.faqs) {
				if (faq.question.toLowerCase().includes(search.toLowerCase())) {
					isAnyFaqVisible = 1
					results.push({ ...faq, visible: true })
				} else {
					results.push({ ...faq, visible: false })
				}
			}
			if (isAnyFaqVisible) {
				categoryResults.push({ ...category, faqs: results, visible: true })
			} else {
				categoryResults.push({ ...category, faqs: results, visible: false })
			}

		}
		setFaqData(categoryResults)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, faqData])

    useEffect(() => {
        loadFaqData();
      }, [loadFaqData]);

	useEffect(() => {
		searchFaq()
	}, [searchFaq])
	return (<>
		<div className="faqs-area">
			<div className="row">
				<div className="col-md-3">
					<div className="faqs-left">
						<div className="card">
							<div className="custom-input icon-input without-labelInput">
								<i className="input-icon"><img width={"90%"} src="images/search-icon.svg" alt="" /></i>
								<input type="text" placeholder="Search FAQs" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} />
							</div>
						</div>

						<div className="card">
							<div className="FAQs-list">
								<ul>
									{faqData.map((item, key) => (
										<>
											<li key={key}><a href={`#${item.category.replaceAll(' ', '')}`}>{item.category}</a></li>
										</>

									))}

								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-9">
					<div className="faqs-right">
						<div className="card">
							{faqData.map((items, key) => (
								<>
									{items.visible &&
										<div key={key} >
											<h5 className={`Text--headingLg ${key == 0 ? 'mt-0' : ''}`} id={`${items.category.replaceAll(' ', '')}`}>{items.category}</h5>
											{items.faqs.map((item: any, keyIndex: number) => (
												<>
													<div className="faqCollapse-box" key={keyIndex}>
														{item.visible &&
															<Accordion >
																<Accordion.Item eventKey="0" >
																	<Accordion.Header>{item.question }</Accordion.Header>
																	<Accordion.Body>{item.answer}</Accordion.Body>
																</Accordion.Item>
															</Accordion>}
													</div>
												</>
											))}
										</div>}
								</>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	</>)}