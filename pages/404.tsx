import type { NextPage } from "next";
import { Button } from "@nextui-org/react";
import Link from 'next/link'
import Head from "next/head";

function ErrorPage() {
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen py-[100px] md:min-h-[auto] ">
        <span className="text-[350px] opacity-10 font-[700] text-primaryPink md:text-[150px]">4<span className="text-mediumDark">0</span>4</span>
        <span className="text-lightDark text-[40px] font-[700]">Nie ma takiej strony</span>
        <Button className="bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink">
            <Link href="/">
                Wróć do strony głównej
            </Link>
        </Button>
    </div>
  );
}

const FourOhFour: NextPage = () => {
  return (
    <>
      <Head>
          <title>HelpSpace | Nie ma takiej strony</title>
          <link rel="icon" href="/helpspace_logo_icon.svg" />
      </Head>
      <main className="max-w-[1320px] mx-auto">
        <ErrorPage />
      </main>
    </>
  )
}

export default FourOhFour;