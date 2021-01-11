import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

const maleDummyImage = "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg";
const femaleDummyImage = "https://st2.depositphotos.com/4111759/12123/v/600/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg";
const BASE_URL = "https://api.github.com/users/"; 
const DEFAULT_ERROR_MESSAGE = "NOT FOUND";

function App() {

  const [firstUserError, setFirstUserError] = useState("");
  const [firstUserData, setFirstUserData] = useState(null);
  const [firstUserImage, setFirstUserImage] = useState(maleDummyImage);
  const [secondUserError, setSecondUserError] = useState("");
  const [secondUserData, setSecondUserData] = useState(null);
  const [secondUserImage, setSecondUserImage] = useState(femaleDummyImage);
  const [firstUserName, setFirstUserName] = useState("");
  const [secondUserName, setSecondUserName] = useState("");

  const resetProfiles = () => {
    setFirstUserError("");
    setFirstUserData(null);
    setFirstUserImage(maleDummyImage);
    setSecondUserError("");
    setSecondUserData(null);
    setSecondUserImage(femaleDummyImage);
  }

  const emptyInputFields = () => {
    setFirstUserName("");
    setSecondUserName("");
  }

  const getFirstUserData = async (userName) => {
    
      axios.get(BASE_URL + userName)
      .then((response) => {
      const data = response.data;
      const image = response.data.avatar_url;
      setFirstUserImage(image);
      setFirstUserData(data);
      emptyInputFields();
       })
      .catch((error) => {
        if(error.response){
          setFirstUserError(error.response.statusText);
          console.log("Response Error 1: ",error.response);
        } else if (error.request){
          setFirstUserError(error.request.XMLHttpRequest.statusText)
          console.log("Request error 1: ",error.request);
        } else {
          setFirstUserError("Unknown Error");
          console.log("Unknown error 1: ",error);
        }
      })    
  }

  const getSecondUserData = async (userName) => { 

    axios.get(BASE_URL + userName)
      .then((response) => {
      const data = response.data;
      const image = response.data.avatar_url;
      setSecondUserImage(image);
      setSecondUserData(data);
      emptyInputFields();
       })
      .catch((error) => {
        if(error.response){
          setSecondUserError(error.response.statusText);
          console.log("Response Error 2: ",error.response);
        } else if (error.request){
          setSecondUserError(error.request.XMLHttpRequest.statusText)
          console.log("Request error 2: ",error.request);
        } else {
          setSecondUserError("Unknown Error");
          console.log("Unknown error 2: ",error);
        }
      })   
  }
  const handleSubmit = () => {
    const inputFirst = document.getElementById("input-field-1").value.trim().toLowerCase();
    setFirstUserName(inputFirst);
    const inputSecond = document.getElementById("input-field-2").value.trim().toLowerCase();
    setSecondUserName(inputSecond);
    resetProfiles();

    if(inputFirst.includes(" ") || inputSecond.includes(" ")){
      alert("Username should not contain space")
    } else if (!inputFirst || !inputSecond){
      alert("Please Enter All fields");
    } else {
      getFirstUserData(inputFirst);
      getSecondUserData(inputSecond);
    }
  }
  
  return (
    <div className="wrapper">
      <div className="profile-container">
        <img className="profile-image" src={firstUserImage} alt="profile 1"/>
        <input 
          className="input-field" 
          value={firstUserName} 
          onChange={(e) => setFirstUserName(e.target.value)} 
          placeholder="Enter github user name" 
          id="input-field-1" 
          type="text"
        />
        {firstUserError ? <p>User {firstUserError}</p> : ""}
         
        { firstUserData 
          && 
          <div className="data-section">
            <p>Username: {firstUserData.login ? firstUserData.login : DEFAULT_ERROR_MESSAGE}</p>
            <p>Name: {firstUserData.name ? firstUserData.name.toUpperCase() : DEFAULT_ERROR_MESSAGE}</p>
            <p>Number of Repos: {firstUserData.public_repos ? firstUserData.public_repos : DEFAULT_ERROR_MESSAGE}</p>
          </div>
        }        
      </div>

      <button onClick={handleSubmit}>Get Profile Details</button>

      <div className="profile-container">
        <img className="profile-image" src={secondUserImage} alt="profile 2"/>
        <input 
          className="input-field" 
          value={secondUserName} 
          onChange={(e) => setSecondUserName(e.target.value)} 
          placeholder="Enter github user name" 
          id="input-field-2" 
          type="text"
        />

        {secondUserError ? <p>User {secondUserError}</p> : ""}
         
        { secondUserData 
          && 
          <div className="data-section">
            <p>Username: {secondUserData.login ? secondUserData.login : DEFAULT_ERROR_MESSAGE}</p>
            <p>Name: {secondUserData.name ? secondUserData.name.toUpperCase() : DEFAULT_ERROR_MESSAGE}</p>
            <p>Number of Repos: {secondUserData.public_repos ? secondUserData.public_repos : DEFAULT_ERROR_MESSAGE}</p>
        </div>
        }
      </div>

    </div>
  );
}

export default App;
