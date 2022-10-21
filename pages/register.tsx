import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import RegisterForm from "shared/ui/RegisterPage/RegisterForm";

const Register: NextPage = () => {
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