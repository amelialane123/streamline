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
function AddToWatchlist({checked, handleAdd, lists}){
    if(checked.length === 0 || lists.length === 0){
        return;
    }
   
    let options = lists.map((list) => IntoOptionList({list}));
    
    return(
        <select
            id="addToWatchlistButton"
            className="button"
            onChange = {(e) => handleAdd(e)}>
            <option>Add to Watchlist + </option>
            {options}
        </select>
    )
}

function IntoOptionList({list}){
    return(
        <option
          id={list.listName} 
          value={list.listName}
          key={list.listName}
        >
          {list.listName}
        </option>    
  )
}

//checks if a show already exists in a list
function ShowInList({list, show}){
    const existingShowIndex = list.shows.findIndex((el) => el.title === show.title);
    if(existingShowIndex !== -1){
        console.log("You already have this show");
        return;
    }
    else{
       return(<AddIndividualShow list={list} show={show} />)
    }
}

function AddIndividualShow({list,show}){
    const listShows = [{...list.shows}.concat({show})];
    return listShows;
}


function Home({lists, setLists}){
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
        newArray= checked.concat(show);
        //if already checked - want to remove
        if(checked.some((element)=> element.title === show.title)){
            console.log("true")
            newArray = newArray.filter((checkedShow) => checkedShow.title !== show.title);
        }
        setChecked(newArray)
        console.log('checked', {checked})
    }

    //add shows to watchlist
    /*
    Must add all of the checked shows to the shows array of the selected watchlist
    */
    function handleAdd(e){
        let index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const watchlistName =  el.getAttribute('id'); 

        //if the shows array is empty just add the checked array
        let watchListToUpdate = lists.find((watchlist) => watchlist.listName === watchlistName);
        index = lists.findIndex((watchlist) => watchlist.listName === watchlistName);
        if(!watchListToUpdate.shows){
            watchListToUpdate.shows = [...checked];
        }
        //otherwise check if each show is already in the list 
        else{

            // // watchListToUpdate.shows = checked.map((show) => <ShowInList list={watchListToUpdate} show={show} />);

            // console.log('watchListToUpdateShows',checked.map((show) => <ShowInList list={watchListToUpdate} show={show} />) )

            // console.log('updated', [{...watchListToUpdate.shows}, ...checked.map((show) => <ShowInList list={watchListToUpdate} show={show} />)] )
           
            watchListToUpdate.shows = [...watchListToUpdate.shows, ...checked];
        }
        console.log('watchListToUpdateShows', watchListToUpdate)
        setLists(lists.slice(0,index).concat(watchListToUpdate).concat(lists.slice(index + 1)));
    }




    return(
        <div>
            <h1>HOME</h1>
            <ShowList allShows = {SHOWS} handleCheck = {handleCheck} />
            <AddToWatchlist checked = {checked} handleAdd= {handleAdd} lists={lists} setLists={setLists} />
        </div>
    )
}

export default Home;


/*
will show all available shows which can be added to any list the user has created
 */