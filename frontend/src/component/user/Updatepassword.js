import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../actions/useraction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userconstants';
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import "./updatepassword.css"
import Metadata from '../layout/Metadata';

const Updatepassword = () => {
  
  const alert = useAlert();
  const dispatch = useDispatch();
  const nevigate=useNavigate();
  const {error,isupdated,loading} = useSelector(state => state.profile)
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  
  const updatePasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();

      myForm.set("oldpassword", oldpassword);
      myForm.set("newpassword", newpassword);
      myForm.set("confirmpassword", confirmpassword);
      dispatch(updatePassword(myForm))
  };

  useEffect(()=>{
     
      if(error){
       alert.error(error)
       dispatch(clearErrors())
      }
      if(isupdated){
          alert.success("Password updated successfully")
          dispatch(loadUser())
          nevigate("/account")
           dispatch({type:UPDATE_PASSWORD_RESET})
      }
   },[dispatch,error,alert,nevigate,isupdated])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldpassword}
                    onChange={(e) => setoldpassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Updatepassword