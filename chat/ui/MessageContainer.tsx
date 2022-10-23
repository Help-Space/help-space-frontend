import { Tooltip } from "@nextui-org/react";
import { Message } from "../types";

export default function MessageContainer({ author, message, created_at }: Message) {
    return (
        <Tooltip content={new Date(created_at).toLocaleString()} className="cursor-text">
            <p>{author.first_name + " " + author.last_name}</p>
            <p>{message}</p>
        </Tooltip>
    );
}
