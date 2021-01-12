import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import ProfileContainer from './ProfileContainer';

const BASE_URL = "https://api.github.com/users/"; 


function App() {

  const [firstProfileError, setFirstProfileError] = useState("");
  const [firstProfileData, setFirstProfileData] = useState("");
  const [firstProfileName, setFirstProfileName] = useState("");

  const getProfileData = async (userName, setProfileData, setProfileError) => {
    
      await axios.get(BASE_URL + userName)
      .then((response) => {
      const data = response.data;
      setProfileData(data);
      console.log("Profile data: ", firstProfileData);
      setProfileError("");
       })
      .catch((error) => {
        setProfileData("");
        if(error.response){
          setProfileError(error.response.statusText);
        } else if (error.request){
          setProfileError(error.request.XMLHttpRequest.statusText)
          console.log(error);
        } else {
          setProfileError("Unknown Error");
        }
      })    
  }

  const handleSubmit = (input) => {
    setFirstProfileName(input);
    console.log("submitted");
    getProfileData(input, setFirstProfileData, setFirstProfileError);
  }
  
  return (
    <div className="app">
      <h2>Fetch GitHub Profiles</h2>
      <div className="wrapper">
        <ProfileContainer 
          profileData = {firstProfileData}
          profileName = {firstProfileName}
          setProfileName = {setFirstProfileName}
          profileError = {firstProfileError}
          handleSubmit = {handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
