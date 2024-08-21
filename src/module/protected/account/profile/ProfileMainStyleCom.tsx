import styled from 'styled-components';
import { colorText, colorBackgroundBody, colorBackground } from '@/styles/palette';
import { left } from '@/styles/directions';

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 168px;
  margin-top: 30px;
`;

export const ProfileInformation = styled.div`
  padding: 30px 20px;
  display: flex;
  text-align: ${left};
  justify-content: center;
  flex-direction: column;
  align-items: left;

  @media (max-width: 1345px) and (min-width: 1200px) {
    padding: 30px 15px;
  }

  @media screen and (max-width: 360px) {
    width: 100%;
  }
`;

export const ProfileData = styled.div`
  margin-top: 30px;

  @media screen and (max-width: 360px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 0;
  }
`;

export const ProfileReadOnly = styled.p`
  flex: 1;
  padding: 8px;
  border: 1px solid ${colorBackgroundBody};
  margin: 0;
  color: ${colorText};
  background-color: ${colorBackgroundBody};
`;

export const ProfileContact = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 5px;
  line-height: 18px;
  align-items: center;
  input {
    flex: 1;
    padding: 8px;
    border: 1px solid ${colorBackgroundBody};
    margin: 0;
    color: ${colorText};
    background-color: ${colorBackground};
  }
`;

export const Description = styled.p`
  text-align: left;
  margin-left: 0px;
  margin-right: 20px;
  width: 150px;
`;

export const ProfileIntro = styled.p`
  font-weight: 900;
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 4px;
  line-height: 18px;
`;
export const ProfileText = styled.p`
  text-align: left;
  margin-bottom: 5px;
  line-height: 18px;
`;

export const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px;
  solid #f5c6cb;
  border-radius: 5px;
  text-align: center;
`;
