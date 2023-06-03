import React, { ChangeEvent} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios from "../../utils/useAxios";
import { AxiosResponse } from "axios";
import styles from './SettingsPage.module.sass'

interface ProfilePageProps {
    // Добавьте необходимые пропсы для компонента
}

interface UserData {
    username?: string;
    password?: string;
    email?: string;
}

export const SettingsPage: React.FC<ProfilePageProps> = () => {
    const api = useAxios();

    const imageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const response = await api.post("/user/updateAvatar", formData);

            // Здесь можете обработать ответ после загрузки изображения
            console.log("Image upload response:", response);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const updateUserData = async (values: UserData) => {
        try {
            const response: AxiosResponse = await api.post("/user/update", values);

            // Здесь можете обработать ответ после обновления данных пользователя
            console.log("Update user data response:", response);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().nullable().notRequired(),
        password: Yup.string().nullable().notRequired(),
        email: Yup.string().email("Invalid email").nullable().notRequired(),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: "",
        },
        validationSchema,
        onSubmit: (values: UserData) => {
            updateUserData(values);
        },
    });

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            imageUpload(file);
        }
    };

    return (
        <div className={styles.Settings}>
            <div className={styles.SettingsRow}>
                <h2>Смена картинки</h2>
                <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.ImgInput} name={'Добавить аватар'}/>
            </div>
            <div className={styles.SettingsRow}>
                <h2>Обновить данные</h2>
                <form onSubmit={formik.handleSubmit} className={styles.SettingsRowForm}>
                    <div>
                        <label className={styles.SettingsRowFormName}>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            className={styles.Input}
                        />
                        {formik.errors.username && formik.touched.username && (
                            <div>{formik.errors.username}</div>
                        )}
                    </div>

                    <div>
                        <label className={styles.SettingsRowFormName}>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className={styles.Input}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div>{formik.errors.password}</div>
                        )}
                    </div>
                    <div>
                        <label className={styles.SettingsRowFormName}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className={styles.Input}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div>{formik.errors.email}</div>
                        )}
                    </div>

                    <button type="submit" className={styles.Button}>Сохранить</button>
                </form>
            </div>
        </div>
    );
};

