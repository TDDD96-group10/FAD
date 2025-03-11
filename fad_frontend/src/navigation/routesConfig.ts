import NotFoundPage from '../pages/NotFoundPage.tsx';
import StartPage from '../pages/StartPage';

interface RouteType {
  path: string;
  element: React.FC;
}

export const routes: RouteType[] = [
  { path: "", element: StartPage },
  { path: "*", element: NotFoundPage }
];