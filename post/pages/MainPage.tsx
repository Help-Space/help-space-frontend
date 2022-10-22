import { Container, Loading, Pagination, Text } from "@nextui-org/react";
import { postApi } from "post/api";
import { Post } from "post/types";
import PostList from "post/ui/List";
import { useEffect, useState } from "react";

export default function MainPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            let newPosts;
            try {
                newPosts = await postApi.getByPage(page);
            } catch (err) {
                setError((err as Error).message);
                return;
            } finally {
                setIsLoading(false);
            }
            setPosts(newPosts.posts);
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
        return <Loading />;
    }

    return (
        <Container css={{ display: "flex", justifyContent: "center", gap: "$10" }}>
            <PostList posts={posts} />
            <Pagination page={page} total={totalPages} onChange={(newPage) => setPage(newPage)} />
        </Container>
    );
}
