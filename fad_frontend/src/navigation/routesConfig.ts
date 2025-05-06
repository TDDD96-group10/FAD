import NotFoundPage from '../pages/NotFoundPage.tsx';
import ShareInfoPage from '../pages/ShareInfoPage.tsx';
import StartPage from '../pages/StartPage';
import LoginCodePage from '../pages/LoginCodePage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import HomePage from '../pages/HomePage.tsx';
import Overview from '../pages/Overview.tsx';
import FadderInformation from '../pages/FadderInformation.tsx';
import FadderDocuments from '../pages/FadderDocuments.tsx';
import FadderHome from '../pages/FadderHomePage.tsx';
import Configure from '../pages/Configure.tsx';




interface RouteType {
  path: string;
  element: React.FC;
}

export const routes: RouteType[] = [
  { path: "", element: StartPage },
  { path: "*", element: NotFoundPage },
  { path: "/overview", element: Overview},
  { path: "/shareinfo", element: ShareInfo},
  { path:"/code", element:Loginkod },
  { path:"/login", element:Logintest},
  { path: "/demo", element:HomePage},
  { path: "/FadderInfo", element:FadderInformation},
  { path: "/FadderDocuments", element:FadderDocuments},
  { path: "/configure", element: Configure},
  { path: "/fadderhome", element:FadderHome},

];