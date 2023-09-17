"use client";
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch} from "@/utils/hooks";
import {register as registerUser} from '@/utils/authThunk';
import {useRouter} from 'next/navigation';

type FormInputs = {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    passwordRepeat: string,
}
const Register = () => {
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
    const dispatch = useAppDispatch();
    const onSubmit = async ({username, password, email, first_name, last_name}: FormInputs) => {
        setIsLoading(true);
        dispatch(registerUser({username, password, email, first_name, last_name, is_staff: false})).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                router.push('/login/');
            } else {
                setError("root", {message: 'Произошла неизвестная ошибка!'});
            }
        }).catch(() => {
            setError("root", {message: 'Произошла неизвестная ошибка!'});
        }).finally(() => {
            setIsLoading(false);
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'form'}>
            <label className={'form__label'}>
                <input type="text"
                       className={`form__input`}
                       {...register("username", {
                           required: true,
                       })}
                       placeholder={"Логин"}
                />
            </label>
            <label className={'form__label'}>
                <input type="text"
                       className={`form__input`}
                       {...register("email", {
                           required: true,
                       })}
                       placeholder={"Почта"}
                />
            </label>
            <label className={'form__label'}>
                <input type="text"
                       className={`form__input`}
                       {...register("first_name", {
                           required: true,
                       })}
                       placeholder={"Имя"}
                />
            </label>
            <label className={'form__label'}>
                <input type="text"
                       className={`form__input`}
                       {...register("last_name", {
                           required: true,
                       })}
                       placeholder={"Фамилия"}
                />
            </label>
            <label className={'form__label'}>
                <input type="password"
                       className={`form__input`}
                       {...register("password", {
                           required: true,
                       })}
                       placeholder={"Пароль"}
                />
            </label>
            <label className={'form__label'}>
                <input type="password"
                       className={`form__input`}
                       {...register("passwordRepeat", {
                           required: true,
                       })}
                       placeholder={"Пароль ещё раз"}
                />
            </label>
            {errors.root && (
                <p className={`form__error`}>
                    {errors.root.message}
                </p>
            )}
            <button
                className={'form__submit'}
                type={"submit"}
                disabled={isLoading}
            >
                {isLoading ? "Загрузка..." : "Создать аккаунт"}
            </button>
        </form>
    );
};

export default Register;