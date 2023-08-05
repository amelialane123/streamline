import './App.css';
import {useState, useEffect} from 'react';

function WatchList({list}){
    if(!list){
        return;
    }
    console.log("hello");
    console.log({list});
    return(
        <h1>{list.list.listName}</h1>

    )
}
export default WatchList;