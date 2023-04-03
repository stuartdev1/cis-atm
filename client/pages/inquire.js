import Link from 'next/link';
import Cookies from "js-cookie";
import axios from "axios";
import {useEffect, useState} from "react";



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
        <button>{'<- Back'}</button>
      </Link>
      <div className="transaction-wrapper">
        <h1>Balance Inquiry</h1>
        <h2>Your current balance is: {balance}</h2>
      </div>
    </>
  );
};

export default inquire;
