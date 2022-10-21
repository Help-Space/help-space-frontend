import { fetchApi } from "shared/api/fetchApi";
import { GetUserResponse, RegisterUserRequest } from "user/types/api";
import create from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    isLoggedIn: boolean;
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    register: (user: RegisterUserRequest) => void;
    load: () => void;
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
                });
            },
            async logOut() {
                await fetchApi("/user/logout", undefined, { method: "DELETE" });
                set(initialState);
            },
            async register(user) {
                if (!user.email || !user.firstName || !user.lastName || !user.password) {
                    throw new Error("Wszystkie pola muszą być wypełnione!");
                }
                const userRes: GetUserResponse = await fetchApi("/user/register", user, {
                    method: "POST",
                });
                set({
                    isLoggedIn: true,
                    id: userRes._id,
                    username: userRes.username,
                    firstName: userRes.first_name,
                    lastName: userRes.last_name,
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
                });
            },
        }),
        { name: "user-storage" }
    )
);
