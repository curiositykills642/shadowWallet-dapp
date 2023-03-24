import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers, SocketProvider } from "ethers";
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import contractAbi20 from "./contractAbi20.json";
import contractAbi721 from "./contractAbi721.json";
import contractAbi1155 from "./contractAbi1155.json";
import swAbi from  "./swAbi.json";


// in place of erc20 token address i have added link token address


function App() {
  
  // cshadow wallet
  const [message, setMessage] = useState(''); // normal config normal wallet useststes
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connect , setConnect] = useState("Connect Wallet");

  const [erc20Bal, setErc20Bal] = useState(null); // erc 20 balance reovery

  const [erc721Bal, setErc721Bal ] = useState(''); // erc 721 balance

  const [erc1155Bal, setErc1155Bal ] = useState(''); // erc 1155 balance

  const [ recieverAddy , setRecieverAddy] = useState('');
  const [ amt , setAmt] = useState('');

  const [ erc721Taddy1, setErc721Taddy1] = useState(''); 
  const [ recieverAddy1 , setRecieverAddy1] = useState(''); // erc 721 transfer.
  const [ tokenId721 , setTokenId721] = useState('');

  const [ recieverAddy2 , setRecieverAddy2] = useState('');
  const [ amt1 , setAmt1] = useState('');

  // connected wallet
  const [erc20Bal_n, setErc20Bal_n] = useState(null); // erc 20 balance reoveryn fonnected wallet use states

  const [erc721Bal_n, setErc721Bal_n ] = useState(''); // erc 721 balance

  const [erc1155Bal_n, setErc1155Bal_n ] = useState(''); // erc 1155 balance

  const [ recieverAddy_n , setRecieverAddy_n] = useState('');
  const [ amt_n , setAmt_n] = useState('');

  const [ recieverAddy1_n , setRecieverAddy1_n] = useState(''); // erc 721 transfer.
  const [ tokenId721_n , setTokenId721_n] = useState('');

  const [ recieverAddy2_n , setRecieverAddy2_n] = useState('');
  const [ amt1_n , setAmt1_n] = useState('');

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

  // shadow wallet
  const erc20Balance = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();

    const contract = new ethers.Contract( "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", contractAbi20 , signer); // first arg = erc 20 toekn addy
    const balance = await contract.balanceOf("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7"); // shadow wallet address.

    setErc20Bal(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc721Balance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0x3a2fc4fA3A331020286790840E1D257964EeF225", contractAbi721 , signer); // first arg = erc 721 addy

    const balance = await contract.balanceOf("0x0c1e5ed8abd399429aa2dbf586d01038509dc25e") // addy = wallet addy , i did not have 721 in shadow wallet so i used random bercause does not really maater
    setErc721Bal(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc1155Balance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xa07e45a987f19e25176c877d98388878622623fa", contractAbi1155 , signer); // first arg = erc 1155 addy , i have used polygon scan faucet test 1155 token

    const balance = await contract.balanceOf("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7" , "123") // sfirst arg  = " shadow wallet arg" , second arg token id
    setErc1155Bal(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc20Transfer = async () => {


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7", swAbi , signer); // first arg = shadow wallet addy 

    // const amount = ethers.utils.parseUnits(amt, 18);  //link works with this usdt wors wirthoug.
    // console.log(amount.toString());

    try {
      const tx = await contract.transferERC20Token("0x326C977E6efc84E512bB9C30f76E30c160eD06FB" , recieverAddy , amt); // first arg = erc20 addy
      await tx.wait();
    } catch (err) {
      console.error(err);
    }

  }

  const erc721Transfer = async () => {


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7", swAbi , signer); // to access shadow wallet.

    try {
      const tx = await contract.transferERC721Token( erc721Taddy1 , recieverAddy1 , "please enter ur respective token id here" ); // first argument is erc 721 addy i did not test this function because i did not have any efc721 nfts left please do it once i will remind you
      await tx.wait();
    } catch (err) {
      console.error(err);
    }

  }

  const erc1155Transfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xbc978a397c6f35b8d5b96a88c29f1d22fcfeaba7", swAbi , signer); // to access shadow wallet.

    try {
      const tx = await contract.transferERC1155Token( "0xa07e45a987f19e25176c877d98388878622623fa" , recieverAddy2 , "123" , amt1 , "0x00"); // 1st arg = erc 1155 addy , 3rd arg = token id , 5th arg call back data 
      await tx.wait();
    } catch (err) {
      console.error(err);
    }

  }

  // norwal wallet
  const erc20Balance_n = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();

    const contract = new ethers.Contract( "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", contractAbi20 , signer); // first arg = erc 20 toekn addy
    const balance = await contract.balanceOf("0xc0AE337e367FF5B8eF737d514523760F317b80A5"); // normal wallet address.

    setErc20Bal_n(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc721Balance_n = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0x3a2fc4fA3A331020286790840E1D257964EeF225", contractAbi721 , signer); // first arg = erc 721 addy

    const balance = await contract.balanceOf("0x0c1e5ed8abd399429aa2dbf586d01038509dc25e") // addy = wallet addy , i did not have 721 in shadow wallet so i used random bercause does not really maater
    setErc721Bal_n(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc1155Balance_n = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xa07e45a987f19e25176c877d98388878622623fa", contractAbi1155 , signer); // first arg = erc 1155 addy , i have used polygon scan faucet test 1155 token

    const balance = await contract.balanceOf("0xc0AE337e367FF5B8eF737d514523760F317b80A5" , "123") // sfirst arg  = " connected wallet arg" , second arg token id
    setErc1155Bal_n(ethers.utils.formatEther(balance,18));
    console.log(ethers.utils.formatEther(balance));
  }

  const erc20Transfer_n = async () => {


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xc0AE337e367FF5B8eF737d514523760F317b80A5", swAbi , signer); // first arg = shadow wallet addy 

    // const amount = ethers.utils.parseUnits(amt, 18);  //link works with this usdt wors wirthoug.
    // console.log(amount.toString());

    try {
      const tx = await contract.transferERC20Token("0x326C977E6efc84E512bB9C30f76E30c160eD06FB" , recieverAddy_n , amt_n); // first arg = erc20 addy
      await tx.wait();
    } catch (err) {
      console.error(err);
    }

  }

  const erc721Transfer_n = async () => {


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xc0AE337e367FF5B8eF737d514523760F317b80A5", swAbi , signer); // to access shadow wallet.

    try {
      const tx = await contract.transferERC721Token( erc721Taddy1 , recieverAddy1 , "please enter ur respective token id here" ); // first argument is erc 721 addy i did not test this function because i did not have any efc721 nfts left please do it once i will remind you
      await tx.wait();
    } catch (err) {
      console.error(err);
    }

  }

  const erc1155Transfer_n = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xa07e45a987f19e25176c877d98388878622623fa", swAbi , signer); // to access shadow wallet.

    try {
      const tx = await contract.transferERC1155Token( "0xa07e45a987f19e25176c877d98388878622623fa" , recieverAddy2_n , "123" , amt1_n , "0x00"); // 1st arg = erc 1155 addy , 3rd arg = token id , 5th arg call back data 
      await tx.wait();
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <>
      {/* header wala part*/}
      <div>   
        <Navbar bg="black" variant="dark" expand="lg">
          <Container>
            <div className="me-auto">
              <Navbar.Brand>Shadow Wallet Dashboard</Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Button onClick={() => connectWallet()} variant="light" style={{ backgroundColor: 'white', fontWeight: '500' }}>{connect}</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
          
      {/* account info wala part */}
      <div>  
        <Container>
          <div className="mt-4 p-3 border text-center">
            <p className="fw-bold mb-0">Connected Account : {defaultAccount}</p>
          </div>
        </Container>
      </div>

      {/* body wala part */}
      <div>
        <div className="row">
          
          <div className="col-md-6 text-center bg-bl border" style={{ paddingTop: '4rem', paddingBottom: '2rem', backgroundColor: 'white',paddingLeft: '5rem'}}>
            <div className="box-1">Assets In Shadow Wallet</div>
            <div className="bg-purple p-4 rounded">

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Erc 20 balance  
                  <button onClick={() => erc20Balance()}> {erc20Bal} </button>
                </h5>
                <input value={recieverAddy} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy(e.target.value)} />
                <input value={amt} placeholder="token amt" type="text" onChange={(e) => setAmt(e.target.value)} />
                <Button variant="primary" onClick={ () => erc20Transfer()}>Transfer Token</Button>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Erc 721 balance
                  <button onClick={() => erc721Balance()}> {erc721Bal} </button>
                </h5>
                <input value={recieverAddy1} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy1(e.target.value)} />
                <input value={tokenId721} placeholder="token id" type="text" onChange={(e) => setTokenId721(e.target.value)} />
                <Button variant="primary" onClick={ () => erc721Transfer()}>Transfer NFT</Button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Erc 1155 balance
                  <button onClick={() => erc1155Balance()}> {erc1155Bal} </button>
                </h5>
                <input value={recieverAddy2} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy2(e.target.value)} />
                <input value={amt1} placeholder="token amt" type="text" onChange={(e) => setAmt1(e.target.value)} />
                <Button variant="primary" onClick={() => erc1155Transfer()}>Transfer SFT</Button>
              </div>
            </div>
          </div>




          <div className="col-md-6 text-center bg-bl border" style={{ paddingTop: '4rem', paddingBottom: '2rem', backgroundColor: 'white',paddingLeft: '5rem'}}>
            <div className="box-1">Assets In Connected Wallet</div>
            <div className="bg-purple p-4 rounded">

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Erc 20 balance  
                  <button onClick={() => erc20Balance_n()}> {erc20Bal_n} </button>
                </h5>
                <input value={recieverAddy_n} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy_n(e.target.value)} />
                <input value={amt_n} placeholder="token amt" type="text" onChange={(e) => setAmt_n(e.target.value)} />
                <Button variant="primary" onClick={ () => erc20Transfer_n()}>Transfer Token</Button>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Erc 721 balance
                  <button onClick={() => erc721Balance_n()}> {erc721Bal_n} </button>
                </h5>
                <input value={recieverAddy1_n} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy1_n(e.target.value)} />
                <input value={tokenId721_n} placeholder="token id" type="text" onChange={(e) => setTokenId721_n(e.target.value)} />
                <Button variant="primary" onClick={ () => erc721Transfer_n()}>Transfer NFT</Button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Erc 1155 balance
                  <button onClick={() => erc1155Balance_n()}> {erc1155Bal_n} </button>
                </h5>
                <input value={recieverAddy2_n} placeholder="reciever addy" type="text" onChange={(e) => setRecieverAddy2_n(e.target.value)} />
                <input value={amt1_n} placeholder="token amt" type="text" onChange={(e) => setAmt1_n(e.target.value)} />
                <Button variant="primary" onClick={() => erc1155Transfer_n()}>Transfer SFT</Button>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}

export default App;
