import './App.css';
import {useState, useEffect} from 'react';

//TODO: create list component that creates the listOfLists
//watchlist DONE (i think)
//watchlists - map the lists to watchlist component DONE
//watchlistEditView

//maps the watchlist to the watchlists component 
function Watchlist({list, onChecked}){
    return(
        <div key={list.listName} className="watchList">
            <span className="checkbox">
                <label htmlFor={list.listName}>{list.listName}</label>
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
function Watchlists({lists, onChecked}){
    const listOfLists = lists.map((list) => Watchlist({list, onChecked}));

    return (listOfLists);

}


function WatchlistEditView({lists, nameInput, handleClick, onNameInput, onChecked}){
    //component for mapping 
    const listOfLists = lists.length > 0 ? Watchlists({ lists, onChecked }) : null;

    return(
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


function MyLists(){

    const getInitialLists = () => {
        const initialLists = localStorage.getItem('MY_LISTS');
        return (initialLists!==null ? JSON.parse(initialLists) : [{listName:'Watched'}])
    }
   
    //state
    const [lists, setLists] = useState(getInitialLists);
    const [nameInput, setNameInput] = useState('Hello');
    const [checked, setChecked] = useState([]);

    //effect
    useEffect(()=>{
        localStorage.setItem('MY_LISTS', JSON.stringify(lists));
    }, [lists])

    //event handlers

    function handleClick(){
        //if already has the list 
        const existingListIndex = lists.findIndex((list) => list.listName === nameInput);
        if(existingListIndex !== -1){
            console.log("You already have this list");
            setNameInput("")
            return;
        }
        else{
            const updatedLists = lists.concat({listName:nameInput});
            setLists(updatedLists);
            setNameInput("");
        }
    }
    
    

    //event handlers

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
            />
            <RemoveWatchlists 
                checked={checked} 
                handleRemove = {handleRemove}
            />
            
        </div>
      )
    

}
export default MyLists;