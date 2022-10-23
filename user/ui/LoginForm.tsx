import React, { useState } from "react";
import Head from "next/head";
import { Button, Input, useInput, Text } from "@nextui-org/react";
import Link from "next/link";
import { useUser } from "user/store/useUser";

export default function LoginForm() {
    const logIn = useUser((state) => state.logIn);
    const { value, reset, bindings } = useInput("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);

    const validateEmail = (value: string) => {
        return value.match(
            /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        );
    };

    const helper = React.useMemo((): { text: string; color: "default" | "success" | "error" } => {
        if (!value)
            return {
                text: "",
                color: "default",
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "" : "Błędny adres email",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    const sendForm = async () => {
        try {
            await logIn(value, password);
        } catch (err) {
            setError("Dane są niepoprawne");
        }
    };

    return (
        <>
            <Head>
                <title>Zaloguj się | HelpSpace</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main className="flex w-[100%] font-quicksand text-mediumDark xxxl:min-h-screen xxl:min-h-0">
                <div className="flex w-1/2 ml-auto lg:w-[100%]">
                    <div className="flex flex-col items-center gap-[60px] ml-auto mr-[250px] xxl:mr-auto py-[70px] md:py-[40px] md:px-[5%]">
                        <div className="flex flex-col items-center gap-3">
                            <img
                                src="helpspace_logo_circles.svg"
                                alt="img"
                                className="sm:w-[60px]"
                            />
                            <Text b size="$3xl" className="font-quicksand font-[700]">
                                Zaloguj się!
                            </Text>
                            <span className="font-quicksand text-center text-lightDark tracking-[1px] leading-[22px]">
                                Zyskaj dostęp do wszystkich funkcjonalności<br/> naszej aplikacji!
                            </span>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="flex flex-col gap-5">
                                <Input
                                    clearable
                                    {...bindings}
                                    type="email"
                                    underlined
                                    labelPlaceholder="Email"
                                    shadow={false}
                                    onClearClick={reset}
                                    status={helper.color}
                                    color={helper.color}
                                    helperColor={helper.color}
                                    helperText={helper.text}
                                />
                                <Input.Password
                                    value={password}
                                    clearable
                                    underlined
                                    type="password"
                                    placeholder="Hasło"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="whitespace-pre-line text-center absolute -bottom-10 text-primaryPink">{error}</p>}
                        </div>
                        <div>
                            <Button
                                className="bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white  focus:bg-primaryPink focus:text-white"
                                onClick={sendForm}
                            >
                                Zaloguj się
                            </Button>
                        </div>
                        <Link href="/register" className="text-mediumDark">
                            <Text className="cursor-pointer">
                                Nie masz jeszcze konta?{" "}
                                <Text b className="text-primaryPink">
                                    Zarejestruj się!
                                </Text>
                            </Text>
                        </Link>
                    </div>
                </div>
                <div className="flex w-1/2 ml-auto bg-primaryPink relative overflow-hidden lg:hidden">
                    <img src="lines.svg" alt="img" className="absolute -left-[10px] -top-[10px]" />
                    <div className="flex mr-auto ml-[250px] xxl:ml-auto">
                        <div className="grid place-items-center">
                            <img src="helpspace_logo_background.svg" alt="img" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
