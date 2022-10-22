import { fetchApi } from "shared/api/fetchApi";
import { GetUserResponse, RegisterUserRequest } from "user/types/api";
import create from "zustand";

interface UserState {
    isLoggedIn: boolean;
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    created_at: Date;
    logIn: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    register: (user: RegisterUserRequest) => Promise<void>;
    load: () => Promise<void>;
}

const initialState = {
    isLoggedIn: false,
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    created_at: new Date(),
};

export const useUser = create<UserState>()((set) => ({
    ...initialState,
    async logIn(email, password) {
        if (!email || !password) {
            throw new Error("Email i hasło nie mogą być puste");
        }
        const user: GetUserResponse = await fetchApi(
            "/user/login",
            { email, password },
            { method: "POST" }
        );
        set({
            isLoggedIn: true,
            id: user._id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
        });
    },
    async logOut() {
        await fetchApi("/user/logout", undefined, { method: "DELETE" });
        set(initialState);
    },
    async register(user) {
        if (!user.email || !user.firstName || !user.lastName || !user.birthDate || !user.password) {
            throw new Error("Wszystkie pola muszą być wypełnione!");
        }

        const userRes: GetUserResponse = await fetchApi(
            "/user/register",
            {
                email: user.email,
                password: user.password,
                first_name: user.firstName,
                last_name: user.lastName,
                birth_date: new Date(user.birthDate),
            },
            {
                method: "POST",
            }
        );
        set({
            isLoggedIn: true,
            id: userRes._id,
            username: userRes.username,
            firstName: userRes.first_name,
            lastName: userRes.last_name,
            email: user.email,
        });
    },
    async load() {
        let user: GetUserResponse;
        try {
            user = await fetchApi("/user");
        } catch (_) {
            set(initialState);
            return;
        }
        set({
            isLoggedIn: true,
            id: user._id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            created_at: user.created_at,
        });
    },
}));
