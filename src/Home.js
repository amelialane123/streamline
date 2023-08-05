import './App.css';
import {useState} from 'react';

function CreateList({allShows, handleCheck}){
    const listOfShows = allShows.map((show) => IndividualShow({show, handleCheck}));

    return (listOfShows);
}

function IndividualShow({show, handleCheck}){
    return(
        <div key={show.title} className="watchList">
            <span className="checkbox">
                <label htmlFor={show.title}>
                    {show.title}
                </label>
                <input 
                    id={show.title} 
                    key={show.title}
                    type="checkbox"
                    value={show.title}
                    onChange = {(e) => handleCheck({show})}
                        />
            </span>    
        </div>
    )
}

function ShowList({allShows, handleCheck}){
    const listOfShows = CreateList({allShows, handleCheck});

    console.log('list of shows', {listOfShows});

    return(
        <div>
            {listOfShows}
        </div>
    )
}

//TODO: add in watchlists so that the options are the watchlists to add
function AddToWatchlist({checked, handleAdd}){
    if(checked.length === 0){
        return;
    }
    let options = [];
    if(checked.length >0){
    options = checked.map((show) => IntoOptionList({show}));
    }

    return(
        <select
            id="addToWatchlistButton"
            className="button"
            onChange = {() => handleAdd()}>
            <option>Add to Watchlist + </option>
            <option>{options}</option>
        </select>
    )
}

function IntoOptionList({show}){
    return(
        <option
          id={show.title} 
          value={show.title}
          key={show.title}
        >
          {show.title}
        </option>    
  )
}


function Home(){
    //state
    const [checked, setChecked] = useState([]);

    const SHOWS= [
        {title: "New Girl", platforms: ['Hulu', 'Peacock'], genre:'comedy', mostWatched: true, stats: {time: 3.4, episodesWatched: 146, started: 4/27/2004}},
        {title: "How I Met Your Mother", platforms: ['Hulu'], genre: 'comedy', mostWatched: false, stats: {time: 8, episodesWatched: 123, started: 4/20/2004}},
        {title: "Family Guy", platforms: ['Hulu', 'Prime Video', 'Apple TV'], genre: 'comedy', mostWatched: false, stats: {time: 3.4, episodesWatched: 7, started: 4/21/2004}},
        {title: "Firefly Lane", platforms: ['Netflix'], genre:'drama', mostWatched: false, stats: {time: 3.4, episodesWatched: 7, started: 4/29/2004}},
        {title: "Master Chef", platforms: ['Hulu', 'Fox'], mostWatched: false, stats: {time: 3.4, episodesWatched: 7, started: 4/27/2004}},
      ];

    //
    function handleCheck({show}){
        //check if this was checked or unchecked
        let newArray = [];
        newArray= checked.concat({show});
        //if already checked - want to remove
        if(checked.some((element)=> element.show.title === show.title)){
            console.log("true")
            newArray = newArray.filter((checkedShow) => checkedShow.show.title !== show.title);
        }
        else{
            console.log("false");
        }
        setChecked(newArray)
        console.log('checked', {checked})
    }

    //add shows to watchlist
    function handleAdd(){
       
    }


    return(
        <div>
            <h1>HOME</h1>
            <ShowList allShows = {SHOWS} handleCheck = {handleCheck} />
            <AddToWatchlist checked = {checked} handleAdd= {handleAdd}/>
        </div>
    )
}

export default Home;


/*
will show all available shows which can be added to any list the user has created
 */