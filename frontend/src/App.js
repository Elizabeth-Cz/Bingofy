import 'react-toastify/dist/ReactToastify.css';
import './base.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DIRO from './pages/DIRO';

function App() {
  return (
      <>
        <Router>
          <h2 className="small-screen">
            This app doesn't support screens under 360px wide
          </h2>
          <div className="container">
            <Routes>
              <Route path="/diro" element={<DIRO />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer limit={1} />
      </>
  );
}

export default App;
