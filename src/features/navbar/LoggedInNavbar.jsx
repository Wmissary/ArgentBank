import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../auth/authSlice";

export default function LoggedInNavbar() {
  const dispatch = useDispatch();

  const userLastName = useSelector(state => state.auth.user.firstName);
  const userFirstName = useSelector(state => state.auth.user.lastName);

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <Link to={"/profile"} className="main-nav-item">
        <i className="fa fa-user-circle main-nav-icon"></i>
        {userLastName} {userFirstName}
      </Link>
      <Link to={"/login"} className="main-nav-item" onClick={handleSignOut}>
        <i className="fa fa-sign-out main-nav-icon"></i>
        Sign Out
      </Link>
    </div>
  );
}
