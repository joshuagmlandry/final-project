import Browse from "./Browse";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import NavBar from "./NavBar";
import Province from "./Province";
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
          <Route path="province/:abbr" element={<Province />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />        
      </BrowserRouter>
    </>
  );
};

export default App;