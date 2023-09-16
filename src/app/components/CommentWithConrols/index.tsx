import React from 'react';
import {Comment as CommentType} from '@/utils/types';
import styles from './index.module.scss';
import {formatDatetime} from "@/utils/helpers";
import api from "@/utils/api";

type CommentProps = {
    comment: CommentType;
    approveCallback: (commentId: number) => void;
    deleteCallback: (commentId: number) => void;

}
const CommentWithControls: React.FC<CommentProps> = ({comment, approveCallback, deleteCallback}) => {

    const approveComment = () => {
        api.put(`/comments/unmoderated/${comment.id}/`, {
            is_moderated: true,
        }).then(response => {
            approveCallback(comment.id);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteComment = () => {
        api.delete(`/comments/unmoderated/${comment.id}/`).then(response => {
            deleteCallback(comment.id);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={styles.comment}>
            <div className={styles.comment__header}>
                <time className={styles.comment__datetimeCreated} dateTime={comment.datetime_created}>
                    {formatDatetime(comment.datetime_created)}
                </time>
                <button className={`button button_sm`} onClick={approveComment}>Одобрить</button>
                <button className={`button button_sm button_red`} onClick={deleteComment}>Удалить</button>
            </div>
            <div className={styles.comment__author}>
                <div className={styles.comment__avatar}></div>
                <p>{comment.author.first_name} {comment.author.last_name}</p>
            </div>
            <p className={styles.comment__text}>{comment.text}</p>
        </div>
    );
};

export default CommentWithControls;