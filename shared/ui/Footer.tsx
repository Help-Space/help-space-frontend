export default function Footer() {
    return (
        <div className="flex gap-[120px] bg-primaryPink px-[5rem] py-[3rem] pb-32 font-quicksand text-white xl:flex-col xl:gap-[50px] md:px-[2rem] md:pb-18">
            <div className="flex flex-col gap-5">
                <img src="/helpspace_logo_footer.svg" alt="logo" className="w-[300px]" />
                <span className="font-[300] text-base w-[350px] xl:w-[100%] sm:text-[15px]">
                    Lorem Ipsum is simply dummy text of the printing and printer took a galley of type and scrambled it to.
                </span>
                <div className="flex gap-5 sm:gap-8">
                    <img src="/github_icon.svg" alt="github" className="cursor-pointer" />
                    <img src="/twitter_icon.svg" alt="github" className="cursor-pointer" />
                </div>

            </div>
            <div className="flex flex-wrap gap-[150px] pt-[25px] md:gap-[50px]  sm:text-[15px]">
                <div>
                    <div className="relative">
                        <span className="font-bold">STRONA GŁÓWNA</span>
                        <div className="h-[2px] w-[30px] bg-white absolute -bottom-[5px] left-0 rounded-[20px]"></div>
                    </div>
                    <ul className=" text-white pt-5 font-[300]">
                        <li>Strona główna</li>
                        <li>Ogłoszenia</li>
                        <li>Informacje</li>
                        <li>Wydarzenia</li>
                    </ul>
                </div>
                <div>
                    <div className="relative">
                        <span className="font-bold">OGŁOSZENIA</span>
                        <div className="h-[2px] w-[30px] bg-white absolute -bottom-[5px] left-0 rounded-[20px]"></div>
                    </div>
                    <ul className="text-white pt-5 font-[300]">
                        <li>Ogłoszenia</li>
                        <li>Polubienia</li>
                        <li>Dodaj ogłoszenie</li>
                    </ul>
                </div>
                <div>
                    <div className="relative">
                        <span className="font-[600]">PROFIL</span>
                        <div className="h-[2px] w-[30px] bg-white absolute -bottom-[5px] left-0 rounded-[20px]"></div>
                    </div>
                    <ul className="text-white pt-5 font-[300]">
                        <li>Twój profil</li>
                        <li>Wiadomości</li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}