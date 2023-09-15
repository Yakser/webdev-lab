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
