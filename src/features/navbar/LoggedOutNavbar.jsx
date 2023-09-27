import { Link } from "react-router-dom";

export default function LoggedInNavbar() {
  return (
    <Link to={"/login"} className="main-nav-item">
      <i className="fa fa-user-circle main-nav-icon"></i>
      Sign In
    </Link>
  );
}
