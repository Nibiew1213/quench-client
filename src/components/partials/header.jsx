import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { toast } from "react-toastify"; 
import jwt_decode from 'jwt-decode'

import { useShoppingCart } from "../../context/ShoppingCartContext";
import styles from './header.module.scss'
// import Logout from "../logout/Logout";


function Header() {
    // using custom hook
    const {totalItemsInCart, setTotalItemsTotal, userData, setUserData} = useShoppingCart()
    // const {cart, totalItemsInCart} = useShoppingCart()

    const navigate = useNavigate()

    //get user token to show "Profile" rather than "Login/Register"
    const token = localStorage.getItem("user_token")
    // const userData1 = JSON.parse(localStorage.getItem("user_data"))

    const user = token? (jwt_decode(token)) : null


    function Logout() {

        localStorage.clear()
        setTotalItemsTotal(0)
        setUserData({})
        navigate('/beverages')
        toast.success("Logout Successful!")
        console.log("wow")
    
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light sticky-top">
            <div className="container-fluid">
                
                <NavLink to="/" className="navbar-brand">
                    <FontAwesomeIcon className={styles["mug"]} icon={icon({name: 'mug-saucer', style: 'solid', color: 'blue'})} /> 
                    Quench
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/beverages" className="nav-link">Beverages</NavLink>
                        </li>
                    </ul>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <div className="d-flex align-items-center"> 
                        <NavLink to={`/users/${userData?.userId}/cart`}>
                            <button type="button" className="btn btn-light">
                                <FontAwesomeIcon className="mx-1 px-1" icon={icon({name: 'shopping-cart', style: 'solid' })} />
                                {totalItemsInCart !== 0 ? (
                                    <span className="badge text-bg-secondary mx-1">{totalItemsInCart}</span>
                                ) : (
                                    ""
                                )}
                            </button>
                        </NavLink>
                    
                    </div>
                        {token ? (
                            <>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userData.email}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><NavLink to={`/users/profile/${userData?.userId}`} className="dropdown-item">Account</NavLink></li>
                                        <li><a className="dropdown-item">History</a></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li onClick={Logout} className="dropdown-item">Logout</li>
                                    </ul>
                                </div>
                            </>
                        ):(
                        <>
                            <button className="btn" type="button">
                                <NavLink to="/users/auth/login" className="nav-link">Login</NavLink>
                                
                            </button>
                            <button className="btn btn-primary" type="button">
                                <NavLink to="/users/auth/register" className="nav-link">Register</NavLink>
                            </button>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
