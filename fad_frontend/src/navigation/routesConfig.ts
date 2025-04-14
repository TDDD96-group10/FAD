import NotFoundPage from '../pages/NotFoundPage.tsx';
import ShareInfo from '../pages/ShareInfo.tsx';
import Loginkod from '../pages/Loginkod';
import Logintest from '../pages/Login';
import HomePage from '../pages/HomePage.tsx';
import FADheader from '../components/header.tsx';
import Configure from '../pages/Configure.tsx';

interface RouteType {
  path: string;
  element: React.FC;
}

export const routes: RouteType[] = [
  { path: "", element: FADheader },
  { path: "*", element: NotFoundPage },
  { path: "/shareinfo", element: ShareInfo},
  { path:"/code", element:Loginkod },
  { path:"/login", element:Logintest},
  { path: "/home", element:HomePage},
  { path: "/configure", element: Configure}

];