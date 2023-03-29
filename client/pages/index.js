import Link from "next/link";
import {useState} from "react";

export default function Home(props) {
  const [validUser, setValidUser] = useState(true)
  const [accountNumber, setAccountNumber] = useState(props?.value ?? "")
  const [accountPin, setAccountPin] = useState("")

  const validateUser = () => {

  }

  return (
    <div>
      {!validUser && (
        <div>
          <h1>Welcome to the CIS ATM</h1>
          <form>
            <h2>Enter your account number and pin</h2>
            <label htmlFor="account-number">Account Number:</label>
            <input
              type="number"
              id="account-number"
              name="account-number"
              value={accountNumber}
              onInput={(e) => setAccountNumber(e.target.value)}
            />
            <br />
            <label htmlFor="account-pin">Account Pin:</label>
            <input
              type="number"
              id="account-pin"
              name="account-pin"
              value={accountPin}
              onInput={(e) => setAccountPin(e.target.value)}
            />
            <br />
            <button>Verify</button>
          </form>
        </div>
      )}
      {validUser && (
        <div>
          <h1>What type of transaction would you like to make?</h1>
          <Link href="./withdraw">
            <button>Withdraw</button>
          </Link>
          <Link href="./deposit">
            <button>Deposit</button>
          </Link>
          <Link href="./inquire">
            <button>Check balance</button>
          </Link>
        </div>
      )}
    </div>
  );
}
