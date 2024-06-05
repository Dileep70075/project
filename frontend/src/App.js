
import './App.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Admin from './components/Admin';
import AddStudentForm from './components/AddStudentForm';
import RecycleBin from './components/RecycleBin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ='/' element = {<Signup/>}/>
          <Route path ='/login' element = {<Login/>}/>
          <Route path ='/admin' element = {<Admin/>}/>
          <Route path="/recycleBin" element={<RecycleBin/>}></Route>
          <Route path="/addStudentForm" element={<AddStudentForm/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
