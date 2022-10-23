import { Container, Text, Spacer } from "@nextui-org/react";
import { Post, Posts } from "post/types";
import { Fragment, useEffect, useState } from "react";
import PostCard from "./Card";

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <Container className="flex flex-col items-center">
            {posts.length === 0 && <div className=" py-[10rem] lg:py-[5rem] sm:py-[3rem] text-center"><span className="font-[700] text-[32px] sm:text-[25px] text-mediumDark text-center">Nie ma jeszcze żadnych ogłoszeń</span></div>}
            {posts.map((post) => {
                return (
                    <Fragment key={post.id}>
                        <PostCard {...post} />
                        <Spacer y={2} />
                    </Fragment>
                );
            })}
        </Container>
    );
}
