'use client';

import React from 'react';
import {useAppSelector} from '@/utils/hooks';
import styles from './index.module.scss'
    ;
import Link from "next/link";

const UserCard = () => {
    const {user} = useAppSelector((state) => state.auth);
    return (
        <div className={styles.userCard}>
            {

                user.id ? (
                    <>
                        <Link className={styles.userCard__name} href={'/profile'}>
                            {user.first_name} {user.last_name}
                        </Link>
                        <Link href={'/profile'}>
                            <div className={styles.userCard__avatar}></div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className={'button'} href={'/login'}>
                            Войти
                        </Link>
                        <Link className={'button'} href={'/register'}>
                            Зарегистрироваться
                        </Link>
                    </>
                )
            }
        </div>
    );
};

export default UserCard;