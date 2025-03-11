import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { routes } from './routesConfig';
import Logintest from '../pages/logintest';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import FADheader from '../header';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Logintest />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="home" element={<FADheader />}>
          {routes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;