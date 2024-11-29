import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
// Components
import Navbar from './components/Navbar';
import StickyFooter from "./components/StickyFooter";
// Pages
import ChatKanban from './pages/ChatKanban';
import About from './pages/About';
import TestPage from './pages/TestPage';
// images
import Finley from './assets/Fox-Logo.png'
// styles
import './App.css';

function App() {
  const { isSignedIn } = useUser(); // useUser provides isSignedIn and user information
  const isUserLoggedIn = isSignedIn ?? false;

  return (
    <div className="app-container">
      <div className="contentWrap">
        {isUserLoggedIn ? (
          <div>
            {/* header shows only when logged in */}
            <Navbar />
            <div className="logo-container">
                <img id="finley" src={Finley} alt="Logo" />
            </div>
            {/* pages w/props */}
            <Routes>
              <Route path="/" element={<ChatKanban />} />
              <Route path="/about" element={<About />} />
              <Route path="/test-page" element={<TestPage />} />
            </Routes>
          </div>
        ) : (
          // Login Page
          <div className="login-page-container">
            <div>
              <SignedOut><SignInButton /></SignedOut>
              <SignedIn><UserButton /></SignedIn>
            </div>
          </div>
        )}
      </div>
      {/* footer always displays */}
      <StickyFooter />
    </div>
  );
}

export default App;