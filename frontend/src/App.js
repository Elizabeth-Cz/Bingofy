import 'react-toastify/dist/ReactToastify.css';
import './base.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';
import CreateBoard from './pages/CreateBoard';
import MyBoards from './pages/MyBoards';
import Game from './pages/Game';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import Home from './pages/Home';
import DIRO from './pages/DIRO';
import Browse from './pages/Browse';
import Contact from './pages/Contact';
import Footer from './components/Footer/Footer';

function HeaderWithConditionalRendering() {
  const location = useLocation(); // useLocation is now inside Router

  return (
      <>
        {/* Render Header only if the path is not /diro */}
        {location.pathname !== '/diro' && <Header />}
      </>
  );
}

function App() {
  return (
      <>
        <Router>
          <h2 className="small-screen">
            This app doesn't support screens under 360px wide
          </h2>
          <div className="container">
            <HeaderWithConditionalRendering />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diro" element={<DIRO />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/myboards" element={<MyBoards />} />
              <Route path="/create" element={<CreateBoard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/play/:id" element={<Game />} />
              <Route path="/edit/:id" element={<CreateBoard />} />
            </Routes>
            <Footer />
          </div>
        </Router>
        <ToastContainer limit={1} />
      </>
  );
}

export default App;
