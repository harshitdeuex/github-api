import React from 'react';

const maleDummyImage = "https://st2.depositphotos.com/1502311/12020/v/600/depositphotos_120206862-stock-illustration-profile-picture-vector.jpg";
const DEFAULT_ERROR_MESSAGE = "Not found";

let input = "";
let timeout = "";
const ProfileContainer = (props) => {
    const {profileData, profileName, setProfileName, profileError, handleSubmit} = props;

    const handleChange = (e) => {
      input = e.target.value.trim();
      setProfileName(input);
    }

    const handleKeyUp = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        console.log(input);
        handleSubmit(input);
      }, 1500);
    }

    return (
        <div className="profile-container">
          <img className="profile-image" src={profileData.avatar_url || maleDummyImage} alt="profile"/>
          <input 
            type="text"
            className="input-field" 
            value={profileName} 
            onChange={(e) => handleChange(e)}
            onKeyUp={() => handleKeyUp()} 
            placeholder="Enter github user name"  
          />
          { input && profileError && <p>Profile {profileError}</p> }
          
          { profileData && !profileError
            && 
            <div className="data-section">
              <p>Username: {profileData.login || DEFAULT_ERROR_MESSAGE}</p>
              <p>Name: {profileData.name || DEFAULT_ERROR_MESSAGE}</p>
              <p>Number of Repos: {profileData.public_repos || DEFAULT_ERROR_MESSAGE}</p>
            </div>
          }        
        </div>
    )
}

export default ProfileContainer;