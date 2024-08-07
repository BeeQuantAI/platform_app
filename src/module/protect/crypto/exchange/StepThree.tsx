'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@/shared/components/Button';
import { borderLeft, paddingLeft } from '@/styles/directions';
import { colorBlue } from '@/styles/palette';

const StepThree = () => (
  <StepThreeContainer>
    <StepThreeContent>
      <StepThreeImage src="/img/success.png" alt="success" />
      <StepThreeTitleHead>
        <StepThreeTitleAccent> Cool!</StepThreeTitleAccent>
        <h3>Your exchange key is added successfully</h3>
      </StepThreeTitleHead>
      <Button as={Link} className="w-100" variant="outline-primary" href="/crypto/exchange/details">
        Back to Exchange Management
      </Button>
    </StepThreeContent>
  </StepThreeContainer>
);

export default StepThree;

const StepThreeContainer = styled.div`
  text-align: center;
  height: 100%;
  overflow: auto;
  display: flex;

  button {
    margin: 0;
  }
`;

const StepThreeContent = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepThreeImage = styled.img`
  max-width: 500px;
  width: 100%;
`;

const StepThreeTitleHead = styled.div`
  margin-bottom: 30px;
  ${paddingLeft}: 20px;
  ${borderLeft}: 4px solid ${colorBlue};
`;

const StepThreeTitleAccent = styled.span`
  color: ${colorBlue};
  font-size: 24px;
  align-self: flex-start;
`;

// endregion
