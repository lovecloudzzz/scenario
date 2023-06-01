import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext, { AuthContextProps } from "../../../context/AuthContext";
import styles from "../Modal.module.sass";

export const LoginModal = () => {
    const { loginUser } = useContext(AuthContext) as AuthContextProps;
    const [isOpen, setIsOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit: async (values, { setSubmitting }) => {
            await loginUser(values);
            setSubmitting(false);
        }
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Login Modal</button>

            {isOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h1>Login</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div>{formik.errors.username}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div>{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <button type="submit" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? "Logging in..." : "Submit"}
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
