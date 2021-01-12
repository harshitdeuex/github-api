import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

const maleDummyImage = "https://st2.depositphotos.com/1502311/12020/v/600/depositphotos_120206862-stock-illustration-profile-picture-vector.jpg";
const femaleDummyImage = "https://st2.depositphotos.com/4111759/12123/v/600/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg";
const BASE_URL = "https://api.github.com/users/"; 
const DEFAULT_ERROR_MESSAGE = "NOT FOUND";

function App() {

  const [firstProfileError, setFirstProfileError] = useState("");
  const [firstProfileData, setFirstProfileData] = useState(null);
  const [firstProfileImage, setFirstProfileImage] = useState(maleDummyImage);
  const [firstProfileName, setFirstProfileName] = useState("");

  const [secondProfileError, setSecondProfileError] = useState("");
  const [secondProfileData, setSecondProfileData] = useState(null);
  const [secondProfileImage, setSecondProfileImage] = useState(femaleDummyImage)
  const [secondProfileName, setSecondProfileName] = useState("");

  /* const resetProfiles = () => {
    setFirstProfileError("");
    setFirstProfileData(null);
    setFirstProfileImage(maleDummyImage);
    setSecondProfileError("");
    setSecondProfileData(null);
    setSecondProfileImage(femaleDummyImage);
  } */

  const emptyInputFields = () => {
    setFirstProfileName("");
    setSecondProfileName("");
  }

  const handleFirstProfileError = (error) => {
    if(error.response){
      setFirstProfileError(error.response.statusText);
      console.log("Response Error 1: ",error.response);
    } else if (error.request){
      setFirstProfileError(error.request.XMLHttpRequest.statusText)
      console.log("Request error 1: ",error.request);
    } else {
      setFirstProfileError("Unknown Error");
      console.log("Unknown error 1: ",error);
    }
  }

  const handleSecondProfileError = (error) => {
    if(error.response){
      setSecondProfileError(error.response.statusText);
      console.log("Response Error 2: ",error.response);
    } else if (error.request){
      setSecondProfileError(error.request.XMLHttpRequest.statusText)
      console.log("Request error 2: ",error.request);
    } else {
      setSecondProfileError("Unknown Error");
      console.log("Unknown error 2: ",error);
    }
  }

  const getFirstProfileData = async (userName) => {
    
      await axios.get(BASE_URL + userName)
      .then((response) => {
      const data = response.data;
      const image = response.data.avatar_url;
      setFirstProfileImage(image);
      setFirstProfileData(data);
      emptyInputFields();
       })
      .catch((error) => {
        handleFirstProfileError(error);
      })    
  }

  const getSecondProfileData = async (userName) => { 

      await axios.get(BASE_URL + userName)
      .then((response) => {
      const data = response.data;
      const image = response.data.avatar_url;
      setSecondProfileImage(image);
      setSecondProfileData(data);
      emptyInputFields();
       })
      .catch((error) => {
        handleSecondProfileError(error);
      })   
  }
  const handleSubmit = () => {
    const inputFirst = document.getElementById("input-field-1").value.trim().toLowerCase();
    setFirstProfileName(inputFirst);
    const inputSecond = document.getElementById("input-field-2").value.trim().toLowerCase();
    setSecondProfileName(inputSecond);

    if(inputFirst.includes(" ") || inputSecond.includes(" ")){
      alert("Username should not contain space")
    } else if (!inputFirst || !inputSecond){
      alert("Please Enter All fields");
    } else {
      getFirstProfileData(inputFirst);
      getSecondProfileData(inputSecond);
      /* resetProfiles(); */
    }
  }
  
  return (
    <div className="app">
      <h2>Fetch GitHub Profiles</h2>
      <div className="wrapper">
      
      <div className="profile-container">
        <img className="profile-image" src={firstProfileImage} alt="profile 1"/>
        <input 
          className="input-field" 
          value={firstProfileName} 
          onChange={(e) => setFirstProfileName(e.target.value)} 
          placeholder="Enter github user name" 
          id="input-field-1" 
          type="text"
        />
        {firstProfileError ? <p>Profile {firstProfileError}</p> : ""}
         
        { firstProfileData 
          && 
          <div className="data-section">
            <p>Username: {firstProfileData.login ? firstProfileData.login : DEFAULT_ERROR_MESSAGE}</p>
            <p>Name: {firstProfileData.name ? firstProfileData.name.toUpperCase() : DEFAULT_ERROR_MESSAGE}</p>
            <p>Number of Repos: {firstProfileData.public_repos ? firstProfileData.public_repos : DEFAULT_ERROR_MESSAGE}</p>
          </div>
        }        
      </div>

      <button onClick={handleSubmit}>Get Profile Details</button>

      <div className="profile-container">
        <img className="profile-image" src={secondProfileImage} alt="profile 2"/>
        <input 
          className="input-field" 
          value={secondProfileName} 
          onChange={(e) => setSecondProfileName(e.target.value)} 
          placeholder="Enter github user name" 
          id="input-field-2" 
          type="text"
        />

        {secondProfileError ? <p>Profile {secondProfileError}</p> : ""}
         
        { secondProfileData 
          && 
          <div className="data-section">
            <p>Username: {secondProfileData.login ? secondProfileData.login : DEFAULT_ERROR_MESSAGE}</p>
            <p>Name: {secondProfileData.name ? secondProfileData.name.toUpperCase() : DEFAULT_ERROR_MESSAGE}</p>
            <p>Number of Repos: {secondProfileData.public_repos ? secondProfileData.public_repos : DEFAULT_ERROR_MESSAGE}</p>
        </div>
        }
      </div>

    </div>
    </div>
  );
}

export default App;
