import {
  Button,
  Container,
  Grid,
  Input,
  ListItem,
  Table,
  Typography,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import BankContract from "../contracts/Bank.json";
import Web3 from "web3";

const tweb3 = new Web3();

export const Bank = () => {
  const wallet = useWeb3React();
  const [loading, setLoading] = useState(0);
  const [bank, setBank] = useState({});
  const [depositeValue, setDepositeValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  useEffect(() => {
    async function fetchData() {
      if (wallet.connector && !wallet.error) {
        setLoading(1);
        const web3 = wallet.library;
        let contract = new web3.eth.Contract(
          BankContract.abi,
          BankContract.networks[wallet.chainId].address
        );
        let bankBalance = await contract.methods.bankBalance().call();
        let balance = await contract.methods.balance(wallet.account).call();
        setBank({
          value: {
            balance,
            bankBalance,
          },
        });
      }
      setLoading(0);
    }
    fetchData();
  }, [wallet]);

  const deposite = async () => {
    if (wallet.connector) {
      setLoading(1);
      const web3 = wallet.library;
      let contract = new web3.eth.Contract(
        BankContract.abi,
        BankContract.networks[wallet.chainId].address
      );
      try {
        await contract.methods
          .deposite()
          .send({
            from: wallet.account,
            value: web3.utils.toWei(depositeValue),
          })
          .on("reciept", function () {
            setLoading(0);
          });
      } catch (e) {
        console.log(e);
        setLoading(0);
      }
    }
  };

  const withdraw = async () => {
    if (wallet.connector) {
      setLoading(1);
      const web3 = wallet.library;
      let contract = new web3.eth.Contract(
        BankContract.abi,
        BankContract.networks[wallet.chainId].address
      );
      try {
        await contract.methods
          .withdraw(bank.value.balance)
          .send({
            from: wallet.account,
          })
          .on("reciept", function () {
            setLoading(0);
          });
      } catch (e) {
        console.log(e);
        setLoading(0);
      }
    }
  };

  if (!bank.value) {
    return null;
  }
  return (
    <Container style={{ padding: 20, textAlign: "center" }}>
      <Typography fontSize={25}>Bank</Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <ListItem>Your bank balance: </ListItem>
        </Grid>
        <Grid item xs={3}>
          {tweb3.utils.fromWei(bank.value.balance)} ETH
          <Button
            disabled={loading}
            sx={{ marginLeft: 7 }}
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              withdraw();
            }}
          >
            Withdraw
          </Button>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <ListItem>bank balance: </ListItem>
        </Grid>
        <Grid item xs={3}>
          <ListItem>{tweb3.utils.fromWei(bank.value.bankBalance)} ETH</ListItem>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Input
            type="number"
            onChange={(e) => {
              setDepositeValue(e.target.value);
            }}
          ></Input>{" "}
          ETH
        </Grid>
        <Grid item xs={3}>
          <Button
            disabled={loading}
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              deposite();
            }}
          >
            Deposite
          </Button>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Container>
  );
};
