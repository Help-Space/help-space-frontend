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
    lastRefresh,
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
        <Card css={{ border: "none", width: "100%", paddingBlock: "1rem" }}>
            <div
                className="flex items-center w-full"
                style={{
                    justifyContent: "space-between",
                    paddingInline: "1.5rem",
                    paddingBottom: "1rem",
                }}
            >
                <span
                    className="font-[700]"
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => router.push(`/post/${postId}`)}
                >
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
                            icon={<HeartIcon fill={isLiked ? "#d4402c" : "black"} />}
                        />
                    </Tooltip>
                </div>
            </div>
            <div>
                <div className="flex font-quicksand" style={{ paddingInline: "1.5rem" }}>
                    <UserAvatar firstName={firstName} lastName={lastName} />
                    <Spacer x={0.5} />
                    <div className="flex flex-col">
                        <span>{firstName + " " + lastName}</span>
                        <span style={{ fontSize: "12px" }}>
                            {new Date(lastRefresh).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <Spacer y={1} />
                <span style={{ paddingInline: "1.5rem" }}>
                    {showMore ? content : contentWords.slice(0, 100).join(" ")}
                </span>
                {contentWords.length > 100 && !showMore && (
                    <span
                        className="text-mediumDark font-bold underline-offset-1"
                        onClick={() => setShowMore(true)}
                    >
                        Pokaż więcej...
                    </span>
                )}
                <Spacer y={1} />
                {authorId !== userId && isLoggedIn && (
                    <div style={{ paddingInline: "1.5rem" }}>
                        <Button
                            css={{ fontSize: "$lg" }}
                            className="bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink focus:text-white"
                        >
                            Napisz
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
