import NotFoundPage from '../pages/NotFoundPage.tsx';
import ShareInfo from '../pages/ShareInfo.tsx';
import StartPage from '../pages/StartPage';
import Loginkod from '../pages/Loginkod';
import Logintest from '../pages/Login';
import HomePage from '../pages/HomePage.tsx';

interface RouteType {
  path: string;
  element: React.FC;
}

export const routes: RouteType[] = [
  { path: "", element: StartPage },
  { path: "*", element: NotFoundPage },
  { path: "/shareinfo", element: ShareInfo},
  { path:"/code", element:Loginkod },
  { path:"/login", element:Logintest},
  { path: "/home", element:HomePage}

];