'use client';

import React from 'react';

import {useAppDispatch, useAppSelector} from "@/utils/hooks";
import {useEffect} from "react";
import {fetchUserData, logout} from "@/utils/authThunk";
import {useRouter} from 'next/navigation';
import {getAccessToken} from "@/utils/helpers";


const UserDataFetcher = () => {
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
    }, [user.id, dispatch, router, token]);

    return <></>;

};

export default UserDataFetcher;

