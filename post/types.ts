export interface Author {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Post {
    id: string;
    author: Author;
    isOpen: boolean;
    title: string;
    content: string;
    lastRefresh: string;
    liked: boolean;
}

export interface Posts {
    posts: Post[];
    pages: number;
}

export interface AuthorResponse {
    _id: string;
    first_name: string;
    last_name: string;
}

export interface PostResponse {
    _id: string;
    author: AuthorResponse;
    is_open: boolean;
    title: string;
    content: string;
    last_refresh: string;
    liked: boolean;
}

export interface PostsResponse {
    posts: PostResponse[];
    pages: number;
}
