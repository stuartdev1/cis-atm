import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Validation = () => {
  const [validUser, setValidUser] = useState(false);
  const [accountNum, setAccountNum] = useState('');
  const [accountPin, setAccountPin] = useState('');

  async function validateUser() {
    try {
      let res = await axios.get(`http://localhost:8000/auth/`, {headers: {accountNum, accountPin}});
      console.log(res.data)
      document.cookie = `userId=${res.data.userId.accountId}`;
      res.data.isValid ? setValidUser(true) : setValidUser(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="atm-wrapper">
      <h1 className="atm-title">Welcome to the Bank of CIS ATM</h1>
      {!validUser && (
        <div className="login-page">
          <form>
            <h2>Enter your account number and pin</h2>
            <div className="login-input">
              <label htmlFor="account-number" className="login-label">Account Number:</label>
              <input
                type="number"
                id="account-number"
                name="account-number"
                value={accountNum}
                onInput={(e) => setAccountNum(e.target.value)}
              />
            </div>
            <div className="login-input">
              <label htmlFor="account-pin" className="login-label">Account Pin:</label>
              <input
                type="number"
                id="account-pin"
                name="account-pin"
                value={accountPin}
                onInput={(e) => setAccountPin(e.target.value)}
              />
            </div>
            <div className="login-input">
              <button type="button" className="atm-button" onClick={validateUser}>
                Verify
              </button>
            </div>
          </form>
        </div>
      )}
      {validUser && (
        <>
          <h1 className="atm-title">What type of transaction would you like to make?</h1>
          <div className="home-links">
            <div className="links-col1">
              <div className="home-link__link-col1">
                <Link href="./withdraw">
                  <button className="atm-button">Withdraw</button>
                </Link>
              </div>
              <div className="home-link__link-col1">
                <Link href="./deposit">
                  <button className="atm-button">Deposit</button>
                </Link>
              </div>
            </div>
            <div className="links-col2">
              <div className="home-link__link-col2">
                <Link href="./inquire">
                  <button className="atm-button">Check balance</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Validation;
