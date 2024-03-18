import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import { TopbarContainer, TopbarLeft, TopbarLogo, TopbarRight } from './BasicTopbarComponents';
import { ROUTE_KEY } from '@/routes/routeConfig';

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
      <TopbarProfile />
    </TopbarRight>
  </TopbarContainer>
);

export default Topbar;
