import Browse from "./Browse";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <GlobalStyles />
        <Routes>
          <Route exact path ="/" element={<Homepage />}/>
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
