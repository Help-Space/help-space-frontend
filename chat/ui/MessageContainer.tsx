import { Tooltip } from "@nextui-org/react";
import { Message } from "../types";

export default function MessageContainer({ author, message, created_at }: Message) {
    return (
        <Tooltip
            content={new Date(created_at).toLocaleString()}
            className="cursor-text w-full"
            placement="topStart"
        >
            <div className="flex flex-col break-words w-full">
                <p className=" w-auto px-2 text-[12px]">
                    {author.first_name + " " + author.last_name}
                </p>
                <p className="bg-[#e8e8e8] p-2 rounded-xl w-2/3">{message}</p>
            </div>
        </Tooltip>
    );
}
