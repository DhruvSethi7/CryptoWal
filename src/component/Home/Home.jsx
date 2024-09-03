import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";
import React, { useState } from "react";
import { useEffect } from "react";

function Home({ wallets,sendSol ,connection}) {
 
  const [balance, setbalance] = useState(0);
  async function fetchBalance() {
    try {
      const balance = await connection.getBalance(
        new PublicKey(wallets[0].publicKey.toString())
      );
      console.log(balance);
      setbalance(balance / LAMPORTS_PER_SOL);
      console.log("Balance:", balance / LAMPORTS_PER_SOL, "SOL");
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <div className="text-white flex flex-col gap-20">
        <div className="text-white text-lg self-center">
          {balance.toFixed(3)}
        </div>
        <div>{wallets[0].publicKey.toString()}</div>
        <button onClick={sendSol} className="self-center rounded-md p-2 bg-blue-800 ">Send</button>
      </div>
    </>
  );
}

export default Home;
