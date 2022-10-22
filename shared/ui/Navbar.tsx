import Link from "next/link";
import { Navbar as NextNavbar } from "@nextui-org/react";
import { Dropdown, Avatar, Text, Grid } from "@nextui-org/react";
import { useUser } from "user/store/useUser";

function DropdownPanel() {
    const { logOut, firstName, lastName, email } = useUser();

    const formatUser = (firstName: string, lastName: string) => (
        (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase()
    )

    return (
        <>
            <Link href="/favorite">
                <img src="/favorite_icon.svg" alt="favorite" className="w-[28px] cursor-pointer  sm:hidden" />
            </Link> 
            <Link href="/chat">
                <img src="/chat_icon.svg" alt="chat" className="w-[28px] cursor-pointer sm:hidden" />
            </Link> 
            <Grid.Container justify="flex-start">
                <Grid>
                    <Dropdown placement="bottom-left">
                        <Dropdown.Trigger>
                            <Avatar
                                size="lg"
                                text={formatUser(firstName, lastName)}
                            />
                        </Dropdown.Trigger>
                        <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
                            <Dropdown.Item key="user" css={{ height: "$18" }}>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Zalogowany jako
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    {email}
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="profile" withDivider>
                                <Link href="/">
                                    Twój profil
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item key="new" withDivider>
                                <Link href="/post/create">
                                    Dodaj ogłoszenie
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item key="favorite">
                                <Link href="/">
                                    Polubione
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item key="chat">
                                <Link href="/">
                                    Wiadomości
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item key="rules" withDivider>
                                Regluamin
                            </Dropdown.Item>
                            <Dropdown.Item key="logout" color="error">
                                <div onClick={logOut}>
                                    Wyloguj się
                                </div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid>
            </Grid.Container>
        </>
    );
}

export default function Navbar() {
    const isLoggedIn = useUser((state) => state.isLoggedIn) 

    return (
        <NextNavbar variant="sticky" maxWidth="fluid">
                <NextNavbar.Brand className="pl-[6rem] md:pl-[3rem] sm:pl-[1rem]">
                    <Link href="/">
                        <div>
                            <Link href="/" >
                                <img src="/helpspace_logo.svg" alt="logo" className="cursor-pointer xs:hidden" />
                            </Link>
                            <Link href="/" >
                                <img src="/helpspace_logo_icon2.svg" alt="logo" className="cursor-pointer hidden xs:block w-[30px]" />
                            </Link>
                        </div>
                    </Link>
                </NextNavbar.Brand>
                <NextNavbar.Content className="pr-[6rem] md:pr-[3rem] sm:pr-[1rem]">
                    { isLoggedIn ? <DropdownPanel /> : <Link href="/login">Zaloguj się</Link> }
                </NextNavbar.Content>
        </NextNavbar>
    );
}