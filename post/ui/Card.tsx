import { Post } from "post/types";
import {
    Avatar,
    Button,
    Card,
    Container,
    Grid,
    Image,
    Spacer,
    Text,
    Tooltip,
} from "@nextui-org/react";
import HeartIcon from "./HeartIcon";
import { postApi } from "post/api";
import { useMemo, useState } from "react";
import { useUser } from "user/store/useUser";
import { useRouter } from "next/router";

export default function PostCard({
    id: postId,
    title,
    author: { id: authorId, firstName, lastName },
    content,
    liked,
}: Post) {
    const router = useRouter();

    const { id: userId, isLoggedIn } = useUser();

    const [isLiked, setIsLiked] = useState(liked);
    const like = () => {
        try {
            if (isLiked) {
                postApi.removeLike(postId);
                setIsLiked(false);
                return;
            }
            postApi.addLike(postId);
            setIsLiked(true);
        } catch (err) {
            console.error(err);
        }
    };

    const [showMore, setShowMore] = useState(true);
    const contentWords = useMemo(() => content.split(" "), [content]);

    return (
        <Card borderWeight={undefined}>
            <Card.Header>
                <Text
                    css={{ fontSize: "$3xl", width: "100%", fontWeight: "$medium" }}
                    onClick={() => router.push(`/post/${postId}`)}
                >
                    {title}
                </Text>
                <Tooltip
                    content={"Musisz być zalogowany, by móc dodawać ogłoszenia do ulubionych"}
                    css={{ display: isLoggedIn ? "none" : "block" }}
                >
                    <Button
                        onClick={isLoggedIn ? like : undefined}
                        auto
                        icon={<HeartIcon fill={liked ? "#d4402c" : "black"} />}
                    />
                </Tooltip>
            </Card.Header>
            <Card.Body>
                <div className="flex">
                    <Avatar text={firstName.substring(0, 1) + lastName.substring(0, 1)} squared />
                    <Text>{firstName + " " + lastName}</Text>
                </div>
                <Spacer y={1} />
                <Text>{showMore ? content : contentWords.slice(0, 100)}</Text>
                {contentWords.length > 100 && !showMore && (
                    <Button onClick={() => setShowMore(true)}>Pokaż więcej...</Button>
                )}
                {authorId !== userId && isLoggedIn && (
                    <Button
                        css={{ fontSize: "$lg" }}
                        className="bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink"
                    >
                        Napisz
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}
