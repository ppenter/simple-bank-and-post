import { Routes, Route, Router } from "react-router-dom";
import ResponsiveAppBar from "./components/NavBar";
import { Home } from "./pages/home";
import { createMemoryHistory } from "history";
import { Feed } from "./pages/post";
import { Bank } from "./pages/bank";

export default function AppWithOutProviders() {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route exact path="/dashboard" element={<Home />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/feed" element={<Feed />}></Route>
        <Route exact path="/bank" element={<Bank />}></Route>
      </Routes>
    </div>
  );
}
