import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import LoginForm from "shared/ui/LoginPage/LoginForm";

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Zaloguj się | HelpSpace</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />

            </Head> 
            <LoginForm />
        </>
    );
}
 
export default Login;

