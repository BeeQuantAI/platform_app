import Link from 'next/link';
import styled from 'styled-components';
import { colorWhite } from '@/styles/palette';
import { Button } from '@/shared/components/Button';
import image404 from '@/shared/img/404.png';
import bg404 from '@/shared/img/bg_404.png';

const NotFound404 = () => (
  <NotFoundContainer>
    <NotFountContent>
      <NotFoundImage src={image404} alt="404" />
      <NotFoundInfo>Ooops! The page you are looking for could not be found</NotFoundInfo>
      <Button as={Link} variant="primary" to="/">
        Back Home
      </Button>
    </NotFountContent>
  </NotFoundContainer>
);

export default NotFound404;

// region STYLES

const NotFoundContainer = styled.div`
  text-align: center;
  height: 100vh;
  overflow: auto;
  display: flex;
  background: url(${bg404}) no-repeat center;
  background-size: cover;

  button {
    margin: 0;
  }
`;

const NotFountContent = styled.div`
  margin: auto;
  padding: 10px;
`;

const NotFoundImage = styled.img`
  max-width: 500px;
  width: 100%;
`;

const NotFoundInfo = styled.h3`
  color: ${colorWhite};
  margin-bottom: 20px;
  margin-top: 90px;
`;

// endregion
