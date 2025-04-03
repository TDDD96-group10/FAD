import NotFoundPage from '../pages/NotFoundPage.tsx';
import ShareInfo from '../pages/ShareInfo.tsx';
import StartPage from '../pages/StartPage';
import Overview from '../pages/OverView';

interface RouteType {
  path: string;
  element: React.FC;
}

export const routes: RouteType[] = [
  { path: "", element: StartPage },
  { path: "*", element: NotFoundPage },
  { path: "shareinfo", element: ShareInfo},
  { path: "overview", element: Overview}
];