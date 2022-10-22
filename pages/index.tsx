import type { NextPage } from "next";
import Head from "next/head";
import MainPage from "post/pages/MainPage";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>HelpSpace | Strona Główna</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main className="max-w-[1320px] mx-auto">
                <MainPage />
            </main>
        </>
    );
};

export default Home;
