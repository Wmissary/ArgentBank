import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetProfileMutation, useUpdateNameMutation } from "../../app/services/api";
import { logout, setLastAuthPageVisitedBeforeLogin } from "../auth/authSlice";

import { setUserInStorage, removeUserFromStorage, removeTokenFromStorage } from "../../app/utils/storage";

import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [getProfile] = useGetProfileMutation();
  const [updateName] = useUpdateNameMutation();
  const rememberMe = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    getProfile()
      .unwrap()
      .then(({ body }) => {
        setFirstName(body.firstName);
        setLastName(body.lastName);
        setUserInStorage(JSON.stringify({ firstName: body.firstName, lastName: body.lastName }), { rememberMe });
      })
      .catch(() => {
        dispatch(logout());
        dispatch(setLastAuthPageVisitedBeforeLogin("/profile"));
        removeUserFromStorage();
        removeTokenFromStorage();
        navigate("/login");
      });
  }, [getProfile, navigate, dispatch, rememberMe]);

  const handleEdit = () => {
    setEditMode(true);
  };
  const saveNewName = async () => {
    try {
      await updateName({ firstName, lastName }).unwrap();
      setUserInStorage(JSON.stringify({ firstName, lastName }), { rememberMe });
      setEditMode(false);
    } catch (error) {
      dispatch(logout());
      removeUserFromStorage();
      removeTokenFromStorage();
      navigate("/login");
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {editMode ? "" : firstName + " " + lastName}
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
