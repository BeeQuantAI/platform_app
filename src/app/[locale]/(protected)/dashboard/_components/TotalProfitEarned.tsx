import { Col } from 'react-bootstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import ProgressBar from '@/shared/components/ProgressBar';
import { Card } from '@/shared/components/Card';
import { colorRed } from '@/styles/palette';
import {
  DashboardPortfolioCard,
  PortfolioCardDescription,
  PortfolioCardTitle,
  PortfolioCardWrap,
} from './DashboardCardElements';
import { useTranslations } from 'next-intl';

const TotalProfitEarned = () => {
  const t = useTranslations('Dashboard');
  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <DashboardPortfolioCard>
          <PortfolioCardWrap>
            <PortfolioCardTitle color={colorRed}>$ 165 832</PortfolioCardTitle>
            <TrendingUpIcon />
          </PortfolioCardWrap>
          <PortfolioCardDescription>{t('total-profit-earned')}</PortfolioCardDescription>
          <ProgressBar now={27} label="27%" $rounded size="small" $gradient="pink" $top />
        </DashboardPortfolioCard>
      </Card>
    </Col>
  );
};

export default TotalProfitEarned;
