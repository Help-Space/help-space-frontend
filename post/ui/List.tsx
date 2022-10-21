import { Container, Text } from "@nextui-org/react";
import { Post, Posts } from "post/types";
import { useEffect, useState } from "react";
import PostCard from "./Card";

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <Container>
            {posts.length === 0 && <Text>Theres no posts!</Text>}
            {posts.map((post) => {
                return <PostCard key={post.id} {...post} />;
            })}
        </Container>
    );
}
