import { Tooltip } from "@nextui-org/react";
import { useUser } from "user/store/useUser";
import { Message } from "../types";

interface AdditionalMessageProps {
    showAuthor: boolean;
}

export default function MessageContainer({
    author,
    message,
    created_at,
    showAuthor,
}: Message & AdditionalMessageProps) {
    const userId = useUser((state) => state.id);
    return (
        <Tooltip
            content={new Date(created_at).toLocaleString()}
            className="cursor-text w-full"
            placement="top"
        >
            <div
                className={`flex flex-col break-words w-max-[60%] ${
                    author._id === userId && "ml-auto"
                }`}
            >
                {showAuthor && (
                    <p className=" w-auto px-2 text-[12px]">
                        {author._id === userId ? "Ty" : author.first_name + " " + author.last_name}
                    </p>
                )}
                <p
                    className={`bg-[#e8e8e8] p-2 rounded-xl ${
                        author._id === userId && "bg-[#ffdfdf]"
                    }`}
                >
                    {message}
                </p>
            </div>
        </Tooltip>
    );
}
