"use client";
import React, {FormEvent, useState} from 'react';
import styles from './index.module.scss';
import {FieldValues, useForm} from "react-hook-form";
import {useAppDispatch} from "@/utils/hooks";
import {getAccessToken} from "@/utils/helpers";
import {login} from '@/utils/authThunk';
import {useRouter} from 'next/navigation';

type FormInputs = {
    username: string,
    password: string,
}
const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState,
        setError,
        formState: {isSubmitSuccessful, errors},

    } = useForm<FormInputs>();
    const token = getAccessToken();
    const dispatch = useAppDispatch();
    const onSubmit = async ({username, password}: FormInputs) => {
        setIsLoading(true);
        dispatch(login({username, password})).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                router.push('/');
            } else {
                setError("root", {message: 'Неверный псевдоним или пароль!'});
            }
        }).catch(() => {
            setError("root", {message: 'Произошла неизвестная ошибка!'});
        }).finally(() => {
            setIsLoading(false);
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label className={styles.form__label}>
                <input type="text"
                       className={styles.form__input}
                       {...register("username")}
                       placeholder={"Логин"}
                />
            </label>
            <label className={styles.form__label}>
                <input type="password"
                       className={styles.form__input}
                       {...register("password")}
                       placeholder={"Пароль"}
                />
            </label>
            <button
                className={styles.form__submit}
                type={"submit"}
                disabled={isLoading}
            >
                {isLoading ? "Загрузка..." : "Войти"}
            </button>
        </form>
    );
};

export default LoginForm;