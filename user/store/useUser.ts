import { fetchApi } from "shared/api/fetchApi";
import { GetUserResponse } from "user/types/api";
import create from "zustand";
import { persist } from "zustand/middleware";

interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface UserState {
    isLoggedIn: boolean;
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    register: (user: RegisterUser) => void;
    get: () => void;
}

const initialState = {
    isLoggedIn: false,
    id: "",
    username: "",
    firstName: "",
    lastName: "",
};

export const useUser = create<UserState>()(
    persist(
        (set) => ({
            ...initialState,
            async logIn(email, password) {
                if (!email || !password) {
                    throw new Error("Email i hasło nie mogą być puste");
                }
                await fetchApi("/user/login", { email, password }, { method: "POST" });
            },
            async logOut() {
                await fetchApi("/user/logout", undefined, { method: "DELETE" });
                set(initialState);
            },
            async register(user) {
                await fetchApi("/user/register", user, { method: "POST" });
            },
            async get() {
                const user: GetUserResponse = await fetchApi("/user");
                set({
                    isLoggedIn: true,
                    id: user._id,
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                });
            },
        }),
        { name: "user-storage" }
    )
);
