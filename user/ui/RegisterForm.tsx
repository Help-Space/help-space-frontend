import React from "react";
import Head from "next/head";
import { Text } from "@nextui-org/react";
import { Button, Input, useInput} from "@nextui-org/react";
import Link from "next/link";

export default function RegisterForm() {
    const { value, reset, bindings } = useInput("");
  
    const validateEmail = (value: string) => {
        return value.match(/[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    };

    const helper = React.useMemo(() => {
        if (!value)
        return {
            text: "",
            color: "",
        };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "Poprawny email" : "Błędny adres email",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    return (
        <>
            <Head>
                <title>Zarejestruj się | HelpSpace</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main className="flex w-[100%] font-quicksand text-mediumDark xxxl:min-h-screen xxl:min-h-0">
                <div className="flex w-1/2 ml-auto lg:w-[100%]">
                    <div className="flex flex-col items-center gap-[60px] py-[80px] ml-auto mr-[250px] xxl:mr-auto md:py-[40px] md:px-[5%]">
                        <div className="flex flex-col items-center gap-3">
                            <img src="helpspace_logo_circles.svg" alt="img" className="sm:w-[60px]" />
                            <Text b size="$3xl" className="font-quicksand font-[700]">Załóż konto!</Text>
                            <Text className="font-quicksand text-center text-lightDark tracking-[1px] leading-[22px]">Lorem Ipsum is simply dummy text<br /> of the printing and printer.</Text>
                        </div>
                        <div className="flex flex-col gap-[40px] py-[30px]">
                            <div className="flex gap-8 md:flex-col">
                                <Input
                                    clearable
                                    type="text"
                                    underlined
                                    labelPlaceholder="Imie"
                                    css={{ width: '100%'}}
                                />
                                <Input
                                    clearable
                                    type="text"
                                    underlined
                                    labelPlaceholder="Nazwisko"
                                    css={{ width: '100%'}}
                                />
                            </div>
                            <div className="flex gap-[40px] md:flex-col">
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
                                    css={{ width: '100%'}}
                                />
                                <Input
                                    underlined
                                    type="date"
                                    placeholder="Data urodzenia"
                                    css={{ width: '100%'}}
                                />
                            </div>
                            <Input.Password
                                    clearable
                                    underlined
                                    type="password"
                                    placeholder="Hasło"
                                    css={{ width: '100%'}}
                                />
                            <Input.Password
                                clearable
                                underlined
                                type="password"
                                placeholder="Potwierdź hasło"
                                css={{ width: '100%'}}
                            />
                        </div>
                        <div>
                            <Button className="bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink]">Zarejestruj się</Button>
                        </div>
                        <Link href="/login" className="text-mediumDark ">
                            <Text className="cursor-pointer">Masz już konto? <Text b className="text-primaryPink">Zaloguj się!</Text></Text>
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
};
