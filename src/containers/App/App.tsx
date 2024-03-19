import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadUser from '@/shared/components/LoadUser';
import AppContent from './AppContent';

const App = () => (
  <BrowserRouter>
    <LoadUser>
      <AppContent />
    </LoadUser>
  </BrowserRouter>
);

export default App;
