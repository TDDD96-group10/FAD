import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { routes } from './routesConfig';
import Logintest from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';
import FADheader from '../header';
import Loginkod from '../pages/Loginkod';
import FadderHome from '../pages/FadderHome';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Logintest />} />
        <Route path="/code" element={<Loginkod />} />
        <Route path="/fadderhome" element={<FadderHome />} />
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