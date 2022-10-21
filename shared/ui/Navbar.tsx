import { Navbar as NextNavbar } from "@nextui-org/react";
import Link from "next/link";

export default function Navbar() {
    return (
        <NextNavbar shouldHideOnScroll>
            <NextNavbar.Brand>
                <Link href="/">
                    <div>
                        <img src="/helpspace_logo.svg" alt="logo" className="cursor-pointer xs:hidden" />
                        <img src="/helpspace_logo_icon2.svg" alt="logo" className="cursor-pointer hidden xs:block w-[30px]" />
                    </div>
                </Link>
            </NextNavbar.Brand>

            <NextNavbar.Content>
                <Link href="/login">
                    Zaloguj się
                </Link> 
            </NextNavbar.Content>
            
        </NextNavbar>
    );
}



