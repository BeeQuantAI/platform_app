'use client';

import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from '@/shared/components/Card';
import {
  WizardFormWrap,
  WizardStepMini,
  WizardSteps,
  WizardWrap,
} from '@/shared/components/form/WizardFormElements';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

interface WizardFormProps {
  onSubmit: (data: any) => void;
}

const WizardForm: React.FC<WizardFormProps> = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [key, setKey] = useState(0);

  const nextPage = (newData: any) => {
    setData((preData) => ({ ...preData, ...newData }));
    setPage((prevPage) => prevPage + 1);
    setKey((prevKey) => prevKey + 1);
  };

  const previousPage = () => {
    setPage((prevPage) => prevPage - 1);
    setKey((prevKey) => prevKey + 1);
    setData({});
  };

  return (
    <Row>
      <Col md={12} lg={12}>
        <Card>
          <WizardWrap>
            <WizardSteps>
              <WizardStepMini $active={page === 1} />
              <WizardStepMini $active={page === 2} />
              <WizardStepMini $active={page === 3} />
            </WizardSteps>
            <WizardFormWrap>
              {page === 1 && (
                <StepOne key={`step-one-${key}`} onSubmit={nextPage} defaultValues={data} />
              )}
              {page === 2 && (
                <StepTwo
                  key={`step-two-${key}`}
                  previousPage={previousPage}
                  onSubmit={nextPage}
                  defaultValues={data}
                />
              )}
              {page === 3 && <StepThree key={`step-three-${key}`} />}
            </WizardFormWrap>
          </WizardWrap>
        </Card>
      </Col>
    </Row>
  );
};

export default WizardForm;
