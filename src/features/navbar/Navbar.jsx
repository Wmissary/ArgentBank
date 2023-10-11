import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import LoggedOutNavbar from "./LoggedOutNavbar";
import LoggedInNavbar from "./LoggedInNavbar";

import "./Navbar.css";

import ArgentBankLogo from "../../assets/argentBankLogo.png";

export default function Navbar() {
  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <nav className="main-nav">
      <Link to={"/"} className="main-nav-logo">
        <img className="main-nav-logo-image" alt="Argent Bank Logo" src={ArgentBankLogo} />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {isAuth ? <LoggedInNavbar /> : <LoggedOutNavbar />}
    </nav>
  );
}
