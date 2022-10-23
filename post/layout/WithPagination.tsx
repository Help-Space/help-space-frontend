import { Container, Loading, Pagination } from "@nextui-org/react";
import { Post, Posts } from "post/types";
import PostList from "post/ui/List";
import { useEffect, useState } from "react";
import FullPageLoading from "../../shared/ui/FullPageLoading";

interface PostsWithPaginationProps {
    getPosts: (page: number) => Promise<Posts>;
    withClosed?: boolean;
}

export default function PostsWithPagination({ getPosts, withClosed }: PostsWithPaginationProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            let newPosts;
            try {
                newPosts = await getPosts(page);
            } catch (err) {
                setError((err as Error).message);
                return;
            } finally {
                setIsLoading(false);
            }
            if (withClosed) {
                setPosts(newPosts.posts);
            } else {
                setPosts(newPosts.posts.filter((post) => post.isOpen));
            }
            setTotalPages(newPosts.pages);
        })();
    }, [page]);

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
        <div className="max-w-[1320px] mx-auto xxl:min-h-auto">
            <Container
                className="w-2/3 md:w-full"
                css={{ display: "flex", justifyContent: "center", gap: "$10", marginBlock: "$15"}}
            >
                <PostList posts={posts} />
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
    );
}
