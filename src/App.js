import { useState } from 'react';
import './App.css';
import ProfilePage from './ProfilePage.js';
import Home from './Home.js';
import MyLists from './MyLists.js';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <h1>STREAMLINE</h1>
        </div>
        <hr />
        <div>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/mylists'>My Lists</Link></li>
              <li><Link to='/profilepage'>Profile</Link></li>
            </ul>
          </nav>
          <hr />
          <Routes>
            <Route exact path='/' element= {<Home />} />
            <Route exact path='/mylists' element= {<MyLists />} />
            <Route exact path="/profilepage" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
