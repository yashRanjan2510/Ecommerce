import React , { Fragment, useState, useEffect }  from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./Forgotpassword.css"
import Metadata from '../layout/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { clearErrors, forgotPassword } from '../../actions/useraction';

const Forgotpassword = () => {
    const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading } = useSelector(
    (state) => state.forgotpassword
  );

  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Forgotpassword