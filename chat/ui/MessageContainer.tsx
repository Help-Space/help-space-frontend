import { Message } from "../types";

export default function MessageContainer({
    author,
    message,
    created_at, // on hover, show the full date
}: Message) {
    return (
        <>
            <p>{author.first_name + " " + author.last_name}</p>
            <p>{message}</p>
        </>
    );
}
