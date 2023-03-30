import Link from 'next/link';
import { useState } from 'react';

export default function Home(props) {
  const [validUser, setValidUser] = useState(true);
  const [accountNumber, setAccountNumber] = useState(props?.value ?? '');
  const [accountPin, setAccountPin] = useState('');

  const validateUser = () => {};

  return (
    <div className="atm-wrapper">
      <h1 className="atm-title">Welcome to the Bank of CIS ATM</h1>
      {!validUser && (
        <div>
          <form>
            <h2>Enter your account number and pin</h2>
            <label htmlFor="account-number">Account Number:</label>
            <input
              type="number"
              id="account-number"
              name="account-number"
              value={accountNumber}
              onInput={(e) => setAccountNumber(e.target.value)}
            />
            <br />
            <label htmlFor="account-pin">Account Pin:</label>
            <input
              type="number"
              id="account-pin"
              name="account-pin"
              value={accountPin}
              onInput={(e) => setAccountPin(e.target.value)}
            />
            <br />
            <button>Verify</button>
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
                  <button className="atm-button" >Withdraw</button>
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
}
