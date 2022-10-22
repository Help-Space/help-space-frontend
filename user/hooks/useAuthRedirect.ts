import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "user/store/useUser";

interface UseAuthRedirectProps {
    redirectWhen: "authorized" | "unathorized";
    redirectPath?: string;
}

export default function useAuthRedirect({
    redirectWhen,
    redirectPath = "/",
}: UseAuthRedirectProps) {
    const router = useRouter();
    const isLoggedIn = useUser((state) => state.isLoggedIn);

    useEffect(() => {
        if (
            (redirectWhen === "authorized" && isLoggedIn) ||
            (redirectWhen === "unathorized" && !isLoggedIn)
        ) {
            router.push(redirectPath);
        }
    }, [isLoggedIn]);
}
