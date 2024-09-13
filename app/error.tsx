'use client'
import { useTranslations } from '@/translator'
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Error() {
  const translate = useTranslations('errorList');

  return (
    <div className='container-fluid bg-dark text-white'>
      <Container className="mt-5">
        <Row>
          <Col className="text-center">
            <h1 className="display-3">{translate('SEOKart')}</h1>
            <h3>{translate('notAuthorizedMsg')}</h3>
            <p className="lead">{translate('notAuthorizedLoadMsg1')}</p>
            <p className="lead">{translate('notAuthorizedLoadMsg2')}.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}