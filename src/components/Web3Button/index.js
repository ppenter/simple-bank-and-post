import { Box, Button, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { parseError } from "../../constants/error";

const LoginButton = () => {
  const {
    active,
    account,
    library,
    connector,
    chain,
    activate,
    deactivate,
    error,
  } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <Button color="secondary" onClick={connect} variant="contained">
      {error ? parseError[error.name] : "Login"}
    </Button>
  );
};

const StatusButton = () => {
  return <Button color="secondary" variant="contained"></Button>;
};

export const Web3Button = ({ children, to }) => {
  const wallet = useWeb3React();
  return (
    <>
      <Box>{wallet.account ? wallet.account : <LoginButton />}</Box>
    </>
  );
};
