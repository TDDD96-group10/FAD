import HomePage from '../pages/HomePage.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import Logintest from '../pages/logintest.tsx';
import { ReactNode } from "react";

interface RouteType {
  path: string;
  element: React.FC;
}

export const routes: RouteType[] = [
  { path: "/", element: HomePage },
  { path: "/home", element: HomePage },
  { path: "*", element: NotFoundPage },
  { path: "/test", element: Logintest}
];