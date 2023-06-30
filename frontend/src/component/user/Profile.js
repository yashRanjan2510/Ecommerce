import React, { Fragment, useEffect } from 'react'
import './profile.css'
import Metadata from '../layout/Metadata'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

function Profile() {
  const nevigate=useNavigate();
  
  const { user, loading, isauthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isauthenticated === false) {
      nevigate("/login");
    }
  }, [nevigate, isauthenticated]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile