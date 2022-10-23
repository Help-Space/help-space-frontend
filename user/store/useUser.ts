import { fetchApi } from "shared/api/fetchApi";
import { GetUserResponse, RegisterUserRequest } from "user/types/api";
import create from "zustand";

interface UserState {
    isLoading: boolean;
    isLoggedIn: boolean;
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    created_at: string;
    logIn: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    register: (user: RegisterUserRequest) => Promise<void>;
    load: () => Promise<void>;
}

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    created_at: "",
};

export const useUser = create<UserState>()((set) => ({
    ...initialState,
    isLoading: true,
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

        try {
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
        } catch (errors:any) {
            throw new Error(errors[0].msg);
        }
    },
    async load() {
        set({ isLoading: true });
        let user: GetUserResponse;
        try {
            user = await fetchApi("/user");
        } catch (_) {
            set(initialState);
            return;
        }
        set({
            isLoading: false,
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
