import type { NextPage } from "next";
import Head from "next/head";
import MainPage from "post/pages/Main";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>HelpSpace | Strona Główna</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main className="max-w-[1320px] mx-auto min-h-[70vh]">
                <MainPage />
            </main>
        </>
    );
};

export default Home;
