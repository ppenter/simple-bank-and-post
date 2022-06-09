import {
  Button,
  Container,
  Grid,
  Input,
  ListItem,
  Table,
  TextField,
  Typography,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import FeedContract from "../contracts/Feed.json";
import Web3 from "web3";
import moment from "moment";
import { grey } from "@mui/material/colors";

const tweb3 = new Web3();

export const Feed = () => {
  const wallet = useWeb3React();
  const [loading, setLoading] = useState(0);
  const [allPost, setAllPost] = useState(null);
  const [content, setContent] = useState("");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function fetchData() {
      if (wallet.connector && !wallet.error) {
        setLoading(1);
        const web3 = wallet.library;
        let contract = new web3.eth.Contract(
          FeedContract.abi,
          FeedContract.networks[wallet.chainId].address
        );
        let allPost = await contract.methods.allPost().call();
        let balance = await contract.methods.balance(wallet.account).call();

        setAllPost(allPost);
        setBalance(balance);
        setLoading(0);
      }
    }
    fetchData();
  }, [wallet]);

  const post = async () => {
    if (wallet.connector) {
      setLoading(1);
      const web3 = wallet.library;
      let contract = new web3.eth.Contract(
        FeedContract.abi,
        FeedContract.networks[wallet.chainId].address
      );
      try {
        await contract.methods
          .post(content)
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

  const donate = async (id, amount) => {
    if (wallet.connector) {
      setLoading(1);
      const web3 = wallet.library;
      let contract = new web3.eth.Contract(
        FeedContract.abi,
        FeedContract.networks[wallet.chainId].address
      );
      try {
        await contract.methods
          .donate(id)
          .send({
            from: wallet.account,
            value: tweb3.utils.toWei(amount),
          })
          .on("reciept", function () {
            setLoading(0);
          });
      } catch (e) {
        setLoading(0);
      }
    }
  };

  const withdraw = async () => {
    if (wallet.connector) {
      setLoading(1);
      const web3 = wallet.library;
      let contract = new web3.eth.Contract(
        FeedContract.abi,
        FeedContract.networks[wallet.chainId].address
      );
      try {
        await contract.methods
          .withdraw(balance)
          .send({
            from: wallet.account,
          })
          .on("reciept", function () {
            setLoading(0);
          });
      } catch (e) {
        setLoading(0);
      }
    }
  };

  if (!wallet.account || !allPost) {
    return null;
  }
  return (
    <Container style={{ padding: 20, textAlign: "center" }}>
      <Typography fontSize={25}>
        Feed {"(Your reward: " + tweb3.utils.fromWei(balance) + " ETH )"}
        <Button
          variant="outlined"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            withdraw();
          }}
        >
          Withdraw
        </Button>
      </Typography>
      <Grid xs={12} height={15} />
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <TextField
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          ></TextField>
        </Grid>
        <Grid item xs={3} sx={{ marginBottom: 5 }}>
          <Button
            disabled={loading}
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              post();
            }}
          >
            Post
          </Button>
        </Grid>
        <Grid item xs={3}></Grid>
        {allPost.map((post) => {
          return (
            <Grid container>
              <Grid xs={2}>
                <Button
                  variant="outlined"
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    donate(post.id, prompt("Donate amount: "));
                  }}
                >
                  Donate
                </Button>
              </Grid>
              <Grid xs={2} sx={{ width: "10%", overflow: "hidden" }}>
                {post.creator}
              </Grid>
              <Grid xs={4}>{post.content}</Grid>
              <Grid xs={4}>
                <Typography fontSize={12} color={grey[500]}>
                  {moment(Date(post.timestamp)).format("DD.mm.yyyy hh:MM:ss")}
                </Typography>
              </Grid>
              <Grid xs={12} sx={{ height: 15 }} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
