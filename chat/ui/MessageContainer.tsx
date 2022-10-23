import { Message } from "../types";

export default function MessageContainer({
    author,
    message,
    created_at, // on hover, show the full date
}: Message) {
    return (
        <div className="flex flex-col break-words">
            <p className=" w-auto px-2 text-[12px]">{author.first_name + " " + author.last_name}</p>
            <p className="bg-[#e8e8e8] p-2 rounded-xl w-2/3">{message}</p>
        </div>
    );
}
