import React from "react";
import axios from "axios"
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { schema } from './register.validation'

import styles from '../../components/stylesheets/form.module.scss'
import ImageComponent from "../../components/image-component/ImageComponent";
import RegisterImg from "./refreshing_ncum.svg";


 function Register(props) {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            fullName: "",
            preferredName: "",
            email: "",
            password: "",
            confirmPassword: "",

            // fullName: "Mervin Tester 2",
            // preferredName: "Tester 2",
            // email: "mervin2@gmail.com",
            // password: "123",
            // confirmPassword: "123",
        },
    });

    async function onSubmit(data) {
        console.log("data: ", data);
        
        try {
            let response =  await axios.post(`${process.env.REACT_APP_USER_BASE_URL}/auth/register`, data)

            if(response.error) {
                toast.error(response.error)
                return
            }
            
            toast.success("Registered Successfully")

            navigate("/users/auth/login")
        } catch (error) {
            console.log(error.response)
            toast.error("Unable to Register. Please try again later.")
        }

    }


    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-sm-7">
                        <img id={styles["register-image"]} src={ImageComponent(RegisterImg)} alt="register.img"/>
                    </div>

                    <div className="col-sm-5 rounded-4 border bg-light bg-sm-none">
                        <div className="p-4">
                            <h5 className="mb-4 d-flex justify-right">REGISTER</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles["form-group"]}>
                                    <label for="fullName" className={styles['form-label']}>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        {...register("fullName")}
                                        placeholder="John Doe"
                                    />
                                    <p className={styles['form-error-message']}>{errors.fullName?.message}</p>
                                </div>
                                <div className={styles["form-group"]}>
                                    <label className={styles['form-label']} for="preferredName">Preferred Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="preferredName"
                                        {...register("preferredName")}
                                        placeholder="John"
                                    />
                                    <p className={styles['form-error-message']}>{errors.preferredName?.message}</p>
                                </div>
                                <div className={styles["form-group"]}>
                                    <label className={styles['form-label']} for="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        {...register("email")}
                                        placeholder="abc@email.com"
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
                                        default="123"
                                    />
                                    <p className={styles['form-error-message']}>{errors.password?.message}</p>
                                </div>
                                <div className={styles["form-group"]}>
                                    <label className={styles['form-label']} for="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        {...register("confirmPassword")}
                                        placeholder="********"
                                    />
                                    <p className={styles['form-error-message']}>{errors.confirmPassword?.message}</p>
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
