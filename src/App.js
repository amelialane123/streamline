import './App.css';
import {useState, useEffect} from 'react';
import ProfilePage from './ProfilePage.js';
import Home from './Home.js';
import MyLists from './MyLists.js';
import WatchList from './WatchList.js';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from 'react-router-dom'



function App() {

  const getInitialLists = () => {
    const initialLists = localStorage.getItem('MY_LISTS');
    return (initialLists!==null ? JSON.parse(initialLists) : [{listName:'Watched', shows:[]}])
  }

  //state
  const [lists, setLists] = useState(getInitialLists);

  //effect
  useEffect(()=>{
    localStorage.setItem('MY_LISTS', JSON.stringify(lists));
  }, [lists])

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
              <Route exact path='/' 
                element= {
                  <Home
                    lists={lists}
                    setLists={setLists}
                  />
                }   
              />
              <Route exact path='/mylists/*' 
                element= {
                <MyLists 
                  lists={lists}
                  setLists={setLists}
                />} />
              <Route exact path="/profilepage" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
