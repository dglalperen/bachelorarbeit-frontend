import Navbar from "./Navbar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound.js";
import NewsNodeFrame from "./NewsNodeFrame.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/" element={<NewsNodeFrame />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
