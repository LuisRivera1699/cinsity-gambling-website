import "./index.css";

const ProfileButton = (props) => {
    return (
        props.currentAccount ?
        <div className="profile-button">
            <a href="/dashboard">User profile</a>
        </div> :
        null        
    );
}

export default ProfileButton;