import './App.css';
import {useState, useEffect} from 'react';

function Shows({list}){
    const showsInList = list.list.shows;
    const listOfShows = showsInList.map((show) => <li>{show.title}</li>)

    return(
        <ul>{listOfShows}</ul>
    )
}

function WatchList({list}){
    if(!list){
        return;
    }
    console.log("hello");
    console.log({list});
    return(
        <div>
            <hr />
            <h2 className="listTitle"> LIST: {list.list.listName}</h2>
            <Shows list = {list}/>
        </div>
        

    )
}
export default WatchList;