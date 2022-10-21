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
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <RegisterForm />
        </>
    );
};

export default Register;