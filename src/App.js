
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Navbar from './components/navbar/Navbar.js'
import Home from './components/home/Home.js'
import User from './components/user/User.js'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route path="/users/:userId" element={<User/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
