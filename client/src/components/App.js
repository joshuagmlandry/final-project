import Browse from "./Browse";
import Campsite from "./Campsite";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import NavBar from "./NavBar";
import Profile from "./Profile";
import ProfileError from "./ProfileError";
import Province from "./Province";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {

  const {isAuthenticated} = useAuth0();

  return (
    <>
      <BrowserRouter>
      <GlobalStyles />
      <NavBar />
        <Routes>
          <Route exact path ="/" element={<Homepage />}/>
          <Route path="/browse" element={<Browse />} />
          <Route path="/province/:abbr" element={<Province />} />
          <Route path="/campsite/:id" element={<Campsite />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <ProfileError />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />        
      </BrowserRouter>
    </>
  );
};

export default App;