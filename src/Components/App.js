import Navbar from './Navbar.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotFound from './NotFound.js';
import News from './News.js';
import NodeGraph from './NodeGraph.js';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className='content'>
          <Routes>
            <Route path='*' element={<NotFound/>}></Route>
            <Route exact path='/' element={<NodeGraph/>}></Route>
            <Route path='/news' element={<News/>}></Route>
          </Routes>
        </div>
    </div>
    </Router>
  );
}

export default App;
