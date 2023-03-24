import "./App.css";
import logo from "./logo.png";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import {
  Navbar,
  Container,
  Button,
} from "react-bootstrap";
import contractAbi20 from "./contractAbi20.json";
import contractAbi721 from "./contractAbi721.json";
import contractAbi1155 from "./contractAbi1155.json";
import swAbi from "./swAbi.json";
import {
  SHADOW_WALLET_ADDRESS,
  TEST_ERC20_ADDRESS,
  TEST_ERC721_ADDRESS,
  TEST_ERC1155_ADDRESS,
  ERC1155_GAME_ID,
  ERC721_TOKEN_ID,
  ERC20_TOKEN_AMOUNT,
  ERC1155_TOKEN_AMOUNT
} from "./config";

// in place of erc20 token address i have added link token address

function App() {
  // Shadow wallet
  const [message, setMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState("");
  const [connect, setConnect] = useState("Connect Wallet");

  const [erc20Balance, setErc20Balance] = useState(""); 
  const [erc721Balance, setErc721Balance] = useState(""); 
  const [erc1155Balance, setErc1155Balance] = useState(""); 
  const [receiverAddress, setReceiverAddress] = useState("");
  // const [amount, setAmount] = useState("");
  const [receiverAddress1, setReceiverAddress1] = useState(""); 
  // const [tokenId721, setTokenId721] = useState("");
  const [receiverAddress2, setReceiverAddress2] = useState("");
  // const [amt1, setAmt1] = useState("");

  // Connected wallet
  const [erc20BalanceUser, setErc20BalanceUser] = useState(""); 
  const [erc721BalanceUser, setErc721BalanceUser] = useState("");
  const [erc1155BalanceUser, setErc1155BalanceUser] = useState("");
  const [receiverAddressUser, setReceiverAddressUser] = useState("");
  // const [amtUser, setAmtUser] = useState("");
  const [receiverAddress1User, setReceiverAddress1User] = useState("");
  // const [tokenId721User, setTokenId721User] = useState("");
  const [receiverAddress2User, setReceiverAddress2User] = useState("");
  // const [amt1User, setAmt1User] = useState("");


  // metamask wallet connect
  const connectWallet = async () => {
    if (window.ethereum) {
      // to detect etherrum provider
      try {
        const accounts = await window.ethereum.request({
          // this request connection to metamask
          method: "eth_requestAccounts",
        });
        setDefaultAccount(accounts[0]); // this sets def acc to ac address.
        setConnect("Refresh wallet");
      } catch (err) {
        // error here means problem while connecting
        console.error(err);
        setMessage("Error connecting to MetaMask");
      }
    } else {
      setMessage("Please Install MetaMask");
    }
  };

  // Get ERC20 balance of shadow wallet
  const getERC20Balance = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      TEST_ERC20_ADDRESS,
      contractAbi20,
      signer
    ); 
    const balance = await contract.balanceOf(SHADOW_WALLET_ADDRESS);
    console.log(`ERC20 balance of ${SHADOW_WALLET_ADDRESS} is ${ethers.utils.parseUnits(balance.toString(), '6')}`)
    setErc20Balance(ethers.utils.parseUnits(balance.toString(), '6').toString());
  } catch (err) {
    console.error("Something went wrong: ", err);
  }
  };

  // Get ERC721 balance of shadow wallet
  const getERC721Balance = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      TEST_ERC721_ADDRESS,
      contractAbi721,
      signer
    );
    const balance = await contract.balanceOf(
      SHADOW_WALLET_ADDRESS
    );
    console.log(`ERC721 balance of ${SHADOW_WALLET_ADDRESS} is ${balance.toString()}`)
    setErc721Balance(balance.toString());
  } catch (err) {
    console.error("Something went wrong: ", err);
  }
  };

  // Get ERC1155 balance of shadow wallet
  const getERC1155Balance = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      TEST_ERC1155_ADDRESS,
      contractAbi1155,
      signer
    );
    const balance = await contract.balanceOf(SHADOW_WALLET_ADDRESS, ERC1155_GAME_ID); 
    console.log(`ERC1155 balance of ${SHADOW_WALLET_ADDRESS} is ${balance.toString()}`)
    setErc1155Balance(balance.toString());
  } catch (err) {
    console.error("Something went wrong: ", err);
  }
  };

  // Transfer ERC20 token from shadow wallet
  const erc20Transfer = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(SHADOW_WALLET_ADDRESS, swAbi, signer); 
    const amount = ethers.utils.parseUnits(ERC20_TOKEN_AMOUNT, 6);  
      const tx = await contract.transferERC20Token(
        TEST_ERC20_ADDRESS,
        receiverAddress,
        amount
      );
      await tx.wait();
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

  // Transfer ERC721 token from shadow wallet
  const erc721Transfer = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(SHADOW_WALLET_ADDRESS, swAbi, signer); 
      const tx = await contract.transferERC721Token(
        TEST_ERC721_ADDRESS,
        receiverAddress1,
        ERC721_TOKEN_ID
      ); 
      await tx.wait();
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

  // Transfer ERC1155 token from shadow wallet
  const erc1155Transfer = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(SHADOW_WALLET_ADDRESS, swAbi, signer);
      const tx = await contract.transferERC1155Token(
        TEST_ERC1155_ADDRESS,
        receiverAddress2,
        ERC1155_GAME_ID,
        ERC1155_TOKEN_AMOUNT,
        "0x00"
      );
      await tx.wait();
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

  // Get ERC20 balance of the user
  const getERC20BalanceUser = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      TEST_ERC20_ADDRESS,
      contractAbi20,
      signer
    );
    const balance = await contract.balanceOf(
      defaultAccount
    );
    console.log(`ERC20 balance of ${defaultAccount} is ${ethers.utils.parseUnits(balance.toString(), '6')}`)
    setErc20BalanceUser(ethers.utils.parseUnits(balance.toString(), 6).toString());
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

  // Get ERC721 balance of the user
  const getERC721BalanceUser = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      TEST_ERC721_ADDRESS,
      contractAbi721,
      signer
    );
    const balance = await contract.balanceOf(
      defaultAccount
    );
    console.log(`ERC721 balance of ${defaultAccount} is ${balance.toString()}`);
    setErc721BalanceUser(balance.toString());
  } catch (err) {
    console.error("Something went wrong: ", err);
  }
  };

  // Get ERC1155 balance of the user
  const getERC1155BalanceUser = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      TEST_ERC1155_ADDRESS,
      contractAbi1155,
      signer
    );
    const balance = await contract.balanceOf(
      defaultAccount,
      ERC1155_GAME_ID
    );
    console.log(`ERC1155 balance of ${defaultAccount} is ${balance.toString()}`);
    setErc1155BalanceUser(balance.toString());
  } catch (err) {
    console.error("Something went wrong: ", err);
  }
  };

  // Transfer ERC20 token from shadow wallet
  const erc20TransferUser = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      SHADOW_WALLET_ADDRESS,
      swAbi,
      signer
    );
      const tx = await contract.transferERC20Token(
        TEST_ERC20_ADDRESS,
        receiverAddressUser,
        ERC20_TOKEN_AMOUNT
      );
      await tx.wait();
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

  // Transfer ERC721 token from shadow wallet
  const erc721TransferUser = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      SHADOW_WALLET_ADDRESS,
      swAbi,
      signer
    );
      const tx = await contract.transferERC721Token(
        TEST_ERC721_ADDRESS,
        receiverAddress1,
        ERC721_TOKEN_ID
      );
      await tx.wait();
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

  // Transfer ERC1155 token from shadow wallet
  const erc1155TransferUser = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(TEST_ERC1155_ADDRESS, swAbi, signer); // to access shadow wallet.
      const tx = await contract.transferERC1155Token(
        TEST_ERC1155_ADDRESS,
        receiverAddress2User,
        ERC1155_GAME_ID,
        ERC1155_TOKEN_AMOUNT,
        "0x00"
      );
      await tx.wait();
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div>
        <Navbar bg="black" variant="dark" expand="lg">
          <Container>
            <div className="me-auto">
              <img
                src={logo}
                alt="Site Logo"
                style={{ width: "50px", height: "auto" }}
              ></img>
              <Navbar.Brand>Shadow Wallet Demo</Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Button
                onClick={() => connectWallet()}
                variant="light"
                style={{ backgroundColor: "white", fontWeight: "500" }}
              >
                {connect}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Account Info */}
      <div>
        <Container>
          <div className="mt-4 p-3 border text-center">
            <p className="fw-bold mb-0">Connected Account : {defaultAccount}</p>
          </div>
        </Container>
      </div>

      {/* BODY */}
      <div>
        <div className="row">
          <div
            className="col-md-6 text-center bg-bl border"
            style={{
              paddingTop: "4rem",
              paddingBottom: "2rem",
              backgroundColor: "white",
              paddingLeft: "5rem",
            }}
          >
            <div className="box-1 text-center">Assets in Shadow Wallet</div>
            <div className="bg-purple p-4 rounded">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  ERC20 balance &nbsp;
                  <Button onClick={() => getERC20Balance()}> 
                    {erc20Balance ? erc20Balance : "Get"} 
                  </Button>
                </h5>
                <input
                  value={receiverAddress}
                  placeholder="receiver address"
                  type="text"
                  onChange={(e) => setReceiverAddress(e.target.value)}
                />
                {/* <input
                  value={amount}
                  placeholder="token amount"
                  type="text"
                  onChange={(e) => setAmount(ERC20_TOKEN_AMOUNT)}
                /> */}
                <Button variant="primary" onClick={() => erc20Transfer()}>
                  Transfer Token
                </Button>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  ERC721 balance &nbsp;
                  <Button onClick={() => getERC721Balance()}> 
                    {erc721Balance ? erc721Balance : "Get"} 
                  </Button>
                </h5>
                <input
                  value={receiverAddress1}
                  placeholder="receiver address"
                  type="text"
                  onChange={(e) => setReceiverAddress1(e.target.value)}
                />
                {/* <input
                  value={tokenId721}
                  placeholder="token id"
                  type="text"
                  onChange={(e) => setTokenId721(e.target.value)}
                /> */}
                <Button variant="primary" onClick={() => erc721Transfer()}>
                  Transfer NFT
                </Button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  ERC1155 balance &nbsp;
                  <Button onClick={() => getERC1155Balance()}>
                    {erc1155Balance ? erc1155Balance : "Get"}
                  </Button>
                </h5>
                <input
                  value={receiverAddress2}
                  placeholder="receiver address"
                  type="text"
                  onChange={(e) => setReceiverAddress2(e.target.value)}
                />
                {/* <input
                  value={amt1}
                  placeholder="token amount"
                  type="text"
                  onChange={(e) => setAmt1(e.target.value)}
                /> */}
                <Button variant="primary" onClick={() => erc1155Transfer()}>
                  Transfer SFT
                </Button>
              </div>
            </div>
          </div>

          <div
            className="col-md-6 text-center bg-bl border"
            style={{
              paddingTop: "4rem",
              paddingBottom: "2rem",
              backgroundColor: "white",
              paddingLeft: "5rem",
            }}
          >
            <div className="box-1 text-center">Assets In Connected Wallet</div>
            <div className="bg-purple p-4 rounded">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  ERC20 balance &nbsp;
                  <Button onClick={() => getERC20BalanceUser()}>
                    {erc20BalanceUser ? erc20BalanceUser : "Get"}
                  </Button>
                </h5>
                <input
                  value={receiverAddressUser}
                  placeholder="receiver address"
                  type="text"
                  onChange={(e) => setReceiverAddressUser(e.target.value)}
                />
                {/* <input
                  value={amtUser}
                  placeholder="token amount"
                  type="text"
                  onChange={(e) => setAmtUser(e.target.value)}
                /> */}
                <Button variant="primary" onClick={() => erc20TransferUser()}>
                  Transfer Token
                </Button>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  ERC721 balance &nbsp;
                  <Button onClick={() => getERC721BalanceUser()}>
                    {erc721BalanceUser ? erc721BalanceUser: "Get"}
                  </Button>
                </h5>
                <input
                  value={receiverAddress1User}
                  placeholder="receiver address"
                  type="text"
                  onChange={(e) => setReceiverAddress1User(e.target.value)}
                />
                {/* <input
                  value={tokenId721User}
                  placeholder="token id"
                  type="text"
                  onChange={(e) => setTokenId721User(e.target.value)}
                /> */}
                <Button variant="primary" onClick={() => erc721TransferUser()}>
                  Transfer NFT
                </Button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  ERC1155 balance &nbsp;
                  <Button onClick={() => getERC1155BalanceUser()}>
                    {erc1155BalanceUser ? erc1155BalanceUser : "Get"}
                  </Button>
                </h5>
                <input
                  value={receiverAddress2User}
                  placeholder="receiver address"
                  type="text"
                  onChange={(e) => setReceiverAddress2User(e.target.value)}
                />
                {/* <input
                  value={amt1User}
                  placeholder="token amount"
                  type="text"
                  onChange={(e) => setAmt1User(e.target.value)}
                /> */}
                <Button variant="primary" onClick={() => erc1155TransferUser()}>
                  Transfer SFT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
