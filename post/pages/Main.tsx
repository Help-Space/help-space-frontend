import { postApi } from "post/api";
import PostsWithPagination from "post/layout/WithPagination";

export default function MainPage() {
    return <PostsWithPagination getPosts={postApi.getByPage} />;
}
