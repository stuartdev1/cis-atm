import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the CIS ATM</h1>
      <h2>What type of transaction would you like to make?</h2>
      <Link href="./withdraw"><button>Withdraw</button></Link>
      <Link href="./deposit"><button>Deposit</button></Link>
      <Link href="./inquire"><button>Check balance</button></Link>
    </div>
  )
}
