import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import "./header.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/useraction';


const Useroption = ({user}) => {

    const nevigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert();
    function dashboard() {
       nevigate("/admin/dashboard");
      }

      function orders() {
        nevigate("/orders");
      }
      function account() {
        nevigate("/account");
      }
      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }

    const [open, setOpen] = useState(false);

    const options=[
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]
    if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }

  return (
    <Fragment>
        <Backdrop open={open} style={{ zIndex: "10" }} />
     <SpeedDial 
     ariaLabel="SpeedDial tooltip example"
     onClose={() => setOpen(false)}
     onOpen={() => setOpen(true)}
     open={open}
     direction='down'
     className="speedDial"
     icon={
       <img
         className="speedDialIcon"
         src={user.avatar.url ? user.avatar.url : "/Profile.png"}
         alt="Profile"
       />
     }
     > 
     {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}      
     </SpeedDial>
    </Fragment>
  )
}

export default Useroption