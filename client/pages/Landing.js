import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Typed from 'typed.js';
import Cookies from 'js-cookie';

const Landing = () => {
  const [validUser, setValidUser] = useState(false);
  const [accountNum, setAccountNum] = useState('');
  const [accountPin, setAccountPin] = useState('');
  const element = useRef(null);

  async function validateUser() {
    try {
      let res = await axios.get(`http://localhost:8000/auth/`, {
        headers: { accountNum, accountPin }
      });
      console.log(res.data);
      document.cookie = `userId=${res.data.userId.accountId}`;
      res.data.isValid ? setValidUser(true) : setValidUser(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const welcomeMessage = new Typed('.atm-title', {
      strings: ['WELCOME TO THE BANK OF CIS ATM'],
      typeSpeed: 10,
      showCursor: false
    });

    const loginInfoMessage = new Typed('.num-pin-text', {
      strings: ['^1250PLEASE ENTER YOUR ACCOUNT NUMBER AND PIN:'],
      typeSpeed: 10,
      showCursor: false
    });

    return () => {
      welcomeMessage.destroy();
      loginInfoMessage.destroy();
    };
  }, []);
  useEffect(() => {
    const getUser = async () => {
      try {
        let userId = Cookies.get('userId');
        let res = await axios.get(`http://localhost:8000/verify/`, { headers: { userId } });
        if (res.data.accountId === Cookies.get('userId')) {
          setValidUser(false);
        } else {
          setValidUser(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser().catch(console.error);
  });

  const logout = () => {
    Cookies.remove('userId');
    location.reload();
  };

  return (
    <div className="atm-wrapper">
      {!validUser && (
        <>
          <h1 className="atm-title" ref={element} />
          <h2 className="num-pin-text"></h2>
          <br></br>
          <div className="login-page">
            <form>
              <div className="login-input">
                <label htmlFor="account-number" className="login-label"></label>
                <input
                  className="input-bar"
                  type="number"
                  id="account-number"
                  name="account-number"
                  onInput={(e) => setAccountNum(e.target.value)}
                />
              </div>
              <div className="login-input">
                <label htmlFor="account-pin" className="login-label"></label>
                <input
                  className="input-bar"
                  type="password"
                  id="account-pin"
                  name="account-pin"
                  onInput={(e) => setAccountPin(e.target.value)}
                />
              </div>
              <br></br>
              <br></br>
              <div className="login-input">
                <button type="button" className="atm-button" onClick={validateUser}>
                  CONFIRM
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {validUser && (
        <>
          <button onClick={logout} className="logout-button">{'Logout'}</button>
          <h1 className="home-title">SELECT A TRANSACTION</h1>
          <div className="home-links">
            <div className="links-col1">
              <Link className="atm-link" href="./inquire">
                <button className="select-button">CHECK BALANCE</button>
              </Link>
              <Link className="atm-link" href="./withdraw">
                <button className="atm-button">WITHDRAW</button>
              </Link>
              <Link className="atm-link" href="./deposit">
                <button className="atm-button">DEOPSIT</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Landing;
