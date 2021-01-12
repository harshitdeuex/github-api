import React from 'react';

const maleDummyImage = "https://st2.depositphotos.com/1502311/12020/v/600/depositphotos_120206862-stock-illustration-profile-picture-vector.jpg";
const DEFAULT_ERROR_MESSAGE = "Not found";
const ProfileContainer = (props) => {
    const {profileData, profileName, setProfileName, profileError} = props;
    return (
        <div className="profile-container">
          <img className="profile-image" src={profileData.avatar_url || maleDummyImage} alt="profile"/>
          <input 
            type="text"
            className="input-field" 
            value={profileName} 
            onChange={(e) => setProfileName(e.target.value)} 
            placeholder="Enter github user name"  
          />
          { profileError && <p>Profile {profileError}</p> }
          
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