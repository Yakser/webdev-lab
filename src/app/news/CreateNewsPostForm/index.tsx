import React, {FormEventHandler} from 'react';
import styles from "@/app/news/page.module.scss";
import {CreateNewsPostFormInputs} from "@/app/news/page";
import {FormState} from "react-hook-form";

type onSubmit = (fields: CreateNewsPostFormInputs) => void

type CreateNewsPostFormProps = {
    onSubmit: onSubmit;
    handleSubmit: (onSubmit: onSubmit) => FormEventHandler<HTMLFormElement>;
    register:  Function;
    formState: FormState<CreateNewsPostFormInputs>;
    isLoading: boolean;
}

const CreateNewsPostForm: React.FC<CreateNewsPostFormProps> = ({onSubmit, handleSubmit, register, formState, isLoading}) => {
    return (
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
                    rows={15}
                    placeholder={'Текст'}
                    className="form__textarea"></textarea>
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
                {isLoading ? "Загрузка..." : "Опубликовать"}
            </button>
        </form>
    );
};

export default CreateNewsPostForm;