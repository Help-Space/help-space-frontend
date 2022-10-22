import type { NextPage } from "next";
import Head from "next/head";
import MainPage from "chat/pages/MainPage";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>HelpSpace | Konwersacje</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main className="max-w-[1320px] mx-auto">
                <MainPage />
            </main>
        </>
    );
};

export default Home;
