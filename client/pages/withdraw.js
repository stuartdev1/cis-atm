import { useState } from 'react';
import Link from 'next/link';

const withdraw = (props) => {
  const [withdrawAmt, setWithdrawAmt] = useState('');
  const [balance, setBalance] = useState(10);

  const withdrawMoney = () => {
    let newBalance = balance - withdrawAmt;
    setBalance(newBalance);
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
          <label htmlFor="withdraw-amount">Withdraw Amount:</label>
          <input
            type="number"
            id="withdraw-amount"
            name="withdraw-amount"
            value={withdrawAmt}
            onInput={(e) => setWithdrawAmt(e.target.value)}
          />
        </form>
        <button className="atm-button" onClick={withdrawMoney}> Withdraw </button>
      </div>
    </>
  );
};

export default withdraw;
