import './App.css';
import WatchList from './WatchList.js';
import {useState, useEffect} from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    Link,
  } from 'react-router-dom'

//TODO: create list component that creates the listOfLists
//watchlist DONE (i think)
//watchlists - map the lists to watchlist component DONE
//watchlistEditView

//maps the watchlist to the watchlists component 
function Watchlist({list, onChecked, onWatchlist}){
    return(
        <div key={list.listName} className="watchList">
            <span className="checkbox">
                <label htmlFor={list.listName} onClick ={() => onWatchlist({list})}><Link to='mylists/watchList'>{list.listName}</Link></label>
                <input 
                    id={list.listName} 
                    key={list.listName}
                    type="checkbox"
                    value={list.listName}
                    onChange={(e) => onChecked({list})}
                        />
            </span>    
        </div>
    )
}

//creates a list of all watchlists 
function Watchlists({lists, onChecked, onWatchlist}){
    const listOfLists = lists.map((list) => Watchlist({list, onChecked, onWatchlist}));

    return (listOfLists);

}


function WatchlistEditView({lists, nameInput, handleClick, onNameInput, onChecked, onWatchlist}){
    //component for mapping 
    const listOfLists = lists.length > 0 ? Watchlists({ lists, onChecked, onWatchlist }) : null;

    return(
        <div>
            <div className="center">
                <div>{listOfLists}</div>
                <input
                    id="addList" 
                    key="newList"
                    className="center" 
                    type="text" 
                    placeholder="new list title..."
                    value = {nameInput}
                    onChange={(e) => onNameInput(e.target.value)}
                />
                <label htmlFor="addList">
                    <button id="addList" onClick= {() => handleClick()}>
                        Add List +
                    </button>
                </label>
            </div>
        </div>
    )

}

//allow for deleting watchlists 
function RemoveWatchlists({checked, handleRemove}){
    if(checked.length === 0){
        return;
    }

    return(
        <button
            id="remove-button"
            className="button"
            onClick = {() => handleRemove()}>
            Remove Selected
        </button>
    )
}


function MyLists({lists, setLists}){

    // const getInitialLists = () => {
    //     const initialLists = localStorage.getItem('MY_LISTS');
    //     return (initialLists!==null ? JSON.parse(initialLists) : [{listName:'Watched'}])
    // }
   
    //state
    //const [lists, setLists] = useState(getInitialLists);
    const [nameInput, setNameInput] = useState('Hello');
    const [checked, setChecked] = useState([]);
    const [currentList, setCurrentList] = useState();

    //effect
    // useEffect(()=>{
    //     localStorage.setItem('MY_LISTS', JSON.stringify(lists));
    // }, [lists])

    //event handlers
    function handleClick(){
        //if already has the list 
        const existingListIndex = lists.findIndex((list) => list.listName === nameInput);
        if(existingListIndex !== -1){
            console.log("You already have this list");
            setNameInput("")
            return;
        }
        else if(!nameInput.replace(/\s/g, '').length){
            console.log("Cannot be only white space!")
            setNameInput("");
            return;
        }
        else{
            const updatedLists = lists.concat({listName:nameInput, shows:[]});
            setLists(updatedLists);
            setNameInput("");
        }
    }

    function handleCheck({list}){
        //check if this was checked or unchecked
        let newArray = [];
        newArray= checked.concat({list});
        //if already checked - want to remove
        if(checked.some((element)=> element.list.listName === list.listName)){
            console.log("true")
            newArray = newArray.filter((checkedList) => checkedList.list.listName !== list.listName);
        }
        else{
            console.log("false");
        }
        setChecked(newArray)
        console.log({checked})
    };

    //go through and map - if they are checked remove from lists 
    //then clear checked
    function handleRemove(){
        let unchecked = lists.filter((element) =>
            //make sure the element is not in the checked array 
            checked.findIndex((checkedList)=> checkedList.list.listName === element.listName) === -1
        )

        setLists(unchecked);
        setChecked([]);
    }


      return(
        <div>
            <WatchlistEditView 
                lists = {lists} 
                nameInput={nameInput} 
                handleClick={handleClick}
                onNameInput = {setNameInput}
                onChecked={handleCheck}
                onWatchlist = {setCurrentList}
            />
            <RemoveWatchlists 
                checked={checked} 
                handleRemove = {handleRemove}
            />
            <Routes>
                <Route path = 'mylists/watchList' element= {<WatchList list={currentList}/>} />
            </Routes>
            
        </div>
      )
    

}
export default MyLists;