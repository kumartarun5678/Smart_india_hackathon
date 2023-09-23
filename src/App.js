import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/home.js';
import About from './components/Admin.js';
import NoteState from './context/notes/NoteState.js';
import Alert from './components/Alert.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import ForgotPassword from './components/ForgotPassword.js';

import { useState } from 'react';
// import PropTypes from 'prop-types';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              {/* Set the home page as the default route */}
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/forgotpassword" element={<ForgotPassword showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
