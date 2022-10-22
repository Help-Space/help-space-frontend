import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import RegisterForm from "user/ui/RegisterForm";
import useAuthRedirect from "user/hooks/useAuthRedirect";

const Register: NextPage = () => {
    useAuthRedirect({ redirectWhen: "authorized" });
    return (
        <>
            <Head>
                <title>Zarejestruj się | HelpSpace</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <RegisterForm />
        </>
    );
};

export default Register;
