import { ROUTE_KEY } from '@/routes/routeConfig';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import {
  TopbarContainer,
  TopbarLeft,
  TopbarLogo,
  TopbarRight,
  TopbarSearchWrap,
} from './BasicTopbarComponents';

type TopbarProps = {
  changeMobileSidebarVisibility: () => void;
  changeSidebarVisibility: () => void;
};

const Topbar = ({ changeMobileSidebarVisibility, changeSidebarVisibility }: TopbarProps) => (
  <TopbarContainer>
    <TopbarLeft>
      <TopbarSidebarButton
        onClickMobile={changeMobileSidebarVisibility}
        onClickDesktop={changeSidebarVisibility}
      />
      <TopbarLogo href={ROUTE_KEY.DASHBOARD} />
    </TopbarLeft>
    <TopbarRight>
      <TopbarSearchWrap>
        <TopbarProfile />
      </TopbarSearchWrap>
    </TopbarRight>
  </TopbarContainer>
);

export default Topbar;
