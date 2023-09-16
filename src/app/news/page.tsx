'use client';

import React, {useEffect, useState} from 'react';
import styles from './page.module.scss';
import {News} from "@/utils/types";
import NewsPost from "@/app/news/NewsPost";
import api from "@/utils/api";
import {useForm} from "react-hook-form";

type FormInputs = {
    title: string,
    text: string,
}

const Page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [news, setNews] = useState<News[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState,
        setError,
        formState: {isSubmitSuccessful, errors},

    } = useForm<FormInputs>();

    const onSubmit = async ({title, text}: FormInputs) => {
        setIsLoading(true);
        api.post('/news/', {title, text})
            .then(response => {
                setNews([response.data, ...news])
                reset();
            })
            .catch(error => {
                setError("root", {message: 'Произошла неизвестная ошибка!'});
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };


    useEffect(() => {
        api.get('/news/').then((response) => {
            const data = response.data;
            setNews(response.data.results);
        }).catch(error => {
            console.log(error);
        })
    }, []);
    return (
        <section className={styles.news}>
            <h2 className={'title'}>Новости</h2>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label className="form__label">
                    <span className="form__labelText">Заголовок</span>
                    <input type="text"
                           className={`form__input`}
                           {...register("title", {
                               required: true
                           })}
                           placeholder={"Заголовок"}
                    />
                </label>
                <label className="form__label">
                    <span className="form__labelText">Текст</span>
                    <textarea
                        {...register("text", {
                            required: true
                        })}
                        cols={30}
                        rows={10}
                        placeholder={'Текст'}
                        className="form__textarea"></textarea>
                </label>
                {errors.root && (
                    <p className={styles.form__error}>
                        {errors.root.message}
                    </p>
                )}
                <button
                    className={'form__submit'}
                    type={"submit"}
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Опубликовать"}
                </button>
            </form>
            <div className={styles.news__list}>
                {
                    news.map(newsPost => <NewsPost newsPost={newsPost} key={newsPost.id}/>)
                }
            </div>
        </section>
    );
};

export default Page;