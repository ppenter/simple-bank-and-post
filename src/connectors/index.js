import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnect } from "@web3-react/walletconnect";

export const injected = new InjectedConnector({
  supportedChainIds: [97],
});
