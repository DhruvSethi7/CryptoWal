import React, { useEffect, useState } from 'react'

import Onboarding from './component/Onboarding/Onboarding'
import Home from './component/Home/Home'
import { ethers } from 'ethers'

function App() {
  
  const [onboarding, setonboarding] = useState(true)
  const [accountIndex, setaccountIndex] = useState(0)
  const [wallets, setwallets] = useState([])
  function onBoardCompleted(phrase) {
    generateAccount(phrase)
    setonboarding(false)
  }
  useEffect(() => {
    const pharse=localStorage.getItem('webwallet')
    if (pharse) {
      setonboarding(false)
      generateAccount(pharse)
    }
  }, [])
  
  const generateAccount=(phrase)=>{
    const mnemonic = ethers.Mnemonic.fromPhrase(phrase);
    const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/${accountIndex}'/0'`);
    setwallets([...wallets,wallet])
  }
  return (
    <div className='h-screen text-white bg-black flex flex-col justify-center items-center'>
      <div className='h-3/4 w-1/3 border-2 border-gray-400 rounded-lg  p-5 flex justify-center items-center'>
        {onboarding && <Onboarding onBoardCompleted={onBoardCompleted} />}
        {!onboarding && <Home wallets={wallets}/>}
      </div>
      <button onClick={()=>{localStorage.clear()}}>Clear All</button>
    </div>
  )
}

export default App