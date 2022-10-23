import { Container, Input, Loading, Pagination, Button } from "@nextui-org/react";
import Link from "next/link";
import { Post, Posts } from "post/types";
import PostList from "post/ui/List";
import { useEffect, useState } from "react";
import FullPageLoading from "../../shared/ui/FullPageLoading";
import { useUser } from "user/store/useUser";
import { useRouter } from "next/router";

interface PostsWithPaginationProps {
    getPosts: (page: number, filterBy: string) => Promise<Posts>;
}

export default function PostsWithPagination({ getPosts }: PostsWithPaginationProps) {
    const { id: userId, isLoggedIn } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filterBy, setFilterBy] = useState<"opened" | "ended">("opened");

    const refreshPosts = async () => {
        setIsLoading(true);
        let newPosts;
        try {
            newPosts = await getPosts(page, filterBy);
        } catch (err) {
            setError((err as Error).message);
            return;
        } finally {
            setIsLoading(false);
        }
        setPosts(newPosts.posts);
        setTotalPages(newPosts.pages);
    };

    useEffect(() => {
        refreshPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterBy, page]);

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
        <div className="max-w-[1320px] mx-auto xxl:min-h-auto overflow-auto">
            <div className="flex py-10 md:flex-col">
                <div className=" w-1/3 pb-10 flex justify-end md:justify-center md:w-full">
                    <div className="flex flex-col gap-5 h-full">
                        <div className="flex justify-between gap-3 pb-[3rem] relative sm:pb-[2rem]">
                            <div className="absolute">
                                <button
                                    className={`p-2  border-primaryPink ease-in-out duration-[80ms] ${
                                        filterBy === "opened" &&
                                        "border-primaryPink border-b-[4px] text-primaryPink"
                                    } hover:border-primaryPink hover:border-b-[4px] hover:text-primaryPink`}
                                    onClick={() => setFilterBy("opened")}
                                >
                                    Aktywne
                                </button>
                                <button
                                    className={`absolute p-2 left-[6.5rem] border-primaryPink border-0 ease-in-out duration-[80ms] ${
                                        filterBy === "ended" &&
                                        "border-primaryPink border-b-[4px] text-primaryPink"
                                    } hover:border-primaryPink hover:border-b-[4px] hover:text-primaryPink`}
                                    onClick={() => setFilterBy("ended")}
                                >
                                    Zakończone
                                </button>
                            </div>
                        </div>
                        <Input size="xl" clearable labelPlaceholder="Wyszukaj..." />
                        {isLoggedIn && (
                            <Link href="/post/create">
                                <button className="py-2 rounded-[10px] transition ease-in-out delay-50 bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink focus:text-white">
                                    Dodaj ogłoszenie
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="w-2/3 md:w-full">
                    <Container css={{ display: "flex", justifyContent: "center", gap: "$10" }}>
                        <PostList posts={posts} refreshPosts={refreshPosts} />
                        {posts.length > 0 && (
                            <Pagination
                                page={page}
                                total={totalPages}
                                onChange={(newPage) => setPage(newPage)}
                                color="error"
                            />
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
}
