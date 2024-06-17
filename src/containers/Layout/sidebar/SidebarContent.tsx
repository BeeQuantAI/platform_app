/* eslint-disable @typescript-eslint/no-use-before-define */
import { colorBorder, colorBackground, colorHover } from '@/styles/palette';
import { left } from '@/styles/directions';
import styled from 'styled-components';
import { AUTH_TOKEN, THEME } from '@/shared/constants/storage';
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_KEY, getPublicRouteByKey, getRouteByKey } from '@/routes/routeConfig';
import { useTranslation } from 'react-i18next';
import SidebarCategory from './SidebarCategory';
import SidebarLink, { SidebarLinkTitle, SidebarNavLink } from './SidebarLink';

type SidebarContentProps = {
  onClick: () => void;
  // eslint-disable-next-line react/require-default-props
  $collapse?: boolean;
};

const SidebarContent = ({ onClick, $collapse }: SidebarContentProps) => {
  const { store, setStore } = useUserContext();
  const { t } = useTranslation();
  const logout = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
  };

  const changeTheme = (color: string) => {
    setStore({
      ...store,
      themeColor: color,
    });
    localStorage.setItem(THEME, color);
  };

  return (
    <SidebarContentWrap $collapse={$collapse}>
      <SidebarBlock $collapse={$collapse}>
        <SidebarLink
          title={t('route-key-name.dashboard')}
          icon="home"
          route={getRouteByKey(ROUTE_KEY.DASHBOARD).path}
          onClick={onClick}
        />
      </SidebarBlock>
      <SidebarBlock $collapse={$collapse}>
        <SidebarCategory
          title={t('route-key-name.bots.category-name')}
          icon="chart-bars"
          $collapse={$collapse}
        >
          <SidebarLink
            title={t('route-key-name.bots.bot-dashboard')}
            route={getRouteByKey(ROUTE_KEY.BOT_DASHBOARD).path}
            onClick={() => {}}
          />
          <SidebarLink
            title={t('route-key-name.bots.bot-managemen')}
            route={getRouteByKey(ROUTE_KEY.BOT_MANAGEMENT).path}
            onClick={() => {}}
          />
          <SidebarLink
            title={t('route-key-name.bots.bot-create')}
            route={getRouteByKey(ROUTE_KEY.BOT_CREATE).path}
            onClick={() => {}}
          />
          <SidebarLink
            title={t('route-key-name.bots.bot-details')}
            route={getRouteByKey(ROUTE_KEY.BOT_DETAILS).path}
            onClick={() => {}}
          />
        </SidebarCategory>
        <SidebarCategory
          title={t('route-key-name.cryptoeconomy.category-name')}
          icon="earth"
          $collapse={$collapse}
        >
          <SidebarLink
            title={t('route-key-name.cryptoeconomy.crypto-prices')}
            route={getRouteByKey(ROUTE_KEY.CRYPTO_PRICES).path}
            onClick={() => {}}
          />
          <SidebarLink
            title={t('route-key-name.cryptoeconomy.crypto-prices-details')}
            route={getRouteByKey(ROUTE_KEY.CRYPTO_PRICE_DETAILS).path}
            onClick={() => {}}
          />
          <SidebarLink
            title={t('route-key-name.cryptoeconomy.crypto-exchange')}
            route={getRouteByKey(ROUTE_KEY.CRYPTO_EXCHANGES).path}
            onClick={() => {}}
          />
          <SidebarLink
            title={t('route-key-name.cryptoeconomy.crypto-exchange-details')}
            route={getRouteByKey(ROUTE_KEY.CRYPTO_EXCHANGE_DETAILS).path}
            onClick={() => {}}
          />
        </SidebarCategory>
      </SidebarBlock>
      <SidebarBlock $collapse={$collapse}>
        <SidebarCategory
          title={t('route-key-name.theme.category-name')}
          icon="diamond"
          $collapse={$collapse}
        >
          {/* eslint-disable-next-line max-len */}
          {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
          <SidebarNavLink as="button" type="button" onClick={() => changeTheme('light')}>
            <SidebarLinkTitle>{t('route-key-name.theme.light-theme')}</SidebarLinkTitle>
          </SidebarNavLink>
          {/* eslint-disable-next-line max-len */}
          {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
          <SidebarNavLink as="button" type="button" onClick={() => changeTheme('dark')}>
            <SidebarLinkTitle>{t('route-key-name.theme.dark-theme')}</SidebarLinkTitle>
          </SidebarNavLink>
        </SidebarCategory>
        <SidebarCategory
          title={t('route-key-name.account.category-name')}
          icon="user"
          $collapse={$collapse}
        >
          <SidebarLink
            title={t('route-key-name.account.account-profile')}
            route={getRouteByKey(ROUTE_KEY.ACCOUNT_PROFILE).path}
            onClick={onClick}
          />
          <SidebarLink
            title={t('route-key-name.account.exchange-management')}
            route={getRouteByKey(ROUTE_KEY.EXCHANGE_MANAGEMENT).path}
            onClick={onClick}
          />
          <SidebarLink
            title={t('route-key-name.account.app-setting')}
            route={getRouteByKey(ROUTE_KEY.APP_SETTING).path}
            onClick={onClick}
          />
        </SidebarCategory>
      </SidebarBlock>
      <SidebarBlock $collapse={$collapse}>
        <SidebarLink
          title={t('route-key-name.log-out')}
          icon="exit"
          route={getPublicRouteByKey(ROUTE_KEY.LOGIN).path}
          onClick={logout}
        />
      </SidebarBlock>
    </SidebarContentWrap>
  );
};

export default SidebarContent;

// region STYLES

const SidebarContentWrap = styled.div<{ $collapse?: boolean }>`
  height: 100%;
  overflow: auto;
  padding-top: 0;

  & > div:last-child {
    width: 4px !important;

    div {
      transition: height 0.3s;
      opacity: 0.52;
    }
  }

  @media screen and (min-width: 576px) {
    padding-top: 15px;

    ${(props) =>
      props.$collapse &&
      `
      width: 55px;
      overflow: visible !important;
      transition: width 0.3s;
    `}
  }
`;

const SidebarBlock = styled.ul<{ $collapse?: boolean }>`
  padding: 15px 0;
  border-bottom: 1px solid ${colorBorder};
  list-style-type: none;

  &:last-child {
    border: none;
  }

  @media screen and (min-width: 576px) {
    ${(props) =>
      props.$collapse &&
      `
      & > li > a,
      & > li > button {
        overflow: hidden;
        width: 55px;
        background: ${colorBackground(props)};
        
        span:last-of-type {
          opacity: 0;
          transition: 0.3s;
        }
  
        ${SidebarLinkTitle} {
          position: absolute;
          width: 160px;
          ${left(props)}: 70px;
        }
  
        &:hover {
          background: ${colorHover(props)};
        }
      }
      
      & > li:hover > a,
      & > li:hover > button {
        width: 275px;
        
        span {
          opacity: 1;
        }
      }
    `}
  }
`;

// endregion
