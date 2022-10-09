import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
import "../../../App.css";
import Section from "../../components/Section";
import React from "react";
import Caption from "../../components/Caption";
import Button from "../../components/Button";

const clientId =
  "YBAjF1ZzEDwGcJSn5QZ4qqSVL2e5KrynvstWUYFLA3eQ7lcydgU4GDqgZ2aqT2LagW4KMTvxgaVV19C6Xj52DDZc"; // get from https://dashboard.web3auth.io

function Home() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [account, setAccount] = useState<string>("");

  const [state, setState] = React.useState({
    walletName: "",
    employeeAdress: "",
    expireDate: new Date(),
  });

  function handleInputChange(event: any) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });

    console.log("MI ESTADO");
    console.log(state);
  }

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
          setTimeout(() => {
            getAccounts();
          }, 2000);
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
    window.location.reload();
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

  const accountEllipsis =
    account.length > 2
      ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}`
      : "Connect Wallet";

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAccount(address);
    return address;
  };

  const getBalance = async () => {
    console.log("get balance");
    console.log(provider);
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
    <React.Fragment>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* <!--
            Icon when menu is closed.

            Heroicon name: outline/bars-3

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
            Icon when menu is open.

            Heroicon name: outline/x-mark

            Menu open: "block", Menu closed: "hidden"
          --> */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-white hover:bg-gray-700 hover:text-gray-600" --> */}
                  <a
                    href="#"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </a>

                  <a
                    href="#"
                    className="text-white hover:bg-gray-700 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Analysis
                  </a>

                  <a
                    href="#"
                    className="text-white hover:bg-gray-700 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Wallet
                  </a>

                  <a
                    href="#"
                    className="text-white hover:bg-gray-700 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Policy
                  </a>

                  <a
                    href="#"
                    className="text-white hover:bg-gray-700 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Reports
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <!-- Profile dropdown --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="grid">
                      <Button
                        text={accountEllipsis}
                        containerClassName="mx-auto mt-5"
                        className="w-full text-white rounded-full button bg-black text-sm"
                        onClick={provider ? getAccounts : login}
                      ></Button>
                    </div>
                  </button>
                </div>
                {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
                <div
                  className="group absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  //   tabindex="-1"
                >
                  {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hidden group-hover:block"
                    role="menuitem"
                    // tabindex="-1"
                    id="user-menu-item-2"
                    onClick={logout}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-white hover:bg-gray-700 hover:text-gray-600" --> */}
            <a
              href="#"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-white hover:bg-gray-700 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Analysis
            </a>

            <a
              href="#"
              className="text-white hover:bg-gray-700 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Wallet
            </a>

            <a
              href="#"
              className="text-white hover:bg-gray-700 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Policy
            </a>

            <a
              href="#"
              className="text-white hover:bg-gray-700 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Reports
            </a>
          </div>
        </div>
      </nav>

      {/* <div className="grid">{provider ? loggedInView : unloggedInView}</div> */}
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
                    onChange={handleInputChange}
                  />
                  <input
                    className="shadow appearance-none border rounded w-full my-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="wallet-name"
                    type="text"
                    placeholder="employee address"
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
        </React.Fragment>
      </Section>
    </React.Fragment>
  );
}

export default Home;
