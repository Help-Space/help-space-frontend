
import type { NextPage } from "next";
import Head from "next/head";
import MainPage from "post/pages/Main";

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>HelpSpace | About</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main className="max-w-[1320px] mx-auto">
                <MainPage />
            </main>
        </>
    );
};

export default About;
