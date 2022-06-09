import logo from "./logo.svg";
import "./App.css";
import AppWithOutProviders from "./AppWithOutProviders";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightBlue, red } from "@mui/material/colors";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}

const customTheme = {
  primary: "#0052cc",
};

function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: customTheme.primary,
      },
      secondary: {
        main: "#edf2ff",
      },
      action: {
        active: red[200],
        activeOpacity: 0,
        hover: red[100],
        hoverOpacity: 0.7,
        focus: red[600],
        focusOpacity: 0,
        selected: red[300],
        selectedOpacity: 0,
      },
    },
  });

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          <AppWithOutProviders />
        </ThemeProvider>
      </Web3ReactProvider>
    </>
  );
}

export default App;
