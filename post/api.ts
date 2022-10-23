import { fetchApi } from "shared/api/fetchApi";
import { Post, PostResponse, Posts, PostsResponse } from "./types";

const convertApiPost = (postRes: PostResponse) => {
    const post: Post = {
        id: postRes._id,
        author: {
            id: postRes.author._id,
            firstName: postRes.author.first_name,
            lastName: postRes.author.last_name,
        },
        isOpen: postRes.is_open,
        title: postRes.title,
        content: postRes.content,
        lastRefresh: postRes.last_refresh,
        liked: postRes.liked,
    };
    return post;
};

const get = async (id: string) => {
    const postRes: PostResponse = await fetchApi(`/post/${id}`);
    return convertApiPost(postRes);
};

const add = async (title: string, content: string) => {
    if (!title || !content) throw new Error("Tytuł i hasło muszą być wypełnione!");
    const postRes: PostResponse = await fetchApi(`/post`, { title, content }, { method: "POST" });
    return convertApiPost(postRes);
};

const update = async (id: string, title: string, content: string, isOpen: boolean) => {
    if (!title || !content) throw new Error("Tytuł i hasło muszą być wypełnione!");
    return await fetchApi(`/post/${id}`, { title, content, isOpen }, { method: "PATCH" });
};

const refresh = async (id: string) => {
    return await fetchApi(`/post/${id}/refresh`, undefined, { method: "PATCH" });
};

const addLike = async (id: string) => {
    return await fetchApi(`/post/${id}/like`, undefined, { method: "POST" });
};

const removeLike = async (id: string) => {
    return await fetchApi(`/post/${id}/like`, undefined, { method: "DELETE" });
};

const remove = async (id: string) => {
    return await fetchApi(`/post/${id}`, undefined, { method: "DELETE" });
};

const getPosts = async (path: string): Promise<Posts> => {
    const postsRes: PostsResponse = await fetchApi(path);
    const convertedPosts = postsRes.posts.map((post) => convertApiPost(post));
    return { pages: postsRes.pages, posts: convertedPosts };
};

const getByPage = async (page: number) => {
    return await getPosts(`/posts?page=${page}`);
};

const getByAuthor = async (authorId: string, page: number) => {
    return await getPosts(`/posts?page=${page}&authorId=${authorId}`);
};

const getLiked = async (page: number) => {
    return await getPosts(`/posts/liked?page=${page}`);
};

export const postApi = {
    get,
    add,
    update,
    refresh,
    addLike,
    removeLike,
    remove,
    getByPage,
    getByAuthor,
    getLiked,
};
