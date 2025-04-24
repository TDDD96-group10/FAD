import NotFoundPage from '../pages/NotFoundPage.tsx';
import ShareInfoPage from '../pages/ShareInfoPage.tsx';
import StartPage from '../pages/StartPage';
import LoginCodePage from '../pages/LoginCodePage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import HomePage from '../pages/HomePage.tsx';
import FadderHome from '../pages/FadderHomePage.tsx';
import Configure from '../pages/Configure.tsx';


interface RouteType {
  path: string;
  element: React.FC;
}

export const routes: RouteType[] = [
  { path: "", element: StartPage },
  { path: "*", element: NotFoundPage },
  { path: "/shareinfo", element: ShareInfoPage},
  { path: "/configure", element: Configure},
  { path: "/code", element:LoginCodePage },
  { path: "/login", element:LoginPage},
  { path: "/demo", element:HomePage},
  { path: "/fadderhome", element:FadderHome}
];