import Navbar from "./Navbar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound.js";
import NodeFrame from "./NodeFrame.js";
import Search from "./Search.js";
import NewsNodeFrame from "./NewsNodeFrame.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/" element={<NodeFrame />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
