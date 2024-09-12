'use client'

import { useTranslations } from 'next-intl';
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const translate = useTranslations('common');

  return (
    <>
      <html>
        <body>
          <h2>{translate('somethingWentWrong')}</h2>
        </body>
      </html>
    </>

  )
}