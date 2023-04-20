import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import {useEffect, useState} from "react";


const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const deposit = () => {
  const [depositAmt, setDepositAmt] = useState(null);
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

  const depositMoney = async () => {
    try {
      let userId = Cookies.get("userId");
      const res = await axios.put(`http://localhost:8000/deposit`, {depositAmt}, {headers: {userId}});
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
          <label className="trans-label" htmlFor="deposit-amount">Enter amount to deposit</label>
          <input className="input-bar"
            type="number"
            id="deposit-amount"
            name="deposit-amount"
            value={depositAmt}
            onInput={(e) => setDepositAmt(e.target.value)}
          />
        </form>
        <button className="atm-button" type="button" onClick={depositMoney}>DEPOSIT</button>
      </div>
    </>
  );
};

export default deposit;