import React, { useState } from "react";
import "./App.css";
import { ethers, SocketProvider } from "ethers";
import contractAbi20 from "./contractAbi20.json";
import contractAbi721 from "./contractAbi721.json";
import contractAbi1155 from "./contractAbi1155.json";
import swAbi from  "./swAbi.json";

function App() {

  const [message, setMessage] = useState(''); // normal config
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connect , setConnect] = useState("Connect Wallet");

  const [erc20Bal, setErc20Bal] = useState(null); // erc 20 balance reovery
  const [erc20Taddy, setErc20Taddy] = useState('');

  const [erc721Bal, setErc721Bal ] = useState(''); // erc 721 balance
  const [erc721Taddy, setErc721Taddy] = useState('');

  const [erc1155Bal, setErc1155Bal ] = useState(''); // erc 1155 balance
  const [erc1155Taddy, setErc1155Taddy] = useState('');
  const [tokenId , setTokenId] = useState('');

  const [ erc20Taddy1, setErc20Taddy1] = useState(''); // erc 20 transfer.
  const [ recieverAddy , setRecieverAddy] = useState('');
  const [ amt , setAmt] = useState('');
  const [ txStatus , setTxStatus] = useState('');
  const [ txHash , setTxHash] = useState('');

  const [ erc721Taddy1, setErc721Taddy1] = useState(''); // erc 721 transfer.
  const [ recieverAddy1 , setRecieverAddy1] = useState('');
  const [ tokenId721 , setTokenId721] = useState('');
  const [ txStatus721 , setTxStatus721] = useState('');
  const [ txHash721 , setTxHash721] = useState('');

  const [ erc1155Taddy1, setErc1155Taddy1] = useState(''); // erc 1155 transfer.
  const [ recieverAddy2 , setRecieverAddy2] = useState('');
  const [ tokenId1155 , setTokenId1155] = useState('');
  const [ txStatus1155 , setTxStatus1155] = useState('');
  const [ txHash1155 , setTxHash1155] = useState('');
  const [ amt1 , setAmt1] = useState('');
  const [ callBack , setCallBack] = useState('');

  // metamask wallet connect
  const connectWallet = async () => {
    if (window.ethereum) { // to detect etherrum provider
      try {
        const accounts = await window.ethereum.request({ // this request connection to metamask
          method: "eth_requestAccounts",
        });
        setDefaultAccount(accounts[0]); // this sets def acc to ac address.
        console.log(defaultAccount); // just to confirm if correct address is coming.
        console.log(typeof defaultAccount); // just to confirm what is returned to us
        setConnect(defaultAccount)
      } catch (err) {                          // error here means problem while connecting
        console.error(err);
        setMessage("problem connecting to MetaMask");
      }
    } else {
      setMessage("Please Install MetaMask");
    }
  }

  const erc20Balance = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();

    const contract = new ethers.Contract(erc20Taddy, contractAbi20 , signer);
    const balance = await contract.balanceOf("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7"); // shadow wallet address.

    setErc20Bal(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc721Balance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();
    const contract = new ethers.Contract(erc721Taddy, contractAbi721 , signer); // add a diff input variable erc tassddyy wala

    const balance = await contract.balanceOf("0x0c1e5ed8abd399429aa2dbf586d01038509dc25e") // shadow wallet address , token id.
    setErc721Bal(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc1155Balance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();
    const contract = new ethers.Contract(erc1155Taddy, contractAbi1155 , signer); // add a diff input variable erc tassddyy wala

    const balance = await contract.balanceOf("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7" , tokenId) // shadow wallet address , token id.
    setErc1155Bal(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc20Transfer = async () => {

    setTxStatus("transaction started...");
    setTxHash(" ");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7", swAbi , signer); // to access shadow wallet.

    // const amount = ethers.utils.parseUnits(amt, 18);  //link works with this usdt wors wirthoug.
    // console.log(amount.toString());

    try {
      const tx = await contract.transferERC20Token(erc20Taddy1 , recieverAddy , amt); // function in shadow wallet
      await tx.wait();
      setTxHash(tx.hash);
      setTxStatus("Successfulll..");
    } catch (err) {
      console.error(err);
      setTxStatus(err.message);
    }

  }

  const erc721Transfer = async () => {

    setTxStatus721("transaction started...");
    setTxHash721(" ");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7", swAbi , signer); // to access shadow wallet.

    try {
      const tx = await contract.transferERC721Token( erc721Taddy1 , recieverAddy1 , tokenId721 ); // function in shadow wallet
      await tx.wait();
      setTxHash721(tx.hash);
      setTxStatus721("Successfulll..");
    } catch (err) {
      console.error(err);
      setTxStatus721(err.message);
    }

  }

  const erc1155Transfer = async () => {

    setTxStatus1155("transaction started...");
    setTxHash1155(" ");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7", swAbi , signer); // to access shadow wallet.

    try {
      const tx = await contract.transferERC1155Token( erc1155Taddy1 , recieverAddy2 , tokenId1155 , amt1 , callBack); // function in shadow wallet
      await tx.wait();
      setTxHash1155(tx.hash);
      setTxStatus1155("Successfulll..");
    } catch (err) {
      console.error(err);
      setTxStatus1155(err.message);
    }

  }

  return(
    <div 
      style={{
        backgroundImage: `url("https://www.etsy.com/img/16065431/r/il/ff5729/3363529969/il_fullxfull.3363529969_r8xx.jpg")` ,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div
        style={{
          paddingTop: '2rem',
          paddingLeft: '65rem',
          backgroundColor: 'black',
          width: '100vw',
          height: '10vh'
        }}>
        <button onClick={() => connectWallet()}>{connect}</button>
      </div>
      <div 
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '36rem',
        }}>
        USER : {defaultAccount}
      </div>
      

      <div
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '36rem',
        }}>
        <input value={erc20Taddy} placeholder="token addy" type="text" onChange={(e) => setErc20Taddy(e.target.value)} />
        <button onClick={() => erc20Balance()}>Get ERC 20 Token Balance</button>
        <div style={{ paddingTop: "1rem" }}>
          Token Balance: {erc20Bal}
        </div>
      </div>

      <div
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '36rem',
        }}>
        <input value={erc721Taddy} placeholder="token addy" type="text" onChange={(e) => setErc721Taddy(e.target.value)} />
        <button onClick={() => erc721Balance()}>Get ERC 721 Token Balance</button>
        <div style={{ paddingTop: "1rem" }}>
          Token Balance: {erc721Bal}
        </div>
      </div>

      <div
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '36rem',
        }}>
        <input value={erc1155Taddy} placeholder="token addy" type="text" onChange={(e) => setErc1155Taddy(e.target.value)} />
        <input value={tokenId} placeholder="token ID" type="text" onChange={(e) => setTokenId(e.target.value)} />
        <button onClick={() => erc1155Balance()}>Get ERC 1155 Token Balance</button>
        <div style={{ paddingTop: "1rem" }}>
          Token Balance: {erc1155Bal}
        </div>
      </div>

      <div
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '36rem',
        }}>
        <input value={erc20Taddy1} placeholder="token addy" type="text" onChange={(e) => setErc20Taddy1(e.target.value)} />
        <input value={recieverAddy} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy(e.target.value)} />
        <input value={amt} placeholder="token amt" type="text" onChange={(e) => setAmt(e.target.value)} />
        <button style={{elevation: 3}} onClick={() => erc20Transfer()}>transfer ERC20 token</button>
        <div style={{ paddingTop: "1rem" }}>
          Transaction Status : {txStatus}
        </div>
        <div style={{ paddingTop: "1rem" }}>
          Transaction Hash : {txHash}
        </div>
      </div> 

      <div
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '36rem',
        }}>
        <input value={erc721Taddy1} placeholder="token addy" type="text" onChange={(e) => setErc721Taddy1(e.target.value)} />
        <input value={recieverAddy1} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy1(e.target.value)} />
        <input value={tokenId721} placeholder="token id" type="text" onChange={(e) => setTokenId721(e.target.value)} />
        <button style={{elevation: 3}} onClick={() => erc721Transfer()}>transfer ERC 721 token</button>
        <div style={{ paddingTop: "1rem" }}>
          Transaction Status : {txStatus721}
        </div>
        <div style={{ paddingTop: "1rem" }}>
          Transaction Hash : {txHash721}
        </div>
      </div> 

      <div
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '36rem',
        }}>
        <input value={erc1155Taddy1} placeholder="token addy" type="text" onChange={(e) => setErc1155Taddy1(e.target.value)} />
        <input value={recieverAddy2} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy2(e.target.value)} />
        <input value={tokenId1155} placeholder="token id" type="text" onChange={(e) => setTokenId1155(e.target.value)} />
        <input value={amt1} placeholder="token amt" type="text" onChange={(e) => setAmt1(e.target.value)} />
        <input value={callBack} placeholder="call back data" type="text" onChange={(e) => setCallBack(e.target.value)} />
        <button style={{elevation: 3}} onClick={() => erc1155Transfer()}>transfer ERC 1155 token</button>
        <div style={{ paddingTop: "1rem" }}>
          Transaction Status : {txStatus1155}
        </div>
        <div style={{ paddingTop: "1rem" }}>
          Transaction Hash : {txHash1155}
        </div>
      </div> 
    </div>  
  )
}

export default App;

/*

sree asked me 

if we could have a drop down */