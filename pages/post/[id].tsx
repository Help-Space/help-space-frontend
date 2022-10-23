import { Button, Card, Container, Divider, Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { postApi } from "post/api";
import { Post } from "post/types";
import LikeButton from "post/ui/LikeButton";
import { useEffect, useState } from "react";
import FullPageLoading from "shared/ui/FullPageLoading";
import { useUser } from "user/store/useUser";
import UserAvatar from "user/ui/Avatar";

export default function PostByIdPage() {
    const router = useRouter();
    const user = useUser();
    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!router.isReady) return;
        (async () => {
            try {
                const post = await postApi.get(router.query.id as string);
                setPost(post);
                setIsLoading(false);
            } catch (err) {
                router.push("/");
            }
        })();
    }, [router.isReady]);

    if (isLoading) {
        return <FullPageLoading />;
    }

    if (!post) {
        return null;
    }

    return (
        <Container css={{ paddingBlock: "$10" }}>
            <Link href="/" passHref>
                <Card css={{ width: "fit-content", border: "none" }} as="a">
                    <Card.Body>{"<"} powrót</Card.Body>
                </Card>
            </Link>
            <Spacer y={1} />
            <Container css={{ display: "flex", flexWrap: "initial", paddingInline: "$0" }}>
                <Card css={{ border: "none", maxWidth: "300px", maxHeight: "max-content" }}>
                    <div className="flex gap-4">
                        <UserAvatar
                            firstName={post.author.firstName}
                            lastName={post.author.lastName}
                        />
                        <span>{post.author.firstName + " " + post.author.lastName}</span>
                    </div>
                    {user.id !== post.author.id && (
                        <>
                            <Button
                                css={{ fontSize: "$lg" }}
                                className="md:w-full bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink focus:text-white"
                            >
                                Napisz
                            </Button>
                            <LikeButton postId={post.id} liked={post.liked} />
                        </>
                    )}
                </Card>
                <Spacer x={2} />
                <Card css={{ border: "none" }}>
                    <Card.Header>
                        <span
                            className="font-[700] text-[20px] md:text-[18px]"
                            style={{ display: "flex", flexWrap: "wrap", wordBreak: "break-word" }}
                        >
                            {post.title}
                        </span>
                    </Card.Header>
                    <Card.Body>{post.content}</Card.Body>
                </Card>
            </Container>
        </Container>
    );
}
