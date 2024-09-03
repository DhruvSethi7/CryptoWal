import { Transaction, Keypair, sendAndConfirmTransaction, SystemProgram, Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useState } from 'react';

function Send({ backToHome, keypair, connection }) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [sending, setSending] = useState(false);
  const [signature, setsignature] = useState("")
  const senderKeypair = keypair;

  console.log('Keypair:', senderKeypair);
  console.log('Connection:', connection);

  async function handleSend() {
    setSending(true);
    try {
      await sendSol(); // Await here to ensure the transaction is completed before continuing
    } catch (error) {
      console.error('Error in handleSend:', error);
    } finally {
      setSending(false);
    }
  }

  async function sendSol() {
    try {
        const response = await fetch('https://backend-rho-ruddy.vercel.app/send-sol', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipientAddress: address,
                amount: parseFloat(amount),
                senderSecretKey: keypair.secretKey, // This should be a Uint8Array
            }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('Transaction successful with signature:', data.signature);
            setsignature(data.signature)
        } else {
            console.error('Transaction failed:', data.error);
        }
    } catch (error) {
        console.error('Error in sendSol:', error);
    }
}

  return (
    <div className='flex flex-col gap-10 w-full'>
      <button onClick={backToHome} className="self-start ml-5 text-2xl">
        {"<-"}
      </button>
      <input
        placeholder='Recipient Address'
        className='placeholder:text-amber-200 bg-gray-400 p-4 w-2/3 self-center'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        type="text"
      />
      <input
        placeholder='SOL amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className='placeholder:text-amber-200 bg-gray-400 p-4 w-2/3 self-center'
        type="number"
      />
      <button onClick={handleSend} className='rounded-full w-min self-center bg-blue-800 p-4'>
        {!sending ? "Send" : "Sending"}
      </button>
      <div className='text-white text-wrap'>{signature}</div>
    </div>
  );
}

export default Send;
