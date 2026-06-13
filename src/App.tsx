import { useEffect } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import DiseaseInfoPage from './pages/DiseaseInfoPage/DiseaseInfoPage';
import UpcomingMedicinesPage from './pages/UpcomingMedicinesPage/UpcomingMedicinesPage';
import ResearchPage from './pages/ResearchPage/ResearchPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';

function FocusManager({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const heading = document.querySelector('main h1') as HTMLElement | null;
    if (heading) {
      heading.focus();
    }
  }, [location.pathname]);

  return <>{children}</>;
}

function App() {
  return (
    <HashRouter>
      <FocusManager>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/disease-info" replace />} />
            <Route path="/disease-info" element={<DiseaseInfoPage />} />
            <Route path="/upcoming-medicines" element={<UpcomingMedicinesPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </FocusManager>
    </HashRouter>
  );
}

export default App;
