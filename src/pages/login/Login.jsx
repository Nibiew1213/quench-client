import React from "react";
import axios from "axios"
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { schema } from './login.validation'

import ImageComponent from "../../components/image-component/ImageComponent";
import loginImg from "./refreshing_beverage_td3r.svg";
import styles from '../../components/stylesheets/form.module.scss'
import { useShoppingCart } from "../../context/ShoppingCartContext";

function Login() {
    const navigate = useNavigate();
    const { setUserData } = useShoppingCart()

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            // email: "",
            // password: "",

            email: "mervin5@gmail.com",
            password: "1234"
        },
    });

    async function onSubmit(data) {
        console.log("data: ", data);

        try {
            let response =  await axios.post(`${process.env.REACT_APP_USER_BASE_URL}/auth/login`, data)

            if(response.error) {
                toast.error(response.error)
                return
            }
            console.log(response)
            const token = response.data.token
            const userData = response.data.userData
            console.log(userData)
            toast.success(`Login Successful!`)

            localStorage.setItem("user_token", token)
            localStorage.setItem("user_data", JSON.stringify(userData))
            setUserData(userData)

            navigate("/beverages")
        } catch (error) {
            console.log(error.response)
            toast.error("Unable to login. Please try again later.")
        }
    }

    console.log("errors: ", errors);

    return (
        <>
            <div className="container my-5">
                <div className="row">

                    <div className="col-7">
                        <img src={ImageComponent(loginImg)} alt="login.img" />
                    </div>

                    <div className="col-sm-5 rounded-4 border bg-light">
                        <div className="p-3">
                            <h5 className="mb-4 d-flex justify-right">LOGIN</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles["form-group"]}>
                                    <label className={styles['form-label']} for="email">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        {...register("email")}
                                        placeholder="abc@gmail.com"
                                    />
                                    <p className={styles['form-error-message']}>{errors.email?.message}</p>
                                </div>
                                <div className={styles["form-group"]}>
                                    <label className={styles['form-label']} for="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        {...register("password")}
                                        placeholder="********"
                                    />
                                    <p className={styles['form-error-message']}>{errors.password?.message}</p>
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
