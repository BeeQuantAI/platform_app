'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const WizardForm: React.FC<WizardFormProps> = ({ onSubmit }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});

  const nextPage = (newData: any) => {
    setData(newData);
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const submitHandler = (newData: any) => {
    setData(newData);
    onSubmit(newData);
  };

  return (
    <Row>
      <Col md={12} lg={12}>
        <Card>
          <WizardWrap>
            <WizardSteps>
              <WizardStepMini active={page === 1} />
              <WizardStepMini active={page === 2} />
              <WizardStepMini active={page === 3} />
            </WizardSteps>
            <WizardFormWrap>
              {page === 1 && <StepOne onSubmit={nextPage} defaultValues={data} />}
              {page === 2 && (
                <StepTwo
                  previousPage={previousPage}
                  onSubmit={submitHandler}
                  defaultValues={data}
                />
              )}
              {page === 3 && <StepThree />}
            </WizardFormWrap>
          </WizardWrap>
        </Card>
      </Col>
    </Row>
  );
};

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default WizardForm;
