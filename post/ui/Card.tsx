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
import UserAvatar from "user/ui/Avatar";

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

    const [showMore, setShowMore] = useState(false);
    const contentWords = useMemo(() => content.split(" "), [content]);

    return (
        <Card css={{ border: "none" }}>
            <div className="flex w-full" style={{ justifyContent: "space-between" }}>
                <span className="font-[700]" onClick={() => router.push(`/post/${postId}`)}>
                    {title}
                </span>
                <div>
                    <Tooltip
                        content={"Musisz być zalogowany, by móc dodawać ogłoszenia do ulubionych"}
                        css={{ display: isLoggedIn ? "none" : "block" }}
                        className="self-end"
                    >
                        <Button
                            onClick={isLoggedIn ? like : undefined}
                            auto
                            icon={<HeartIcon fill={liked ? "#d4402c" : "black"} />}
                        />
                    </Tooltip>
                </div>
            </div>
            <Card.Body>
                <div className="flex">
                    <UserAvatar firstName={firstName} lastName={lastName} />
                    <Spacer x={0.5} />
                    <span>{firstName + " " + lastName}</span>
                </div>
                <Spacer y={1} />
                <span>{showMore ? content : contentWords.slice(0, 100).join(" ")}</span>
                {contentWords.length > 100 && !showMore && (
                    <span
                        className="text-mediumDark font-bold underline-offset-1"
                        onClick={() => setShowMore(true)}
                    >
                        Pokaż więcej...
                    </span>
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
