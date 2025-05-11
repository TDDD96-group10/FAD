import NotFoundPage from '../pages/NotFoundPage.tsx';
import ShareInfoPage from '../pages/ShareInfoPage.tsx';
import StartPage from '../pages/StartPage';
import LoginCodePage from '../pages/LoginCodePage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import HomePage from '../pages/HomePage.tsx';
import Overview from '../pages/OverviewPage.tsx';
import FadderInformation from '../pages/FadderInformationPage.tsx';
import FadderDocuments from '../pages/FadderDocumentsPage.tsx';
import FadderHome from '../pages/FadderHomePage.tsx';
import Configure from '../pages/ConfigurePage.tsx';
import PostPage from '../pages/PostPage.tsx';
import FadderPostPage from '../pages/FadderPostPage.tsx';




interface RouteType {
  path: string;
  element: React.FC;
}

export const routes: RouteType[] = [
  { path: "", element: StartPage },
  { path: "*", element: NotFoundPage },
  { path: "/overview", element: Overview},
  { path: "/shareinfo", element: ShareInfoPage},
  { path:"/code", element:LoginCodePage },
  { path:"/login", element:LoginPage},
  { path: "/demo", element:HomePage},
  { path: "/FadderInfo", element:FadderInformation},
  { path: "/FadderDocuments", element:FadderDocuments},
  { path: "/configure", element: Configure},
  { path: "/fadderhome", element:FadderHome},
  { path: "/post/:id", element:PostPage},
  { path: "/fadder/post/:id", element:FadderPostPage}

];