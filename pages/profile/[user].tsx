import type { NextPage } from "next";
import Head from "next/head";
import { Button, Link, Loading, Navbar } from "@nextui-org/react";
import { default as NextLink } from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchApi } from "shared/api/fetchApi";
import { GetUserResponse } from "user/types/api";
import PostsWithPagination from "post/layout/WithPaginationForProfile";
import { postApi } from "post/api";
import FullPageLoading from "../../shared/ui/FullPageLoading";

function UserBaner() {
    const router = useRouter();
    const [user, setUser] = useState<GetUserResponse>();
    const [isLoading, setIsLoading] = useState(true);

    const formatUser = (firstName = "", lastName = "") =>
        (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();

    const getProfile = async (id: string) => {
        try {
            const user: GetUserResponse = await fetchApi("/user/" + id);
            setUser(user);
            setIsLoading(false);
        } catch (err) {
            router.push("/");
        }
    };

    useEffect(() => {
        if (!router.isReady) return;
        getProfile(router.query.user as string);
    }, [router.isReady]);

    if (isLoading) {
        return <FullPageLoading />;
    }

    return (
        <div className="relative">
            <div className="bg-gradient-to-r from-[#FF6969] to-[#FF4747] relative overflow-hidden py-[120px] lg:py-[80px] sm:py-[65px] xs:py-[50px]">
                <img
                    src="/lines3.svg"
                    alt="lines"
                    className="right-0 -bottom-5 absolute md:scale-50 md:opacity-30 md:-bottom-[4rem] md:-right-[3rem]"
                />
            </div>
            <div className="mx-auto max-w-[2320px] absolute -bottom-20 px-[10%] lg:-bottom-10  md:px-[5rem] sm:px-[5%] xs:-bottom-5 xs:px-[8%]">
                <div className="flex gap-20 lg:gap-10 sm:gap-3">
                    <div className="grid place-items-center w-[250px] h-[250px] bg-[#FF8787] rounded-full border-white border-4 lg:w-[150px] lg:h-[150px] xs:w-[100px] xs:h-[100px] ">
                        <span className="text-white font-600 text-[60px] lg:text-[40px] sm:text-[30px]">
                            {formatUser(user?.first_name, user?.last_name)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 text-white pt-10 lg:pt-5 xs:pt-2 xs:gap-1">
                        <span className="font-[700] text-[32px] lg:text-[25px] xs:text-[20px]">
                            {`${user?.first_name} ${user?.last_name}`}
                        </span>
                        <div className="flex gap-2 font-[300] text-[18px] lg:text-[16px] xs:text-[12px] xs:flex-col xs:gap-0">
                            <span>
                                Data dołączenia:{" "}
                                {user?.created_at && new Date(user.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Profile: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>HelpSpace | Ogłoszenia</title>
                <link rel="icon" href="/helpspace_logo_icon.svg" />
            </Head>
            <main>
                <UserBaner />

                <div className="pt-[5rem] md:pt-[2rem]">
                    {router.isReady && (
                        <PostsWithPagination
                        getPosts={(page: number) =>
                                postApi.getByAuthor(router.query.user as string, page)
                            }
                        />
                    )}
                </div>
            </main>
        </>
    );
};

export default Profile;
