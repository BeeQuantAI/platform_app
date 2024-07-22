'use client';
import { Container, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Card } from '@/shared/components/Card';
import { useUserContext } from '@/hooks/userHooks';
import { UPDATE_USER, GET_USER } from '@/graphql/user';
import { Button } from '@/shared/components/Button';
import {
  ProfileContact,
  ProfileData,
  ProfileInformation,
  ProfileIntro,
  ProfileReadOnly,
  ProfileText,
  Description,
  ButtonGroup,
  ErrorMessage,
} from './ProfileMainStyleCom';
import { ProfileCard } from './ProfileBasicComponents';

const initialEmail = '';
const initialRef = '';
const initialDisplayName = '';

const ProfileMain = () => {
  const { store, setStore } = useUserContext();
  const [userId, setUserId] = useState('');
  const [msg, setMsg] = useState('');
  const { loading, data } = useQuery(GET_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const validateUpdatedDisplayName = (name: string) => {
    const regex = /^[a-zA-Z0-9-_]+$/;
    return name.length >= 4 && name.length <= 15 && regex.test(name);
  };
  const handleUpdateUser = () => {
    if (!validateUpdatedDisplayName(disName)) {
      setMsg(
        'Display name must be 4-15 characters long and contain only letters, numbers, hyphens, and underscores.'
      );
      return;
    }
    setMsg('');
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
  };

  const [disEmail, setDisEmail] = useState(initialEmail);
  const [disRef, setDisRef] = useState(initialRef);
  const [disName, setDisplayName] = useState(initialDisplayName);
  useEffect(() => {
    if (!loading && data) {
      const { id, email, ref, displayName } = data.getUserInfo;
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
        return updatedStore;
      });
    }
  }, [loading, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={12} lg={12} xl={12}>
          <Card>
            <ProfileCard>
              <ProfileInformation>
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
                  <ProfileContact>
                    <Description>Email</Description>
                    <ProfileReadOnly>{disEmail}</ProfileReadOnly>
                  </ProfileContact>
                  <ProfileContact dir="ltr">
                    <Description>Reference</Description>
                    <ProfileReadOnly>{disRef}</ProfileReadOnly>
                  </ProfileContact>
                  <ButtonGroup>
                    <Button variant="primary" type="button" onClick={handleUpdateUser}>
                      Submit
                    </Button>
                  </ButtonGroup>
                </ProfileData>
                {msg && <ErrorMessage>{msg}</ErrorMessage>}
              </ProfileInformation>
            </ProfileCard>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ProfileMain;
