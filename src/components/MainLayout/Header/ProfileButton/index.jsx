import TextButton from "../../../Buttons/TextButton";
import "./index.css";

const ProfileButton = (props) => {
    return (
        props.currentAccount ?
        <div className="profile-button">
            {/* <a href="/dashboard">User profile</a> */}
            <TextButton link="/dashboard" text="User profile"/>
        </div> :
        null        
    );
}

export default ProfileButton;