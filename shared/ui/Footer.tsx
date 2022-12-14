import Link from "next/link"

export default function Footer() {
    return (
        <div className="bg-primaryPink">
            <div className="max-w-[1720px] mx-auto flex gap-[120px] px-[5rem] py-[3rem] pb-32 font-quicksand text-white xl:flex-col xl:gap-[50px] md:px-[2rem] md:pb-18">
                <div className="flex flex-col gap-5">
                    <img src="/helpspace_logo_footer.svg" alt="logo" className="w-[300px]" />
                    <span className="font-[300] text-base w-[350px] xl:w-[100%] sm:text-[15px]">
                        Dzięki HelpSpace możesz szybko i łatwo znaleźć pomoc w swojej okolicy. Pomóż innym, a inni pomogą Tobie.
                    </span>
                    <div className="flex gap-5 sm:gap-8">
                        <Link href="https://github.com/Help-Space"><img src="/github_icon.svg" alt="github" className="cursor-pointer" /></Link>
                        <Link href="https://twitter.com/Help-Space"><img src="/twitter_icon.svg" alt="github" className="cursor-pointer" /></Link>
                    </div>
                </div>
                <div className="flex flex-wrap gap-[150px] pt-[25px] md:gap-[50px]  sm:text-[15px]">
                    <div>
                        <div className="relative">
                            <span className="font-bold">STRONA GŁÓWNA</span>
                            <div className="h-[2px] w-[30px] bg-white absolute -bottom-[5px] left-0 rounded-[20px]"></div>
                        </div>
                        <ul className=" text-white pt-5 font-[300]">
                            <li><Link href="/">Strona główna</Link></li>
                            <li><Link href="https://documenter.getpostman.com/view/18056614/2s84DssfhU">Dokumentacja API</Link></li>
                            <li><Link href="/about">Informacje</Link></li>
                        </ul>
                    </div>
                    <div>
                        <div className="relative">
                            <span className="font-bold">OGŁOSZENIA</span>
                            <div className="h-[2px] w-[30px] bg-white absolute -bottom-[5px] left-0 rounded-[20px]"></div>
                        </div>
                        <ul className="text-white pt-5 font-[300]">
                            <li><Link href="/">Ogłoszenia</Link></li>
                            <li><Link href="/favourite">Polubienia</Link></li>
                            <li><Link href="/post/create">Dodaj ogłoszenie</Link></li>
                        </ul>
                    </div>
                    <div>
                        <div className="relative">
                            <span className="font-[600]">PROFIL</span>
                            <div className="h-[2px] w-[30px] bg-white absolute -bottom-[5px] left-0 rounded-[20px]"></div>
                        </div>
                        <ul className="text-white pt-5 font-[300]">
                            <li><Link href="/profile">Twój profil</Link></li>
                            <li><Link href="/conversations">Wiadomości</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}