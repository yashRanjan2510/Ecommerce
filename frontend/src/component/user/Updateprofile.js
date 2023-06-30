import React, { Fragment, useState, useEffect } from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/useraction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userconstants';
import "./updateprofile.css"
import Metadata from '../layout/Metadata';

const Updateprofile = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const nevigate=useNavigate();
    const { user } = useSelector(state => state.user)
    const {error,isupdated,loading} = useSelector(state => state.profile)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm))
    };

    useEffect(()=>{
        if(user){
            setname(user.name);
            setemail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if(error){
         alert.error(error)
         dispatch(clearErrors())
        }
        if(isupdated){
            alert.success("Profile updated successfully")
            dispatch(loadUser())
            nevigate("/account")
             dispatch({type:UPDATE_PROFILE_RESET})
        }
     },[dispatch,error,alert,nevigate,user,isupdated])

    const updateProfileDataChange = (e) => {
         
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        
    };

    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

export default Updateprofile