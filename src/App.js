import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import artifacts from './artifacts/contracts/Greeter.sol/Greeter.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [greeting, setGreeting] = useState(null);

  // async function metaMaskConnect() {
  //   const _provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await _provider.send("eth_requestAccounts", []);
  //   const signer = _provider.getSigner();
  //   console.log("Account:", await signer.getAddress());
  //   return _provider;
  // }

  useEffect(() => {
    let connectWithContract = async () => {
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const url = 'http://127.0.0.1:8545/';

      const _provider = await new ethers.providers.JsonRpcProvider(url);
      //const _provider = await metaMaskConnect();
      const _contract = await new ethers.Contract(contractAddress, artifacts.abi, provider);
      setContract(_contract);
      setProvider(_provider);
    }
    connectWithContract();
  }, []);

  useEffect(() => {
    let showGreeting = async () => {
      let signer = await contract?.connect(provider.getSigner());
      let temp = await signer.greet();
      setGreeting(temp);
    }
    provider && contract && showGreeting();
  }, [contract]);

  //changing the state of contract
  async function changeGreeting() {
    const input = document.querySelector('#value').value;
    let signer = await contract?.connect(provider.getSigner());
    await signer.setGreeting(input);
    // const tx = await signer.setGreeting(input);
    // await tx.wait();
    let temp = await signer.greet();
    setGreeting(temp);
  }

  return (
    <div className="App">
      <div className="center">
        <h3>{greeting}</h3>
        <input className="input" type="text" id="value"></input>
        <button className="button" onClick={changeGreeting}>
          Change
        </button>
      </div>
    </div>
  );
}

export default App;
