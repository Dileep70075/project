import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ='/' element = {<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
