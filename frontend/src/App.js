import 'react-toastify/dist/ReactToastify.css';
import './base.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';
import CreateBoard from './pages/CreateBoard';
import MyBoards from './pages/MyBoards';
import Game from './pages/Game';
import Login from './pages/Login';
import Play from './pages/Play';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Contact from './pages/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/myboards" element={<MyBoards />} />
            <Route path="/create" element={<CreateBoard />} />
            <Route path="/play" element={<Play />} />
            <Route path="/play/:id" element={<Game />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myaccount" element={<MyAccount />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
