import {useState} from "react";
import Link from "next/link";


const withdraw = (props) => {
  const [withdrawAmt, setWithdrawAmt] = useState('');
  const [balance, setBalance] = useState(10);

  const withdrawMoney = () => {
   let newBalance = balance - withdrawAmt
    setBalance(newBalance)
  }

  return (
    <>
      <Link href="/"><button>{"<- Back"}</button></Link>
    <h1>Withdraw</h1>
      <h2>Available Balance: {balance ? "$" + balance : "No Money!"}</h2>
    <form>
      <label htmlFor="account-number">Withdraw Amt:</label>
      <input type="number" id="account-number" name="account-number"
             value={withdrawAmt} onInput={(e) => setWithdrawAmt(e.target.value)} />
    </form>
      <button onClick={withdrawMoney}> Withdraw </button>
    </>
  )
}

export default withdraw;