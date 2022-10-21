import { postApi } from "post/api";
import { Post } from "post/types";
import { useState } from "react";

interface UsePostsProps {
    getPosts: (page: number) => void;
}

export default function usePosts({ getPosts }: UsePostsProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);

    const changePage = () => {
        getPosts(page);
    };
}
