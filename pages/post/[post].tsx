import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {Post} from "../../post/types";
import FullPageLoading from "../../shared/ui/FullPageLoading";
import PostCard from "../../post/ui/Card";
import {postApi} from "../../post/api";

const PostPage: NextPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        setIsLoading(true);
        if (router.isReady) {
            (async () => {
                let newPost;
                try {
                    newPost = await postApi.get(router.query.post as string);
                } catch (err) {
                    setError((err as Error).message);
                    return;
                } finally {
                    setIsLoading(false);
                }
                setPost(newPost);
            })();
        }
    }, [router.isReady]);

    if (error) {
        return (
            <div className="flex flex-col gap-4 items-center min-h-screen py-[100px] md:min-h-[auto] ">
                <span className="text-[350px] opacity-10 font-[700] text-primaryPink md:text-[150px]">
                    5<span className="text-mediumDark">0</span>0
                </span>
                <span className="text-lightDark text-[40px] font-[700]">{error}</span>
            </div>
        );
    }

    if (isLoading) {
        return <FullPageLoading />;
    }

    return (
        <>
            <Head>
                <title>HelpSpace | Ogłoszenie</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main className="bg-[#F4F4F4]">
                <div className="max-w-[2320px] mx-auto py-[8rem] px-[10%] sm:px-[5%] sm:py-[4rem] lg:py-[6rem]">
                    {post && (
                        <PostCard {...post} />
                    )}
                </div>

            </main>
        </>
    );
};

export default PostPage;
