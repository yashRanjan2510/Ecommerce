import React, { Fragment, useEffect, useState } from 'react'
import Metadata from '../layout/Metadata';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import "./resetpassword.css"
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '../../actions/useraction';

function Resetpassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {token}=useParams();
    const nevigate=useNavigate();
    const { error, success, loading } = useSelector(
      (state) => state.forgotpassword
    );
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmpassword", confirmpassword);
    
        dispatch(resetPassword(token, myForm));
      };
     
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (success) {
          alert.success("Password Updated Successfully");
          nevigate("/login");
        }
      }, [dispatch, error, alert, nevigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Resetpassword