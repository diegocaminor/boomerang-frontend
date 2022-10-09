import React from "react";
// import Button from "./Button";
// import { useLocation, useNavigate } from "react-router-dom";
import magnifyingGlass from "../assets/magnifyingGlass.svg";
import Button from "./Button";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../containers/Home/web3RPC";
// import "../../../App.css";

const clientId =
  "YBAjF1ZzEDwGcJSn5QZ4qqSVL2e5KrynvstWUYFLA3eQ7lcydgU4GDqgZ2aqT2LagW4KMTvxgaVV19C6Xj52DDZc"; // get from https://dashboard.web3auth.io

interface INavbar {
  children: JSX.Element;
}

const Navbar = ({ children }: INavbar) => {
  //   const location = useLocation();
  //   const navigate = useNavigate();

  //   if (!location.pathname.includes("home")) {
  //     return (
  //       <React.Fragment>
  //         <div className="bg-black h-8 grid gap-4 grid-cols-2 p-7 w-full md:w-4/5 md:mx-auto">
  //           <img src={stitchLogo} className="py-2" alt="logo" />
  //           <Button
  //             text="Explore app"
  //             containerClassName="ml-auto"
  //             className="w-full text-white rounded-full button bg-gradient-radial from-green via-purple to-purple text-sm"
  //             onClick={() => navigate("/home")}
  //           ></Button>
  //         </div>
  //         {children}
  //       </React.Fragment>
  //     );
  //   } else {
  return <React.Fragment>{children}</React.Fragment>;
  //   }
};
export default Navbar;
