import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import LoginForm from "user/ui/LoginForm";
import useAuthRedirect from "user/hooks/useAuthRedirect";

const Login: NextPage = () => {
    useAuthRedirect({ redirectWhen: "authorized" });
    return (
        <>
            <Head>
                <title>Zaloguj się | HelpSpace</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <LoginForm />
        </>
    );
};

export default Login;
