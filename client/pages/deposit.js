import Link from "next/link";
import {useState} from "react";


const deposit = () => {
  const [depositAmt, setDepositAmt] = useState('');
  const [balance, setBalance] = useState(10);

  const depositMoney = () => {
    let newBalance = balance + depositAmt
    setBalance(newBalance)
  }

  return (
    <>
      <Link href="/"><button>{"<- Back"}</button></Link>
      <h1>Deposit</h1>
      <h2>Available Balance: {balance ? "$" + balance : "No Money!"}</h2>
      <form>
        <label htmlFor="account-number">Deposit Amt:</label>
        <input type="number" id="account-number" name="account-number"
               value={depositAmt} onInput={(e) => setDepositAmt(e.target.value)} />
      </form>
      <button onClick={depositMoney}> Withdraw </button>
    </>
  )
}

export default deposit;