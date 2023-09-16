export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const setAccessToken = (token: string) => {
    localStorage.setItem('access_token', token);
};

export const removeAccessToken = () => {
    localStorage.removeItem('access_token');
};


export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const setRefreshToken = (token: string) => {
    localStorage.setItem('refresh_token', token);
};

export const removeRefreshToken = () => {
    localStorage.removeItem('refresh_token');
};

export const formatDatetime = (datetime: string): string => {
    return new Intl.DateTimeFormat('ru', {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }).format(new Date(datetime));
}




