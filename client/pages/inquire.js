import Link from 'next/link';
import Cookies from "js-cookie";
import axios from "axios";
import {useEffect, useState} from "react";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const inquire = () => {


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

  const [balance, setBalance] = useState(null);
  return (
    <>
      <Link href="/">
        <button className="back-button">{'<- Back'}</button>
      </Link>
      <div className="transaction-wrapper">
        <h2>CURRENT BALANCE:</h2>
        <h2 className="trans-currBalance">{formatter.format(balance)}</h2>
      </div>
    </>
  );
};

export default inquire;
