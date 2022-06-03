import Browse from "./Browse";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import NavBar from "./NavBar";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <GlobalStyles />
      <NavBar />
        <Routes>
          <Route exact path ="/" element={<Homepage />}/>
          <Route path="/browse" element={<Browse />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
