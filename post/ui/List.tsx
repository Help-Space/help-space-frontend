import { Container, Text, Spacer } from "@nextui-org/react";
import { Post, Posts } from "post/types";
import { useEffect, useState } from "react";
import PostCard from "./Card";

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <Container className="flex flex-col items-center">
            {posts.length === 0 && <Text>Theres no posts!</Text>}
            {posts.map((post) => {
                return <><PostCard key={post.id} {...post} /> <Spacer y={2}/></>;
            })}
        </Container>
    );
}
