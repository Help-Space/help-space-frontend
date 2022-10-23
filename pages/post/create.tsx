import type { NextPage } from "next";
import Head from "next/head";
import CreatePostForm from "../../post/ui/CreatePostForm";

function DescriptionCreatePost() {
    return (
        <div className="flex flex-col gap-5  justify-center items-center">
            <span className="text-[32px] font-[700] sm:text-[28px]">Dodaj ogłoszenie!</span>
            <span className="text-center sm:text-[15px]">Lorem Ipsum is simply dummy text of the printing and printer. Lorem Ipsum is simply dummy text of the printing and printer. Lorem Ipsum is simply dummy text of the printing and printer.</span>
        </div>
    );
}

const CreatePost: NextPage = () => {
    return (
        <>
            <Head>
                <title>HelpSpace | Dodaj ogłoszenia</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main className="max-w-[1320px] mx-auto">
                <div className=" flex flex-col gap-[7rem] items-center px-[25%] pt-[4rem] pb-[8rem] xl:px-[15%] md:px-[10%] sm:pt-[2rem] sm:gap-[5rem] sm:pb-[5rem] sm:px-[5%]">
                    <DescriptionCreatePost />
                    <CreatePostForm />
                </div>
            </main>
        </>
    );
};

export default CreatePost;
