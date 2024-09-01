import React, { useState } from "react";
import Button from "../buttons/Button";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

function Onboarding({onBoardCompleted}) {
  const [selected, setselected] = useState(false);
  const [creatingWallet, setcreatingWallet] = useState(true);
  const [phrase, setphrase] = useState([]);
  const createWallet = () => {
    setselected(true);
    const mnemonic = generateMnemonic();
    const words = mnemonic.split(" ");
    console.log(words);
    console.log(words.length);
    
    setphrase(words);
  };
  const importWallet = () => {};
  return (
    <>
      {!selected && (
        <div className="flex-col flex items-center gap-28 my">
          <div className="text-xl">Web Based Crypto Wallet</div>
          <div className="flex flex-col gap-4">
            <Button name={"Create Wallet"} handler={createWallet} />
            <Button
              name={"Import Wallet"}
              handler={() => {
                setselected(true);
                setcreatingWallet(false);
              }}
            />
          </div>
        </div>
      )}
      {selected && (
        <div>
            <button onClick={()=>setselected(false)} className="text-2xl">{"<-"}</button>
          {creatingWallet && (
            <div className="flex flex-col gap-8 items-center">
                <div className="text-2xl">Secret Recovery Phrase</div>
                <div className="flex flex-col items-center">
                <div className="text-yellow-500 ">This Phrase is the ONLY way to recover your wallet.</div>
                <div className="text-yellow-500 "> Do NOT share it with anyone!</div>
                </div>
            <div className="text-white grid  w-96 h-48 p-2 grid-cols-3 grid-rows-4 gap-2">
              {
            phrase.map((word, index) => (
                <div className="bg-gray-500 rounded-md flex items-center justify-center" key={index}>{`${index+1}. ${word}`}</div>
              ))
              }
            </div>
            <button onClick={()=>{
                navigator.clipboard.writeText(phrase.join(" ")).then(()=>alert("Text Copied to Clipboard"))
            }}>Copy To Clipboard</button>
            <Button handler={()=>{
                const myphrase=phrase.join(" ")
                localStorage.setItem('webwallet',myphrase)
                onBoardCompleted(myphrase)}} name={"Continue"}></Button>
            </div>
          )}
          {!creatingWallet && <div></div>}
        </div>
      )}
    </>
  );
}

export default Onboarding;
