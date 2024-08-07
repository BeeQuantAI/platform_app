import styled from 'styled-components';
import { CardBody } from '@/shared/components/Card';
import { FormButtonToolbar, FormContainer } from '@/shared/components/form/FormElements';
import {
  colorAdditional,
  colorBlue,
  colorBorder,
  colorHover,
  colorWhite,
  colorBackground,
  colorText,
} from '@/styles/palette';

interface WizardStepProps {
  $active: boolean;
}

export const WizardWrap = styled(CardBody)`
  background-color: ${colorBackground};
`;

export const WizardFormContainer = styled(FormContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 610px;
  margin-top: 50px;
  margin-bottom: 100px;
  padding: 0 250px;
  box-sizing: border-box;
  padding: 0 0;
  width: 100%;
`;

export const WizardButtonToolbar = styled(FormButtonToolbar)`
  width: 100%;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 20px 0;
  left: 0;
  gap: 438px;
`;

export const WizardSteps = styled.div`
  display: flex;
`;

export const WizardStep = styled.div<WizardStepProps>`
  width: 100%;
  text-align: center;
  height: 55px;
  text-transform: uppercase;
  display: flex;
  transition: background 0.3s;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.$active ? colorBlue : colorBorder)};
  background: ${(props) => (props.$active ? colorBlue : colorHover)};

  p {
    font-weight: 700;
    margin: auto;
    font-size: 14px;
    transition: all 0.3s;
    color: ${(props) => (props.$active ? colorWhite : colorText)};
  }
`;

export const WizardStepMini = styled.div<WizardStepProps>`
  width: 100%;
  text-align: center;
  height: 10px;
  text-transform: uppercase;
  display: flex;
  transition: background 0.3s;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.$active ? colorBlue : colorBorder)};
  background: ${(props) => (props.$active ? colorBlue : colorHover)};

  p {
    font-weight: 700;
    margin: auto;
    font-size: 14px;
    transition: all 0.3s;
    color: ${(props) => (props.$active ? colorWhite : colorText)};
  }
`;

export const WizardFormWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const WizardTitle = styled.h3`
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
`;

export const WizardDescription = styled.p`
  color: ${colorAdditional};
  margin: 0;
  max-width: 410px;
`;

export const StyledButton = styled.button`
  background-color: #66b3ff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
`;

export const WizardLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
  color: ${colorText};
`;
