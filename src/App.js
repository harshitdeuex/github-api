import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import ProfileContainer from './ProfileContainer';

const BASE_URL = "https://api.github.com/users/"; 


function App() {

  const [firstProfileError, setFirstProfileError] = useState("");
  const [firstProfileData, setFirstProfileData] = useState("");
  const [firstProfileName, setFirstProfileName] = useState("");

  const [secondProfileError, setSecondProfileError] = useState("");
  const [secondProfileData, setSecondProfileData] = useState("");
  const [secondProfileName, setSecondProfileName] = useState("");

  const emptyInputFields = () => {
    setFirstProfileName("");
    setSecondProfileName("");
  }

  const getProfileData = async (userName, setProfileData, setProfileError) => {
    
      await axios.get(BASE_URL + userName)
      .then((response) => {
      const data = response.data;
      setProfileData(data);
      console.log("Profile data: ", firstProfileData);
      emptyInputFields();
      setProfileError("");
       })
      .catch((error) => {
        setProfileData("");
        if(error.response){
          setProfileError(error.response.statusText);
        } else if (error.request){
          setProfileError(error.request.XMLHttpRequest.statusText)
        } else {
          setProfileError("Unknown Error");
        }
      })    
  }

  const handleSubmit = () => {
    const inputFirst = firstProfileName.trim().toLowerCase();
    setFirstProfileName(inputFirst);
    const inputSecond = secondProfileName.trim().toLowerCase();
    setSecondProfileName(inputSecond);

    if(inputFirst.includes(" ") || inputSecond.includes(" ")){
      alert("Username should not contain space")
    } else if (!inputFirst || !inputSecond){
      alert("Please Enter All fields");
    } else {
      getProfileData(inputFirst, setFirstProfileData, setFirstProfileError);
      getProfileData(inputSecond, setSecondProfileData, setSecondProfileError);
    }
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
        />
       
        <button onClick={handleSubmit}>Get Profile Details</button>

        <ProfileContainer 
          profileData = {secondProfileData}
          profileName = {secondProfileName}
          setProfileName = {setSecondProfileName}
          profileError = {secondProfileError}
        />

      </div>
    </div>
  );
}

export default App;
