import {useEffect, useState} from 'react';
import Link from 'next/link';
import axios from "axios";
import Cookies from 'js-cookie';

const Withdraw = (props) => {
  const [withdrawAmt, setWithdrawAmt] = useState('');
  const [balance, setBalance] = useState(null);


  useEffect(() => {
    const getUser = async () => {
      try {
        let userId = Cookies.get("userId");
        let res = await axios.get(`http://localhost:8000/verify/`, {headers: {userId}} )
        setBalance(res.data.balance);
      } catch(e) {
        console.log(e)
      }
    }
    getUser().catch(console.error);
  },[])

  const withdrawMoney = async () => {
    try {
      let userId = Cookies.get("userId");
      const res = await axios.put(`http://localhost:8000/deposit`, {withdrawAmt}, {headers: {userId}});
      setBalance(res.data);
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <>
      <Link href="/">
        <button>{'<- Back'}</button>
      </Link>
      <div className="transaction-wrapper">
        <h1>Withdraw</h1>
        <h2>Available Balance: {balance ? '$' + balance : 'No Money!'}</h2>
        <form>
          <br/>
          <label htmlFor="withdraw-amount">Withdraw Amount:</label>
          <input
            type="number"
            id="withdraw-amount"
            name="withdraw-amount"
            value={withdrawAmt}
            onInput={(e) => setWithdrawAmt(e.target.value)}
          />
        </form>
        <button className="atm-button" type="button" onClick={withdrawMoney}> Withdraw </button>
      </div>
    </>
  );
};

export default Withdraw;
