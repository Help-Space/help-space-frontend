import { postApi } from "post/api";
import PostsWithPagination from "post/layout/WithPagination";

export default function FavouritesPage() {
    return <PostsWithPagination getPosts={postApi.getLiked} />;
}
