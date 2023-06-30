import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const Protectedroute = ({isauthenticated,children,redirect = "/login"}) => 
{
  const { loading } = useSelector((state) => state.user);
  if(loading===true)
      { <Loader/>}

  if(loading===false){
    if (!isauthenticated) {
      return <Navigate to={redirect} />;
    }
    return children ? children : <Outlet />;
  }
  
};
export default Protectedroute


//     redirectAdmin = "/profile",s
//     adminRoute,
//     isAdmin,

 // if (adminRoute && !isAdmin) {
  //    return <Navigate to={redirectAdmin} />;
  //   }


// const Protectedroute = () => {
//     const { loading, isauthenticated } = useSelector((state) => state.user);
//     if (!isauthenticated) 
//     return (<Fragment><Navigate to="/login"/>;</Fragment>)
//     //   return (
//     //     <Fragment>
//     //       {loading === false && (
//     //         <Route
//     //           {...rest}
//     //           render={(props) => {
//     //             if (!isauthenticated === false) {
//     //               return <Navigate to="/login" />;
//     //             }

//     //             return <Component {...props} />;
//     //           }}
//     //         />
//     //       )}
//     //     </Fragment>


//     return <Fragment>
//         {loading ? (
//             <Loader />
//         ) : (
//             <Fragment><Outlet />  </Fragment>
//         )}
//     </Fragment>

//     //   )
// }
