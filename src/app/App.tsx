import "../App.css";
import Home from "./containers/Home";
import LandingPage from "./containers/LandingPage";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./containers/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<LandingPage />} />
        <Route path="/test" element={<LandingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
