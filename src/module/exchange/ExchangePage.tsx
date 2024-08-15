'use client';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentCard from './_components/ContentCard';
import { useTitle } from '@/hooks/useTitle';
import { useTranslations } from 'next-intl';

function ExchangePage() {
  useTitle('Exchange Management - BeeQuant');
  const t = useTranslations('CryptoSettingPage');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('title')}</h3>
        </Col>
      </Row>
      <Row>
        <ContentCard />
      </Row>
    </Container>
  );
}

export default ExchangePage;
