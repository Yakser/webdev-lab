export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    is_staff: boolean;
}

export type UserEditableFields = Pick<User, "first_name" | "last_name">
export type UserReadonlyFields = Omit<User, "first_name" | "last_name">
export type LoginData = Pick<User, "username" | "password">;

export type Comment = {
    id: number;
    text: string;
    author: Pick<User, "id" | "username" | "first_name" | "last_name">
    datetime_created: string;
}
export type News = {
    id: number;
    title: string;
    text: string;
    datetime_created: string;
    author: Pick<User, "id" | "username" | "first_name" | "last_name">
}

export type NewsDetail = News & {
    comments: Comment[];
}
