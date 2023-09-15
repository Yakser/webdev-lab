import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAccessToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken} from './helpers';
import api, {registerApi} from './api';
import {User, UserEditableFields, LoginData} from './types';
import {AxiosError} from 'axios';
import {AppState, AuthState} from './auth';


export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (_, {rejectWithValue}) => {
        try {
            const token = getAccessToken();
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
            }
            const {data} = await api.get('/users/current/');
            return data;
        } catch (e) {
            return rejectWithValue('');
        }
    });

export const editUserData = createAsyncThunk<User, UserEditableFields>(
    'auth/editUserData',
    async (payload, {rejectWithValue, getState}) => {
        try {
            const token = getAccessToken();
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
            }
            const {auth} = getState() as AppState;
            const userId = auth.user.id;
            const {data} = await api.put(`/users/${userId}/`, payload);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('');
        }
    });


export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        delete api.defaults.headers.common['Authorization'];
        removeAccessToken();
        removeRefreshToken();
    }
);

export const register = createAsyncThunk<User, User>(
    'auth/register',
    async (payload, {rejectWithValue}) => {
        try {
            const response = await registerApi.post<User>('/users/', payload);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data);
            }
            return rejectWithValue({});
        }
    }
);
export const login = createAsyncThunk<User, LoginData>(
    'auth/login',
    async (payload, {dispatch}) => {

        const response = await api.post('/auth/token/', payload);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return (await dispatch(fetchUserData())).payload;
    }
);

