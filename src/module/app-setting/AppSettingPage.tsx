'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { Card, CardBody, CardTitleWrap, CardTitle, CardSubhead } from '@/shared/components/Card';
import { AppSettingFormLayout } from './AppSettingFormLayout';
import { useTranslations } from 'next-intl';

const AppSettingPage = () => {
  const t = useTranslations('AppSettingPage');
  return (
    <Container>
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody data-testid="card-body">
              <CardTitleWrap>
                <CardTitle>{t('title')}</CardTitle>
                <CardSubhead>{t('subtitle')}</CardSubhead>
              </CardTitleWrap>
              <AppSettingFormLayout />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppSettingPage;
