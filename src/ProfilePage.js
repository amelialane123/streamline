import { useState } from 'react';
import './App.css';

function MostWatchedPlatform({platforms}){
  let most = {name:'N/A'};
  for(let i=0; i<platforms.length; i++){
    if(platforms[i].mostWatched){
      most = platforms[i];
      break;
    }
  }
  
  return(
    <tr>
      <th>Most Watched Platform</th>
      <td>{most.name}</td>
    </tr>
  )
}

function MostWatchedShow({shows}){
  let most = {name:'N/A'};
  for(let i=0; i<shows.length; i++){
    if(shows[i].mostWatched){
      most = shows[i];
      break;
    }
  }
  
  return(
    <tr>
      <th>Most Watched Show</th>
      <td>{most.title}</td>
    </tr>
  )
}

function Statistics({shows, platforms}){

  return(
    <table>
      <thead>
        <tr>
          <th colSpan="2">STATISTICS</th>
        </tr>
      </thead>
      <tbody>
        <MostWatchedShow shows ={shows} />
        <MostWatchedPlatform platforms={platforms} />
      </tbody>
    </table>
  );
}

/*
go through all of t
 */

//creates button to allow for adding new platforms 
function AddPlatform({availablePlatforms, handleAdd}){  
  let options = [];
  if(availablePlatforms.length >0){
    options = availablePlatforms.map((platform) => IntoOptionList({platform}));
  }
  console.log({options});
  return(
    <select 
      className="button"
      onChange = {handleAdd}
    >
        <option 
        id="add-selector"
        > ADD +</option>
        {options}
    </select>
  )
}

function IntoOptionList({platform}){
  return(
        <option
          id={platform.name} 
          value={platform.name}
          key={platform.name}
        >
          {platform.name}
        </option>    
  )
}



//shows list of platforms the user has 
function UserPlatformList({usersPlatforms, onChecked}){
if(usersPlatforms.length === 0){
  return;
}

  const platformNames = usersPlatforms.map((platform) => IntoCheckList({platform, onChecked}));


  return(
    <div className="section">
      <h1 className="section-header">PLATFORMS</h1>
      <div>{platformNames}</div>
    </div>
  );
}

function IntoCheckList({platform, onChecked}){

  return(
    <div key={platform.name} >
        <span className = "checkbx">
            <label htmlFor={platform.name}>{platform.name}</label>
            <input 
                id={platform.name} 
                type="checkbox"
                value={platform.name}
                onChange={(e) => onChecked({platform})}
                    />
        </span>    
    </div>
)
}

function RemoveSelected({checked, handleRemove}){
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



function ProfilePage() {
    //state
    const [usersPlatforms, setusersPlatforms] = useState([
        {name:'Netflix', mostWatched: true},
    ]);
    const [availablePlatforms,setavailablePlatforms] = useState([
      {name:'Hulu', mostWatched: false},
      {name:'Prime Video', mostWatched: false},
      {name:'HBO Max', mostWatched: false},
      {name:'Peacock', mostWatched: false}
    ]);
    const [checked,setChecked] = useState([]);


    //event handlers

    //when a platform is clicked to be added
    //when click it should be added to usersPlatforms and removed from availablePlatforms 
    function handleAdd(e){

      const index = e.target.selectedIndex;
      const el = e.target.childNodes[index]
      const platformName =  el.getAttribute('id'); 
      
      let platformToAdd = availablePlatforms.find((element) => element.name=== platformName);

      let updatedUsersPlatforms = usersPlatforms.concat(platformToAdd);
      let updatedAvailablePlatforms = availablePlatforms.filter((element) => element.name !== platformToAdd.name);

      setusersPlatforms(updatedUsersPlatforms);
      setavailablePlatforms(updatedAvailablePlatforms);
    }

    //when platform list item is checked 
    function handleCheck({platform}){
      //check if this was checked or unchecked
      let newArray = [];
      newArray= checked.concat({platform});

      if(checked.some((element)=> element.platform.name === platform.name)){
        newArray = newArray.filter((checkedList) => checkedList.platform.name !== platform.name);
    }
      setChecked(newArray)
      console.log(checked);
    };

    //when remove button is clicked
    function handleRemove(){
      let unchecked = usersPlatforms.filter((element) =>
          //make sure the element is not in the checked array 
          checked.findIndex((checkedPlatform)=> checkedPlatform.platform.name === element.name) === -1
      )
      //is there a way to add this without mapping?
      let updatedAvailable = availablePlatforms.concat(checked.map((element) => element.platform));
      setavailablePlatforms(updatedAvailable);
      setusersPlatforms(unchecked);
      setChecked([]);
  }
    



  const PLATFORMS=[
    {name:'Netflix', mostWatched: true},
    {name:'Hulu', mostWatched: false},
    {name:'Prime Video', mostWatched: false},
    {name:'HBO Max', mostWatched: false},
    {name:'Peacock', mostWatched: false}
  ];

  const SHOWS= [
    {title: "New Girl", platforms: ['Hulu', 'Peacock'], genre:'comedy', mostWatched: true, stats: {time: 3.4, episodesWatched: 146, started: 4/27/2004}},
    {title: "How I Met Your Mother", platforms: ['Hulu'], genre: 'comedy', mostWatched: false, stats: {time: 8, episodesWatched: 123, started: 4/20/2004}},
    {title: "Family Guy", platforms: ['Hulu', 'Prime Video', 'Apple TV'], genre: 'comedy', mostWatched: false, stats: {time: 3.4, episodesWatched: 7, started: 4/21/2004}},
    {title: "Firefly Lane", platforms: ['Netflix'], genre:'drama', mostWatched: false, stats: {time: 3.4, episodesWatched: 7, started: 4/29/2004}},
    {title: "Master Chef", platforms: ['Hulu', 'Fox'], mostWatched: false, stats: {time: 3.4, episodesWatched: 7, started: 4/27/2004}},
  ];

  return (
    <div>
      <UserPlatformList 
        usersPlatforms ={usersPlatforms} 
        onChecked = {handleCheck} 
      />
      <AddPlatform 
        availablePlatforms={availablePlatforms}
        handleAdd = {handleAdd}
      />
      <RemoveSelected 
        checked = {checked}
        handleRemove = {handleRemove}
      />
      <Statistics shows ={SHOWS} platforms= {PLATFORMS} />
    </div>
    

  );
}

export default ProfilePage;


/*
- The add button should have a drop down of all possible platforms not in use 
- when you add it to the platforms list -> should be removed from the add list and added to platform 
- there should be removePlatform that will remove any selected platform and add it back to the add list 



state
- usersPlatforms : what the user has
- availablePlatforms : other platforms that the user does not have 
*/