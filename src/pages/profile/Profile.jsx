import React, { useEffect, useState } from "react"
import axios from "axios" // send data to server
import { toast } from "react-toastify" // pop-up message success/failure ...
import { useNavigate } from "react-router-dom"

import styles from "../../components/stylesheets/form.module.scss"
import SideBar from '../../components/side-bar/SideBar'
import { useShoppingCart } from "../../context/ShoppingCartContext";

function Profile() {
  const { setUserData } = useShoppingCart()

  // userdata from local storage
  const userData = JSON.parse(localStorage.getItem("user_data")) // converts string of user_data into a constructed object
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(userData) // set initial useState for profile
  const [userPassword, setUserPassword] = useState([]) // set initial useState for password

  const onProfileChange = (event) => {
    // Profile change function
    event.preventDefault()
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value }) //...spread first, then update each particular target
  }

  const onPasswordChange = (event) => {
    // Password change function
    event.preventDefault()
    setUserPassword({
      ...userPassword,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {}, []) // this will refresh the page once upon loading (helps to emliminate blank page on first load)

  // hello
  //world

  const handleProfileSubmit = async (event) => {
    // when you click update profile button
    event.preventDefault()
    console.log("userDetails: ", userDetails)

    try {
      let response = await axios.put(
        // run axios call to update in mongo.
        `${process.env.REACT_APP_USER_BASE_URL}/profile/${userDetails.userId}/editProfile`,
        {
          fullName: userDetails.fullName,
          preferredName: userDetails.preferredName,
          email: userDetails.email,
        }
      )
      console.log("response.data.newData: ", response.data.newData)
      localStorage.setItem("user_data", JSON.stringify(response.data.newData)) // update user_data in local storage with updated info
      setUserData(response.data.newData)
      if (response.error) {
        toast.error(response.error)
        return
      }
      toast.success(`Profile update Successful!`)
      navigate("/users/profile/:userId")
    } catch (error) {
      console.log("error.response: ", error.response)
      toast.error("Unable to update profile. Please try again later.")
    }
  }

  const handlePasswordSubmit = async (event) => {
    // when you click change password button
    event.preventDefault()
    try {
      let response = await axios.put(
        // run axios call to update in mongo.
        `${process.env.REACT_APP_USER_BASE_URL}/profile/${userDetails.userId}/changePassword`,
        {
          currentPassword: userPassword.currentPassword,
          newPassword: userPassword.newPassword,
          confirmNewPassword: userPassword.confirmNewPassword,
        }
      )

      if (response.error) {
        toast.error(response.error)
        return
      }
      toast.success(`Password update Successful! Please login again.`)
      navigate("/users/auth/login")
    } catch (error) {
      console.log("error.response: ", error.response)
      toast.error("Unable to change password. Please try again later.")
    }
  }

  return (
    <>
    
    
      <div className="container my-5">
        <div className="row">
        <SideBar />
          <div className="col-1"></div>

          {/* --------------------User Details-------------------- */}
          <div className="col-4">
            <div className="p-3">
              <h5 className="mb-4 d-flex justify-left">User Details</h5>

              <form onSubmit={handleProfileSubmit}>
                <div className={styles["form-group"]}>
                  <label className={styles["form-label"]} for="fullName">
                    Full Name
                  </label>
                  <input
                    type="string"
                    className="form-control"
                    name="fullName"
                    value={userDetails.fullName}
                    onChange={onProfileChange}
                  />
                  <p className={styles["form-error-message"]}>
                    {/* {errors.fullName?.message} */}
                  </p>
                </div>

                <div className={styles["form-group"]}>
                  <label className={styles["form-label"]} for="preferredName">
                    Preferred Name
                  </label>
                  <input
                    type="string"
                    className="form-control"
                    name="preferredName"
                    value={userDetails.preferredName}
                    onChange={onProfileChange}
                  />
                  <p className={styles["form-error-message"]}>
                    {/* {errors.preferredName?.message} */}
                  </p>
                </div>

                <div className={styles["form-group"]}>
                  <label className={styles["form-label"]} for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={userDetails.email}
                    onChange={onProfileChange}
                  />
                  <p className={styles["form-error-message"]}>
                    {/* {errors.email?.message} */}
                  </p>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-outline-primary">
                    Update profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* --------------------Password-------------------- */}

          <div className="col-4">
            <div className="p-3">
              <h5 className="mb-4 d-flex justify-right">Password</h5>

              <form onSubmit={handlePasswordSubmit}>
                <div className={styles["form-group"]}>
                  <label className={styles["form-label"]} for="currentPassword">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="currentPassword"
                    value={userPassword.currentPassword}
                    onChange={onPasswordChange}
                  />
                  <p className={styles["form-error-message"]}>
                    {/* {errors.currentPassword?.message} */}
                  </p>
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles["form-label"]} for="newPassword">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={userPassword.newPassword}
                    onChange={onPasswordChange}
                  />
                  <p className={styles["form-error-message"]}>
                    {/* {errors.newPassword?.message} */}
                  </p>
                </div>
                <div className={styles["form-group"]}>
                  <label
                    className={styles["form-label"]}
                    for="confirmNewPassword"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmNewPassword"
                    value={userPassword.confirmNewPassword}
                    onChange={onPasswordChange}
                  />
                  <p className={styles["form-error-message"]}>
                    {/* {errors.confirmNewPassword?.message} */}
                  </p>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-outline-primary">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
