import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLoginMutation } from "../../app/services/api";
import { setTokenInStorage } from "../../app/utils/storage";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const userIsAuth = useSelector(state => state.auth.isAuth);
  const lastAuthPageVisitedBeforeLogin = useSelector(state => state.auth.lastAuthPageVisitedBeforeLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const [login] = useLoginMutation();

  useEffect(() => {
    if (userIsAuth) {
      navigate("/profile");
    }
  });

  const loginUser = async e => {
    try {
      e.preventDefault();
      const { body } = await login({ email, password }).unwrap();
      setTokenInStorage(body.token, { rememberMe });
      if (lastAuthPageVisitedBeforeLogin) {
        navigate(lastAuthPageVisitedBeforeLogin);
      } else {
        navigate("/profile");
      }
    } catch (error) {
      setError(error.data.message);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={loginUser}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} required />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          {error && (
            <p className="error" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              onChange={e => setRememberMe(e.target.checked)}
              value={rememberMe}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}
