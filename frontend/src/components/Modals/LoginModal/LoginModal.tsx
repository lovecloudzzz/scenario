import React, { useContext, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext, { AuthContextProps } from "../../../context/AuthContext";
import styles from "../Modal.module.sass";

export const LoginModal = () => {
    const { loginUser } = useContext(AuthContext) as AuthContextProps;
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            await loginUser(values);
            setSubmitting(false);
        },
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === modalRef.current) {
            closeModal();
        }
    };

    return (
        <div>
            <button onClick={openModal} className={styles.Button}>
                Вход
            </button>

            {isOpen && (
                <div className={styles.modal} onClick={handleModalClick} ref={modalRef}>
                    <div className={styles.modalContent}>
                        <h1>Вход</h1>
                        <form onSubmit={formik.handleSubmit} className={styles.Form}>
                            <div className={styles.formField}>
                                <label htmlFor="username" className={styles.Label}>
                                    Никнейм
                                </label>
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
                            <div className={styles.formField}>
                                <label htmlFor="password" className={styles.Label}>
                                    Пароль
                                </label>
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
                            <button type="submit" disabled={formik.isSubmitting} className={styles.ModalButton}>
                                {formik.isSubmitting ? "Входим..." : "Войти"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};