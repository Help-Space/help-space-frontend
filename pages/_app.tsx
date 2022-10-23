import { NextUIProvider, createTheme } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useUser } from "user/store/useUser";
import "../styles/style.css";
import Navbar from "shared/ui/Navbar";
import Footer from "shared/ui/Footer";
import FullPageLoading from "shared/ui/FullPageLoading";

function MyApp({ Component, pageProps }: AppProps) {
    const loadUser = useUser((state) => state.load);
    const isLoading = useUser((state) => state.isLoading);

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NextUIProvider>
            <Navbar />
            {isLoading ? <FullPageLoading /> : <Component {...pageProps} />}
            <Footer />
        </NextUIProvider>
    );
}

export default MyApp;
