import Link from 'next/link';

const inquire = () => {
  const balance = 10;
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
