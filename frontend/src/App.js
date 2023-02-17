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

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<MyBoards />} />
            <Route path="/create" element={<CreateBoard />} />
            <Route path="/play" element={<Play />} />
            <Route path="/play/:id" element={<Game />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myaccount" element={<MyAccount />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
