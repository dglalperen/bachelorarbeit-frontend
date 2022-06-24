import Header from "./Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound.js";
import Main from "./Main.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/" element={<Main />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
