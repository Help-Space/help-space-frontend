import { NextUIProvider, createTheme } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useUser } from "user/store/useUser";
import '../styles/style.css';
import Navbar from "shared/ui/Navbar";
import Footer from "shared/ui/Footer";

function MyApp({ Component, pageProps }: AppProps) {
    const loadUser = useUser((state) => state.load);

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NextUIProvider>
            <Navbar />
            <div className="max-w-[1320px] mx-auto">
                <Component {...pageProps} />
            </div>
            <Footer />
        </NextUIProvider>
    );
}

export default MyApp;
