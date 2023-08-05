import './App.css';
import {useState, useEffect} from 'react';

function WatchList({list}){
    if(!list){
        return;
    }
    console.log("hello");
    console.log({list});
    return(
        <div>
            <hr />
            <h1> LIST: {list.list.listName}</h1>
        </div>
        

    )
}
export default WatchList;