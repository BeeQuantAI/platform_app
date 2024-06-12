import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { borderRadius, shadow } from '@/styles/styles';
import { colorBackground, colorWhite, colorGray } from '@/styles/palette';

export const StyledModal = styled(Modal)`
  border-radius: ${borderRadius};
  box-shadow: ${shadow};
`;

export const StyledModalHeader = styled(Modal.Header)`
  background-color: ${colorBackground};
  padding: 60px 20px 60px;
  border-bottom: 0 none;
`;

export const StyledModalTitle = styled(Modal.Title)<{ theme: string }>`
  color: ${(props) => (props.theme === 'dark' ? colorWhite : colorGray)};
  font-size: 16px;
  font-weight: 700;
  margin: auto;
`;

export const StyledModalFooter = styled(Modal.Footer)`
  background-color: ${colorBackground};
  padding: 20px;
  border-top: 0 none;
`;
