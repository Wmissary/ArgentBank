import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../features/auth/authSlice";
import { removeTokenFromStorage, removeUserFromStorage } from "../../app/utils/storage";

export default function LoggedInNavbar() {
  const dispatch = useDispatch();

  const userLastName = useSelector(state => state.profile.firstName);
  const userFirstName = useSelector(state => state.profile.lastName);

  const handleSignOut = () => {
    dispatch(logout());
    removeTokenFromStorage();
    removeUserFromStorage();
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
