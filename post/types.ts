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
    lastRefresh: Date;
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
    last_refresh: Date;
}
