import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext, { AuthContextProps } from "../../../context/AuthContext";
import styles from "../Modal.module.sass";

export const RegistrationModal = () => {
    const {loginUser } = useContext(AuthContext) as AuthContextProps;
    const [isOpen, setIsOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/register", values);
                const userData = response.data;

                loginUser(userData); // Store the tokens in the auth context or wherever you handle token storage
                setSubmitting(false);
                closeModal();
            } catch (error) {
                console.error("Registration error:", error);
                // Handle error case
                setSubmitting(false);
            }
        },
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Registration Modal</button>

            {isOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h1>Registration</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={styles.formField}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    {...formik.getFieldProps("username")}
                                />
                                {formik.touched.username && formik.errors.username && (
                                    <div className={styles.error}>{formik.errors.username}</div>
                                )}
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    {...formik.getFieldProps("password")}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className={styles.error}>{formik.errors.password}</div>
                                )}
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className={styles.error}>{formik.errors.email}</div>
                                )}
                            </div>

                            <button type="submit" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? "Registering..." : "Register"}
                            </button>
                        </form>
                        <button onClick={closeModal} className={styles.closeButton}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
