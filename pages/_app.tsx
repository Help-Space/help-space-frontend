import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useUser } from "user/store/useUser";

function MyApp({ Component, pageProps }: AppProps) {
    const loadUser = useUser((state) => state.load);

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NextUIProvider>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}

export default MyApp;
