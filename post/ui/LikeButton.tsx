import { Button, Tooltip } from "@nextui-org/react";
import { postApi } from "post/api";
import { useState } from "react";
import { useUser } from "user/store/useUser";
import HeartIcon from "./HeartIcon";

interface LikeButtonProps {
    liked: boolean;
    postId: string;
}

export default function LikeButton({ liked, postId }: LikeButtonProps) {
    const isLoggedIn = useUser((state) => state.isLoggedIn);
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

    return (
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
    );
}
