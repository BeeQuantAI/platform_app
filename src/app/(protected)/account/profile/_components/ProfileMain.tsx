import { Button, Col } from 'react-bootstrap';

import styled from 'styled-components';
import { Card } from '@/shared/components/Card';
import { left } from '@/styles/directions';

import { ProfileCard } from './ProfileBasicComponents';
import { UPDATE_USER, FIND_USER_BY_EMAIL } from '@/graphql/user';
// import Ava from '@/shared/img/ava.png';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/hooks/userHooks';

const initialEmail = '';
const initialRef = '';
const initialDisplayName = '';

const ProfileMain = () => {
  const { store, setStore } = useUserContext();
  const currentEmail = localStorage.getItem('email');
  const [userId, setUserId] = useState(null);
  const { loading, data } = useQuery(FIND_USER_BY_EMAIL, {
    variables: { email: currentEmail },
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const handleUpdateUser = () => {
    if (disName.length >= 1 && disName.length <= 30) {
      updateUser({
        variables: {
          id: userId,
          input: {
            displayName: disName,
          },
        },
      }).then(() => {
        setStore(() => {
          const updatedStore = {
            ...store,
            displayName: disName,
          };

          return updatedStore;
        });
      });
    } else {
      alert('Display name length should be in between 1 and 30.');
    }
  };

  const [disEmail, setDisEmail] = useState(initialEmail);
  const [disRef, setDisRef] = useState(initialRef);
  const [disName, setDisplayName] = useState(initialDisplayName);
  useEffect(() => {
    if (!loading && data) {
      const { id, email, ref, displayName } = data.getUserByEmail;
      setUserId(id);
      setDisEmail(email);
      setDisRef(ref);
      setDisplayName(displayName || initialDisplayName);
      setStore((prevStore: Record<string, any>) => {
        const updatedStore = {
          ...prevStore,
          displayName,
          email,
          ref,
        };
        console.log('Updated Store:', updatedStore);
        return updatedStore;
      });
    }
  }, [loading, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <ProfileCard>
          <ProfileInformation>
            {/* <ProfileAvatar>
              <img src={Ava} alt="avatar" />
            </ProfileAvatar> */}
            <ProfileIntro>
              <>Profile</>
            </ProfileIntro>
            <ProfileText>
              <>Update your account information</>
            </ProfileText>
            <ProfileData>
              <ProfileContact>
                <Description>Display Name</Description>
                <input
                  type="text"
                  value={disName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </ProfileContact>
              {/* <ProfileWork>Account Manager</ProfileWork> */}
              <ProfileContact>
                <Description>Email</Description>
                <ProfileEmail>{disEmail}</ProfileEmail>
              </ProfileContact>
              <ProfileContact dir="ltr">
                <Description>Reference</Description>
                <ProfileReference>{disRef}</ProfileReference>
              </ProfileContact>
              <Button onClick={handleUpdateUser}>Submit</Button>
            </ProfileData>
          </ProfileInformation>
        </ProfileCard>
      </Card>
    </Col>
  );
};

export default ProfileMain;

// region STYLES

const ProfileInformation = styled.div`
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

// const ProfileAvatar = styled.div`
//   height: 140px;
//   width: 140px;
//   overflow: hidden;
//   border-radius: 50%;

//   img {
//     height: 100%;
//   }

//   @media (max-width: 1345px) and (min-width: 1200px) {
//     height: 130px;
//     width: 130px;
//   }
// `;

const ProfileData = styled.div`
  margin-top: 30px;

  @media screen and (max-width: 360px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 0;
  }
`;

// const ProfileName = styled.p`
//   display: flex;
//   margin-top: 10px;
//   margin-bottom: 5px;
//   line-height: 18px;
//   align-items: center;
//   flex: 1;
//   padding: 8px;
//   border: 1px solid;
//   margin: 0;
// `;
const ProfileEmail = styled.p`
  display: flex;
  margin-top: 10px;
  margin-bottom: 5px;
  line-height: 18px;
  align-items: center;
  flex: 1;
  padding: 8px;
  border: 1px solid;
  margin: 0;
`;
const ProfileReference = styled.p`
  display: flex;
  margin-top: 10px;
  margin-bottom: 5px;
  line-height: 18px;
  align-items: center;
  flex: 1;
  padding: 8px;
  border: 1px solid;
  margin: 0;
`;

// const ProfileWork = styled.p`
//   font-weight: 500;
//   margin-bottom: 10px;
//   margin-top: 0;
//   opacity: 0.6;
//   line-height: 18px;
// `;

const ProfileContact = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 5px;
  line-height: 18px;
  align-items: center;
  input {
    flex: 1;
    padding: 8px;
    border: 1px solid;
    margin: 0;
  }
`;

const Description = styled.p`
  text-align: left;
  margin-left: 0px;
  margin-right: 20px;
  width: 150px;
`;

const ProfileIntro = styled.p`
  font-weight: 900;
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 4px;
  line-height: 18px;
`;
const ProfileText = styled.p`
  text-align: left;
  margin-bottom: 5px;
  line-height: 18px;
`;

// endregion
