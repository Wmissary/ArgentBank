import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useGetProfileMutation, useUpdateNameMutation } from "../../app/services/api";
import { setUserLastPage } from "../auth/authSlice";

import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editMode, setEditMode] = useState(false);

  const userFirstName = useSelector(state => state.auth.user.firstName);
  const userLastName = useSelector(state => state.auth.user.lastName);

  const [getProfile] = useGetProfileMutation();
  const [updateName] = useUpdateNameMutation();

  useEffect(() => {
    getProfile()
      .unwrap()
      .catch(() => {
        dispatch(setUserLastPage("/profile"));
        navigate("/login");
      });
  }, [getProfile, navigate, dispatch]);

  const handleEdit = () => {
    setFirstName(userFirstName);
    setLastName(userLastName);
    setEditMode(true);
  };
  const saveNewName = async () => {
    try {
      await updateName({ firstName, lastName });
      setEditMode(false);
    } catch (error) {
      dispatch(setUserLastPage("/profile"));
      navigate("/login");
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {editMode ? "" : userFirstName + " " + userLastName}
        </h1>
        {editMode ? (
          <div>
            <input type="text" className="edit-input" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input type="text" className="edit-input" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
        ) : (
          ""
        )}
        {editMode ? (
          <div>
            <button className="edit-button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
            <button className="edit-button" onClick={saveNewName}>
              Save
            </button>
          </div>
        ) : (
          <button className="edit-button" onClick={handleEdit}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
