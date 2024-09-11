import { Accordion, Card } from 'react-bootstrap'
import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Home() {
	const translate = useTranslations('common');
	const translate1 = useTranslations('help');
	const [search, setSearch] = useState('')
	const [faqData, setFaqData] = useState([
		{
			category: translate('general'),
			visible: true,
			faqs: [
				{
					question: translate1('faqQuestions1'),
					answer: (<>
					<p>{translate1('faqQuestions1Answer1')}</p><p>{translate1('faqQuestions1Answer2')}</p><p>{translate1('faqQuestions1Answer3')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('faqQuestions2'),
					answer: (<><p>{translate1('faqQuestions2Answer1')}</p><p> {translate1('faqQuestions2Answer2')} </p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('faqQuestions3'),
					answer: (<><p>{translate1('faqQuestions3Answer1')} </p><p>{translate1('faqQuestions3Answer2')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('faqQuestions4'),
					answer: (<><p>{translate1('faqQuestions4Answer1')} </p><p>{translate1.rich('faqQuestions4Answer2', { email: (chunks) => (<a href="mailto:hi@SEOKart.com">{chunks}</a>)})}</p></>),
					visible: true,
					toggleOpen: false
				}
			]
		},
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
		{
			category: translate('seoOptimizer'),
			visible: true,
			faqs: [
				{
					question: translate1('seoOptimizerFAQQuestion1'),
					answer: (<>{translate1('seoOptimizerFAQQuestion1Answer1')}<ol><li> {translate1('seoOptimizerFAQQuestion1Answer1Li1')}</li><li>{translate1('seoOptimizerFAQQuestion1Answer1Li2')}</li><li>{translate1('seoOptimizerFAQQuestion1Answer1Li3')}<ul><li>{translate1('seoOptimizerFAQQuestion1Answer1Li1Li1')}</li><li>{translate1('seoOptimizerFAQQuestion1Answer1Li1Li2')}<div className='Auditimg'><span> <img width={"90%"} src='https://app.seokart.com/shop_app/images/faqnew/faq1.jpg' /></span></div></li><li>{translate1('seoOptimizerFAQQuestion1Answer1Li1Li3')} </li><li>{translate1('seoOptimizerFAQQuestion1Answer1Li1Li4')} <div className='Auditimg AI-audit-fullImg'><span><img width='80%' src='https://app.seokart.com/shop_app/images/faqnew/faq2.png' /></span></div></li><li>{translate1('seoOptimizerFAQQuestion1Answer1Li1Li5')}</li><li>{translate1('seoOptimizerFAQQuestion1Answer1Li1Li6')}</li></ul></li></ol></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion2'),
					answer: (<><p> {translate1('seoOptimizerFAQQuestion2Answer1')}</p><p>{translate1('seoOptimizerFAQQuestion2Answer2')}</p><p>{translate1('seoOptimizerFAQQuestion2Answer3')}</p><p>{translate1('seoOptimizerFAQQuestion2Answer4')}</p><div className="Auditimg"><span><img src="https://app.seokart.com/shop_app/images/faqnew/faq3.png" /></span></div></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion3'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion3Answer1')}</p><p> {translate1('seoOptimizerFAQQuestion3Answer2')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion4'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion4Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion5'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion5Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion6'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion6Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion7'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion7Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion8'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion8Answer1')}</p><div className="Auditimg"><span><img width={"90%"} src="https://app.seokart.com/shop_app/images/faqnew/faq4.png" alt="" /></span></div></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion9'),
					answer: (<><ul><li>{translate1('seoOptimizerFAQQuestion9Answer1Li1')}</li><li>{translate1('seoOptimizerFAQQuestion9Answer1Li2')}</li><li>{translate1('seoOptimizerFAQQuestion9Answer1Li3')}</li></ul><div className="Auditimg AI-audit-fullImg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq5.png" /></span></div><p>{translate1('seoOptimizerFAQQuestion9Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion10'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion10Answer1')}</p><div className="Auditimg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq6.png" alt="" /></span></div><p>{translate1('seoOptimizerFAQQuestion10Answer2')}</p><p>{translate1('seoOptimizerFAQQuestion10Answer3')}</p><div className="Auditimg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq7.png" alt=""  /></span></div></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion11'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion11Answer1')}</p><p><strong>{translate1('seoOptimizerFAQQuestion11Answer1Li')}:</strong></p><ul><li>{translate1('seoOptimizerFAQQuestion11Answer1Li1')}</li><li>{translate1('seoOptimizerFAQQuestion11Answer1Li2')}</li><li>{translate1('seoOptimizerFAQQuestion11Answer1Li3')}</li></ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion12'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion12Answer1')}</p><ul><li>{translate1('seoOptimizerFAQQuestion12Answer1Li1')}<div className="Auditimg AI-audit-fullImg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq8.png" alt="" /></span></div></li><li>{translate1('seoOptimizerFAQQuestion12Answer1Li2')}<div className="Auditimg AI-audit-fullImg"><span><img width="90%"src="https://app.seokart.com/shop_app/images/faqnew/faq9.png" alt="" /></span></div></li></ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion13'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion13Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion14'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion14Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion15'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion15Answer1')}</p><div className="Auditimg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq10.png" alt="" /></span></div><p>{translate1('seoOptimizerFAQQuestion15Answer2')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('seoOptimizerFAQQuestion16'),
					answer: (<><p>{translate1('seoOptimizerFAQQuestion16Answer1')}</p><p>{translate1('seoOptimizerFAQQuestion16Answer2')} </p></>),
					visible: true,
					toggleOpen: false
				}
			]

		},
		{
			category: translate('bulkOptimizer'),
			visible: true,
			faqs: [
				{
					question: translate1('bulkOptimizerFAQQuestion1'),
					answer: (<><p> {translate1('bulkOptimizerFAQQuestion1Answer1')}</p><ul><li>{translate1('bulkOptimizerFAQQuestion1Answer1Li1')}</li><li>{translate1('bulkOptimizerFAQQuestion1Answer1Li2')}<div className="Auditimg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq11.png" /></span></div></li><li>{translate1('bulkOptimizerFAQQuestion1Answer1Li3')}</li><li>{translate1('bulkOptimizerFAQQuestion1Answer1Li4')}<div className="Auditimg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq12.png" /></span></div></li><li>{translate1('bulkOptimizerFAQQuestion1Answer1Li5')}</li><li>{translate1('bulkOptimizerFAQQuestion1Answer1Li6')}</li><li>{translate1('bulkOptimizerFAQQuestion1Answer1Li7')}</li></ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion2'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion2Answer1')}</p><ul><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li1')}</li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li2')}</li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li3')}</li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li4')}</li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li5')}</li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li6')}<div className="Auditimg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq13.png" alt="" /></span></div></li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li7')}</li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li8')}</li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li9')}</li></ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion3'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion3Answer1')}</p><ul><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li1')}</li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li1')} </li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li2')}</li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li3')}</li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li4')}</li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li5')}</li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li6')}</li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li7')}</li></ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion4'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion4Answer1')}</p><ul><li>{translate1('bulkOptimizerFAQQuestion4Answer1Li1')}</li><li>{translate1('bulkOptimizerFAQQuestion4Answer1Li2')}</li><li>{translate1('bulkOptimizerFAQQuestion4Answer1Li3')}</li><li>{translate1('bulkOptimizerFAQQuestion4Answer1Li4')}</li><li>{translate1('bulkOptimizerFAQQuestion4Answer1Li5')}</li><li>{translate1('bulkOptimizerFAQQuestion4Answer1Li6')}</li><li>{translate1('bulkOptimizerFAQQuestion2Answer1Li8')}</li><li>{translate1('bulkOptimizerFAQQuestion4Answer1Li7')}</li><li>{translate1('bulkOptimizerFAQQuestion4Answer1Li8')}</li></ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion5'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion5Answer1')}</p><ul><li>{translate1('bulkOptimizerFAQQuestion5Answer1Li1')}</li><li>{translate1('bulkOptimizerFAQQuestion5Answer1Li2')}</li></ul><div className="Auditimg AI-audit-fullImg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq14.png" alt="" /></span></div></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion6'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion6Answer1')}</p><ul><li>{translate1('bulkOptimizerFAQQuestion6Answer1Li1')}</li><li>{translate1('bulkOptimizerFAQQuestion6Answer1Li2')}</li><li>{translate1('bulkOptimizerFAQQuestion6Answer1Li3')}</li><li>{translate1('bulkOptimizerFAQQuestion6Answer1Li4')}</li><li>{translate1('bulkOptimizerFAQQuestion6Answer1Li5')}<div className="Auditimg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq15.png" alt="" /></span></div></li><li>{translate1('bulkOptimizerFAQQuestion6Answer1Li6')}</li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li6')}</li><li>{translate1('bulkOptimizerFAQQuestion3Answer1Li7')}</li></ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion7'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion7Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion8'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion8Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion9'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion9Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('bulkOptimizerFAQQuestion10'),
					answer: (<><p>{translate1('bulkOptimizerFAQQuestion10Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				}
			]

		},
		{
			category: translate('imageOptimizer'),
			visible: true,
			faqs: [
				{
					question: translate1('imageOptimizerFAQQuestion1'),
					answer: (<>
					<p>{translate1('imageOptimizerFAQQuestion1Answer1')}</p>
					<ul>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li1')} </li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li2')}</li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li3')}.</li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li4')}</li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li5')}</li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li6')}</li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li7')}</li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li8')}</li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li9')}</li>
						<li>{translate1('imageOptimizerFAQQuestion1Answer1Li10')}</li>
					</ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('imageOptimizerFAQQuestion2'),
					answer: (<><p>{translate1('imageOptimizerFAQQuestion2Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('imageOptimizerFAQQuestion3'),
					answer: (<><p>{translate1('imageOptimizerFAQQuestion3Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('imageOptimizerFAQQuestion4'),
					answer: (<><p> {translate1('imageOptimizerFAQQuestion4Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('imageOptimizerFAQQuestion5'),
					answer: (<><p> {translate1('imageOptimizerFAQQuestion5Answer1')} </p>
					<div className="Auditimg"><span><img width="90%" src="https://app.seokart.com/shop_app/images/faqnew/faq16.png" alt="" /></span></div>
					<p>{translate1('imageOptimizerFAQQuestion5Answer2')}</p></>),
					visible: true,
					toggleOpen: false
				}
			]
		},
		{
			category: translate('analytics'),
			visible: true,
			faqs: [
				{
					question: translate1('analyticsFAQQuestion1'),
					answer: (<>
					<p>{translate1('analyticsFAQQuestion1Answer1')}</p>
					<ul>
					<li>{translate1('analyticsFAQQuestion1Answer1Li1')}</li>
					<li>{translate1('analyticsFAQQuestion1Answer1Li2')}</li>
					<li>{translate1.rich('analyticsFAQQuestion1Answer1Li3', {
							email: (chunks) => (
							<a href="mailto:hi@SEOKart.com">{chunks}</a>
							),
						})}</li>
					</ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('analyticsFAQQuestion2'),
					answer: (<><p>{translate1('analyticsFAQQuestion2Answer1')}</p>
						<div className="Auditimg AI-audit-fullImg"><span><img width={"90%"} src="https://app.seokart.com/shop_app/images/faqnew/faq17.png" alt="" /></span></div>
						 <p>{translate1('analyticsFAQQuestion2Answer2')}</p>
						 <p>{translate1('analyticsFAQQuestion2Answer3')}</p>
						 <div className="Auditimg AI-audit-fullImg"><span><img width={"90%"} src="https://app.seokart.com/shop_app/images/faqnew/faq18.png" alt="" /></span></div></>),
					visible: true,
					toggleOpen: false
				}
			]

		},
		{
			category: translate('ranking'),
			visible: true,
			faqs: [
				{
					question: translate1('rankingFAQQuestion1'),
					answer: (<><p>{translate1('rankingFAQQuestion1Answer1')}</p>
						<ul>
						<li>{translate1('rankingFAQQuestion1Answer1Li1')}</li>
						<li>{translate1('rankingFAQQuestion1Answer1Li2')}</li>
						<li>{translate1('rankingFAQQuestion1Answer1Li3')}
						<div className="Auditimg AI-audit-fullImg"><span><img width={"90%"} src="https://app.seokart.com/shop_app/images/faqnew/faq19.png" alt="" /></span></div>
						</li>
						  <li>{translate1('rankingFAQQuestion1Answer1Li4')}</li>
						<li>{translate1('rankingFAQQuestion1Answer1Li5')}</li>
						<li>{translate1('rankingFAQQuestion1Answer1Li6')}</li>
						<li>{translate1('rankingFAQQuestion1Answer1Li7')}</li>
						<li>{translate1('rankingFAQQuestion1Answer1Li8')}</li>
						</ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('rankingFAQQuestion2'),
					answer: (<><p>{translate1('rankingFAQQuestion2Answer1')}</p>
						<ul>
						<li>{translate1('rankingFAQQuestion2Answer1Li1')}</li>
						<li>{translate1('rankingFAQQuestion2Answer1Li2')}
						<div className="Auditimg AI-audit-fullImg"><span><img width={"90%"} src="https://app.seokart.com/shop_app/images/faqnew/faq20.png" alt="" /></span></div>
						
						</li>
						<li>{translate1('rankingFAQQuestion2Answer1Li3')}</li>
						  <li>{translate1('rankingFAQQuestion2Answer1Li4')}</li>
						<li>{translate1('rankingFAQQuestion2Answer1Li5')}</li>
						</ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('rankingFAQQuestion3'),
					answer: (<><p>{translate1('rankingFAQQuestion3Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('rankingFAQQuestion4'),
					answer: (<><p>{translate1('rankingFAQQuestion4Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				}
			]
		},
		{
			category: translate('richSnippets'),
			visible: true,
			faqs: [
				{
					question: translate1('richSnippetsFAQQuestion1'),
					answer: (<><p>{translate1('richSnippetsFAQQuestion1Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('richSnippetsFAQQuestion2'),
					answer: (<><ul><li>{translate1('richSnippetsFAQQuestion2Answer1Li1')}</li> 
						<li>{translate1('richSnippetsFAQQuestion2Answer1Li2')}</li>
						<li>{translate1('richSnippetsFAQQuestion2Answer1Li3')} </li>
						<li>{translate1('richSnippetsFAQQuestion2Answer1Li4')}</li>
						<li>{translate1('richSnippetsFAQQuestion2Answer1Li5')}</li></ul>
						<span> <img width={"90%"} src='https://app.seokart.com/shop_app/images/faqnew/faq23.png' /></span></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('richSnippetsFAQQuestion3'),
					answer: (<><ul><li>{translate1('richSnippetsFAQQuestion3Answer1Li1')} </li> 
						<li>{translate1('richSnippetsFAQQuestion3Answer1Li2')}</li>
						<li>{translate1('richSnippetsFAQQuestion3Answer1Li3')} </li>
						<li>{translate1('richSnippetsFAQQuestion2Answer1Li4')}</li></ul>
						<span> <img width={"90%"} src='https://app.seokart.com/shop_app/images/faqnew/faq24.png' /></span></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('richSnippetsFAQQuestion4'),
					answer: (<><ul><li>{translate1('richSnippetsFAQQuestion4Answer1Li1')} </li> 
						<li>{translate1('richSnippetsFAQQuestion4Answer1Li2')}</li>
						<li>{translate1('richSnippetsFAQQuestion4Answer1Li3')} </li>
						<li>{translate1('richSnippetsFAQQuestion4Answer1Li4')}</li></ul>
						<span> <img width={"90%"} src='https://app.seokart.com/shop_app/images/faqnew/faq22.png' /></span></>),
					visible: true,
					toggleOpen: false
				}
			]
		},
		{
			category: translate('errors404'),
			visible: true,
			faqs: [
				{
					question: translate1('404ErrorFAQQuestion1'),
					answer: (<><p>{translate1('404ErrorFAQQuestion1Answer1')}</p>
						<ul>
						<li>{translate1('404ErrorFAQQuestion1Answer1Li1')}</li>
						<li>{translate1('404ErrorFAQQuestion1Answer1Li2')}
						<div className="Auditimg"><span><img width={"90%"} src="https://app.seokart.com/shop_app/images/faqnew/faq21.png" alt="" /></span></div>
						
						</li>
						<li>{translate1('404ErrorFAQQuestion1Answer1Li3')}</li>
						</ul></>),
					visible: true,
					toggleOpen: false
				}
			]
		},
		{
			category: translate('urlEditor'),
			visible: true,
			faqs: [
				{
					question: translate1('404ErrorFAQQuestion1Answer1Li3'),
					answer: (<><p>{translate1('urlEditorFAQQuestion1Answer1')}</p>
						<ol>
						<li>{translate1('urlEditorFAQQuestion1Answer1Li1')}</li>
						<li>{translate1('urlEditorFAQQuestion1Answer1Li2')}</li>
						<li>{translate1('urlEditorFAQQuestion1Answer1Li3')}</li>
						</ol>
						<p>{translate1('urlEditorFAQQuestion1Answer2')}</p>
						<ul>
						<li>{translate1('urlEditorFAQQuestion1Answer2Li1')}</li>
						<li>{translate1('urlEditorFAQQuestion1Answer2Li2')}
						<div className="Auditimg"><span><img width={"90%"} src="https://app.seokart.com/shop_app/images/faqnew/faq21.png" alt="" /></span></div>
						</li>
						<li>{translate1('urlEditorFAQQuestion1Answer2Li3')}</li>
						</ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('urlEditorFAQQuestion2'),
					answer: (<><p>{translate1('urlEditorFAQQuestion2Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				}
			]
		},
		{
			category: translate('reportRestore'),
			visible: true,
			faqs: [
				{
					question: translate1('reportRestoreFAQQuestion1'),
					answer: (<><p>{translate1('reportRestoreFAQQuestion1Answer1')}</p>
						<ul>
						<li>{translate1('reportRestoreFAQQuestion1Answer1Li1')} </li>
						<li>{translate1('reportRestoreFAQQuestion1Answer1Li2')}</li>
						<li>{translate1('reportRestoreFAQQuestion1Answer1Li3')}</li>
						<li>{translate1('reportRestoreFAQQuestion1Answer1Li4')}</li>
						</ul></>),
					visible: true,
					toggleOpen: false
				},
				{
					question: translate1('reportRestoreFAQQuestion2'),
					answer: (<><p>{translate1('reportRestoreFAQQuestion2Answer1')}</p></>),
					visible: true,
					toggleOpen: false
				}
			]
		},
	]);



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
	}, [search])

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
								<ul key={1}>
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
											{items.faqs.map((item, key) => (
												<>
													<div className="faqCollapse-box" key={key}>
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
	</>)
}