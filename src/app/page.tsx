'use client';

import styles from './page.module.scss'
import {useAppDispatch, useAppSelector} from "@/utils/hooks";
import {useEffect} from "react";
import {fetchUserData, logout} from "@/utils/authThunk";
import {useRouter} from 'next/navigation';
import {getAccessToken} from "@/utils/helpers";


export default function Home() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.auth);
    const router = useRouter();
    const token = getAccessToken();

    useEffect(() => {
        if (token && !user.id) {
            dispatch(fetchUserData());
        } else if (!token) {
            dispatch(logout());
            router.push("/login");
        }
    }, [dispatch, router, token]);

    return (
        <section className={styles.home}>
            <h2 className={`title ${styles.home__title}`}>
                webdev-lab
            </h2>
        </section>
    )
}
