import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
import "../../../App.css";
import Section from "../../components/Section";
import React from "react";
import Caption from "../../components/Caption";

const clientId =
  "YBAjF1ZzEDwGcJSn5QZ4qqSVL2e5KrynvstWUYFLA3eQ7lcydgU4GDqgZ2aqT2LagW4KMTvxgaVV19C6Xj52DDZc"; // get from https://dashboard.web3auth.io

function Home(props: any) {
  console.log("ESTAS SON LAS PROPS  EN HOME!!");
  console.log(props);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <>
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={getChainId} className="card">
        Get Chain ID
      </button>
      <button onClick={getAccounts} className="card">
        Get Accounts
      </button>
      <button onClick={getBalance} className="card">
        Get Balance
      </button>
      <button onClick={sendTransaction} className="card">
        Send Transaction
      </button>
      <button onClick={signMessage} className="card">
        Sign Message
      </button>
      <button onClick={getPrivateKey} className="card">
        Get Private Key
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <Section
      containerClassName=" container flex flex-col bg-purple"
      className=" "
    >
      <React.Fragment>
        <Section
          containerClassName="px-8 pt-10  mt-2 bg-purple"
          className="flex "
        >
          <React.Fragment>
            <Caption
              text="1 Setup Wallet >"
              className="m-10 text-white flex-auto"
            ></Caption>
            <Caption
              text="2 Add funds >"
              className="m-10 text-white flex-auto"
            ></Caption>
            <Caption
              text="3 Use of funds"
              className="m-10 text-white flex-auto"
            ></Caption>
          </React.Fragment>
        </Section>

        <Section
          containerClassName="px-8 pt-10 pb-20 mt-2 bg-purple-dark"
          className="flex flex-col bg-purple-darker"
        >
          <React.Fragment>
            <Caption
              text="Creating a new wallet"
              className="m-10 text-white flex-auto"
            ></Caption>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Add employee and date when the wallet will expire
                </label>
                <input
                  className="shadow appearance-none border rounded w-full my-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="wallet-name"
                  type="text"
                  placeholder="wallet name"
                />
                <input
                  className="shadow appearance-none border rounded w-full my-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="wallet-name"
                  type="text"
                  placeholder="employee address"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Select when the funds will return to your address
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="expiration-date"
                  type="date"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  type="button"
                >
                  Create disposable card
                </button>
              </div>
            </form>
          </React.Fragment>
        </Section>

        {/* <h1 className="title">
          <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
            Web3Auth
          </a>
          & ReactJS Example
        </h1>

        <div className="grid">{provider ? loggedInView : unloggedInView}</div>

        <footer className="footer">
          <a
            href="https://github.com/Web3Auth/Web3Auth/tree/master/examples/react-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code
          </a>
        </footer> */}
      </React.Fragment>
    </Section>
  );
}

export default Home;
