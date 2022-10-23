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
import Head from "next/head";

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
        <>
            <Head>
                <title>Ogłoszenie - {post.title}</title>
            </Head>
            <Container css={{ paddingBlock: "$10" }} className="px-[15%] min-h-screen">
                <Link href="/" passHref>
                    <Card css={{ width: "fit-content", border: "none" }} as="a">
                        <span className="px-5 py-2">{"<"} powrót</span>
                    </Card>
                </Link>
                <Spacer y={1} />
                <div className="flex xl:flex-col">
                    <div>
                        <Card className="flex flex-col font-quicksand !bg-[#FFF] shadow-md shadow-indigo-500/40 p-5" css={{ border: 'none' }}>
                            <div className="flex">
                                <Link href={`/profile/${post.author.id}`}>
                                    <UserAvatar
                                        firstName={post.author.firstName}
                                        lastName={post.author.lastName}
                                    />
                                </Link>
                                <Spacer x={0.5} />
                                <div className="flex flex-col " style={{ flexWrap: "wrap", wordBreak: "break-word" }} >
                                    <Link href={`/profile/${post.author.id}`}>
                                        <span className="cursor-pointer">{post.author.firstName + " " + post.author.lastName}</span>
                                    </Link>
                                    <span style={{ fontSize: "12px" }}>
                                        {new Date(post.lastRefresh).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            {user.id !== post.author.id && (
                                <>
                                    <Spacer x={0.5} />
                                    <div className="flex gap-3">
                                        <Button
                                            css={{ fontSize: "$lg" }}
                                            className="w-auto bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink focus:text-white"
                                            >
                                            Napisz
                                        </Button>
                                        <LikeButton postId={post.id} liked={post.liked} />
                                    </div>
                                </>
                            )}
                        </Card>
                    </div>
                    <Spacer x={2} />
                    <Card css={{ border: "none" }} className="p-3 w-2/3 xl:w-full">
                        <Card.Header>
                            <span
                                className="font-[700] text-[20px] md:text-[18px]"
                                style={{ display: "flex", flexWrap: "wrap", wordBreak: "break-word" }}
                            >
                                {post.title}
                            </span>
                        </Card.Header>
                        <Card.Body style={{ display: "flex", flexWrap: "wrap",  wordBreak: "break-word"}}>{post.content}</Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    );
}
