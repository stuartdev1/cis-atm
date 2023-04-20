import {useEffect, useState} from 'react';
import Link from 'next/link';
import axios from "axios";
import Cookies from 'js-cookie';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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
      const res = await axios.put(`http://localhost:8000/withdraw`, {withdrawAmt}, {headers: {userId}});
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
        <h2 className="trans-balance">{balance ? formatter.format(balance) : 'No Money!'}</h2>
        <form className="trans-form">
          <br/>
          <label className="trans-label" htmlFor="withdraw-amount">Enter an amount to withdraw</label><br></br>
          <input className="input-bar"
            type="number"
            id="withdraw-amount"
            name="withdraw-amount"
            value={withdrawAmt}
            onInput={(e) => setWithdrawAmt(e.target.value)}
          />
        </form>
        <br></br>
        <button className="atm-button" type="button" onClick={withdrawMoney}>WITHDRAW</button>
      </div>
    </>
  );
};

export default Withdraw;
