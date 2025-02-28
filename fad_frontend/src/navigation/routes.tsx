import { Route, Routes,BrowserRouter } from 'react-router-dom';
import { routes } from './routesConfig';

import FADheader from '../header';
import FADfooter from '../footer';

const AppRoutes = () => {
  return (
    <div>
    <FADheader />
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default AppRoutes;