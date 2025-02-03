import { Route, Routes,BrowserRouter } from 'react-router-dom';
import { routes } from './routesConfig';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;