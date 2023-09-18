'use client';

import React, {useCallback, useEffect, useState} from 'react';
import styles from "./page.module.scss";
import EditNewsPostForm from "@/app/components/EditNewsPostForm";
import {News} from "@/utils/types";
import {useForm} from "react-hook-form";
import api from "@/utils/api";
import {CreateNewsPostFormInputs} from "@/app/news/page";
import {NewsDetail as NewsDetailType} from "@/utils/types";
import {useRouter} from "next/navigation";

const Page = ({params}: { params: { newsId: number } }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState,
        setError,
        setValue,
        formState: {isSubmitSuccessful, errors},

    } = useForm<CreateNewsPostFormInputs>();


    const onSubmit = async ({title, text}: CreateNewsPostFormInputs) => {
        setIsLoading(true);
        api.put(`/news/${params.newsId}/`, {title, text})
            .then(response => {
                console.log('ok');
            })
            .catch(error => {
                setError("root", {message: 'Произошла неизвестная ошибка!'});
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const deleteNewsPost = useCallback(() => {
        api.delete(`/news/${params.newsId}`).then(response => {
            router.back();

        }).catch(error => {
            console.log(error);
        })

    }, [params.newsId, router]);


    useEffect(() => {
        api.get(`/news/${params.newsId}`).then(response => {
            // setNewsPost(response.data);
            const post: NewsDetailType = response.data as NewsDetailType;
            setValue('title', post.title);
            setValue('text', post.text);

        }).catch(error => {
            console.log(error);
        })
    }, [params.newsId, setValue]);


    return (
        <section className={styles.editNewsPost}>
            <h2 className={'title'}>Редактирование новости</h2>
            <form className={`form ${styles.news__form}`} onSubmit={handleSubmit(onSubmit)}>
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
                        className="form__textarea"
                    ></textarea>
                </label>

                {formState.errors.root && (
                    <p className={styles.form__error}>
                        {formState.errors.root.message}
                    </p>
                )}
                <button
                    className={'form__submit'}
                    type={"submit"}
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Изменить"}
                </button>
            </form>
            <button className={'button button_red'} onClick={deleteNewsPost}>Удалить</button>
        </section>
    );
};

export default Page;