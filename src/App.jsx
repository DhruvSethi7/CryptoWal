import React, { useEffect, useState } from "react";

import Onboarding from "./component/Onboarding/Onboarding";
import Home from "./component/Home/Home";
import {mnemonicToSeedSync} from "bip39"
import {derivePath} from "ed25519-hd-key"
import {Connection, Keypair} from "@solana/web3.js"
import Send from "./component/Send/Send";


function App() {
  const [onboarding, setonboarding] = useState(true);
  const [accountIndex, setaccountIndex] = useState(0);
  const [sendingSol, setsendingSol] = useState(false)
  const [wallets, setwallets] = useState([]);
  const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/r3TWagQw-Jt5a3xMIDmoGmYUG2vDmQKx"
  );
  function onBoardCompleted(phrase) {
    generateAccount(phrase);
    setonboarding(false);
  }
  function recoverAccount(phrase) {}
  useEffect(() => {
    const pharse = localStorage.getItem("webwallet");
    if (pharse) {
      setonboarding(false);
      generateAccount(pharse);
    }
  }, []);

  const generateAccount = (phrase) => {
    const seed = mnemonicToSeedSync(phrase);
    const derivationPath = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;

    // Generate keypair using the derived seed
    const keypair = Keypair.fromSeed(derivedSeed.slice(0, 32));
    setwallets([...wallets, keypair]);
  };

  

  return (
    <div className="h-screen text-white bg-black flex flex-col justify-center items-center">
      <h1 className="mb-4  text-sky-400">Welcome to CryptoWal</h1>
      <div className="h-3/4 w-1/3 border-2 border-gray-400 rounded-lg  p-5 flex justify-center items-center">
      
        {onboarding && <Onboarding onBoardCompleted={onBoardCompleted} />}
        {!onboarding && <>
        {!sendingSol && <Home wallets={wallets} connection={connection} sendSol={()=>setsendingSol(true)}/>}
        {
          sendingSol && <Send keypair={wallets[0]}   backToHome={()=>setsendingSol(false)}/>
        }
        </> }
      </div>
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear All
      </button>
    </div>
  );
}

export default App;
