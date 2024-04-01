import Dashboard from '@/containers/Dashboard';
import ExchangeManagement from '@/containers/ExchangeManagement';
import Profile from '@/containers/Account/Profile';
import Page404 from '@/containers/404';
import Login from '@/containers/Login';
import Register from '@/containers/Register';
import Settings from '@/containers/Account/Settings';
import BotDashboard from '@/containers/Bot/Dashboard';
import BotManagement from '@/containers/Bot/Management';
import CryptoExchanges from '@/containers/Cryptoeconomy/CryptoExchanges';
import CryptoPrices from '@/containers/Cryptoeconomy/CryptoPrices';
import ExchangeDetails from '@/containers/Cryptoeconomy/ExchangeDetails';
import PriceDetails from '@/containers/Cryptoeconomy/PriceDetails';
import BotDetail from '@/containers/Bot/BotDetails';
import BotCreate from '@/containers/Bot/BotCreate';
import AppSetting from '@/containers/AppSetting';

interface IRoute {
  path: string;
  name: string;
  title: string;
  component: () => JSX.Element;
}

export const ROUTE_KEY = {
  HOME: 'home',
  DASHBOARD: 'dashboard',
  EXCHANGE_MANAGEMENT: 'exchange_management',
  ACCOUNT_PROFILE: 'account_profile',
  PAGE_404: 'page_404',
  LOGIN: 'login',
  REGISTER: 'register',
  SETTINGS: 'settings',
  BOT_DASHBOARD: 'bot_dashboard',
  BOT_MANAGEMENT: 'bot_management',
  BOT_CREATE: 'bot_create',
  BOT_DETAILS: 'bot_details',
  CRYPTO_EXCHANGES: 'crypto_exchanges',
  CRYPTO_PRICES: 'crypto_prices',
  CRYPTO_EXCHANGE_DETAILS: 'crypto_exchange_detail',
  CRYPTO_PRICE_DETAILS: 'crypto_price_detail',
  APPSETTING: 'app_setting',
};

export const PUBLIC_ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.LOGIN]: {
    path: '/login',
    name: 'login',
    title: 'Login - BeeQuant',
    component: Login,
  },
  [ROUTE_KEY.REGISTER]: {
    path: '/register',
    name: 'register',
    title: 'Register - BeeQuant',
    component: Register,
  },
  [ROUTE_KEY.PAGE_404]: {
    path: '/404',
    name: '404',
    title: '404 - BeeQuant',
    component: Page404,
  },
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/home',
    name: 'Home',
    title: 'Home - BeeQuant',
    component: Dashboard,
  },
  [ROUTE_KEY.DASHBOARD]: {
    path: '/dashboard',
    name: 'Dashboard',
    title: 'Dashboard - BeeQuant',
    component: Dashboard,
  },
  [ROUTE_KEY.EXCHANGE_MANAGEMENT]: {
    path: '/exchange',
    name: 'Exchange Management',
    title: 'Exchange Management - BeeQuant',
    component: ExchangeManagement,
  },
  [ROUTE_KEY.ACCOUNT_PROFILE]: {
    path: '/account/profile',
    name: 'Profile',
    title: 'Profile - BeeQuant',
    component: Profile,
  },
  [ROUTE_KEY.BOT_DASHBOARD]: {
    path: '/bot/dashboard',
    name: 'Bots Dashboard',
    title: 'Bots Dashboard - BeeQuant',
    component: BotDashboard,
  },
  [ROUTE_KEY.BOT_MANAGEMENT]: {
    path: '/bot/management',
    name: 'Bots Management',
    title: 'Bots Management - BeeQuant',
    component: BotManagement,
  },
  [ROUTE_KEY.BOT_CREATE]: {
    path: '/bot/create',
    name: 'Bot Create',
    title: 'Create Bot - BeeQuant',
    component: BotCreate,
  },
  [ROUTE_KEY.BOT_DETAILS]: {
    path: '/bot/details',
    name: 'Bot Details',
    title: 'Bot Details - BeeQuant',
    component: BotDetail,
  },
  [ROUTE_KEY.CRYPTO_EXCHANGES]: {
    path: '/crypto/exchanges',
    name: 'Exchanges',
    title: 'Exchanges - BeeQuant',
    component: CryptoExchanges,
  },
  [ROUTE_KEY.CRYPTO_PRICES]: {
    path: '/crypto/prices',
    name: 'Prices',
    title: 'Prices - BeeQuant',
    component: CryptoPrices,
  },
  [ROUTE_KEY.CRYPTO_EXCHANGE_DETAILS]: {
    path: '/crypto/exchange/details',
    name: 'Exchange Details',
    title: 'Exchange Details - BeeQuant',
    component: ExchangeDetails,
  },
  [ROUTE_KEY.CRYPTO_PRICE_DETAILS]: {
    path: '/crypto/price/details',
    name: 'Price Details',
    title: 'Price Details - BeeQuant',
    component: PriceDetails,
  },
  [ROUTE_KEY.SETTINGS]: {
    path: '/account/settings',
    name: 'Settings',
    title: 'Settings - BeeQuant',
    component: Settings,
  },
  [ROUTE_KEY.APPSETTING]: {
    path: '/app-setting',
    name: 'app-setting',
    title: 'AppSetting - BeeQuant',
    component: AppSetting,
  },
};

export const routes = Object.values(ROUTE_CONFIG);
export const publicRoutes = Object.values(PUBLIC_ROUTE_CONFIG);

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
export const getPublicRouteByKey = (key: string) => PUBLIC_ROUTE_CONFIG[key];
