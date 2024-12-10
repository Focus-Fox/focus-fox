import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import './Navbar.css'

// requires 'hamburger' menu images from assets
// relies on react-router-dom, install with npm
// see changes to main.jsx
// routes in App.jsx

const toggleSideMenu = () => {
    document.querySelector(".open-menu").classList.toggle("hide");
    document.querySelector(".close-menu").classList.toggle("show");
    document.querySelector(".changing-nav").classList.toggle("show");
}

function Navbar() {
    return (
        <header>
            <h1>Focus Fox</h1>
            {/* hidden on desktop */}
            <div className="hamburger-menu" onClick={toggleSideMenu}>
                <img className="open-menu" src="./src/assets/hamburger-menu.svg" alt="three vertical bars button to reveal navigation menu" />
                <img className="close-menu" src="./src/assets/close-burger.svg" alt=" X button to hide navigation menu" />
            </div>
            <nav className='changing-nav'>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/test-page">Test Page</Link>
                    </li>
                    <li>
                        {/* Login with Clerk */}
                        {/* add "login/out" or something? */}
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar