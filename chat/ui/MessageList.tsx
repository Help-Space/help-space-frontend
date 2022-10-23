import MessageContainer from "./MessageContainer";
import { Message } from "../types";

export default function MessageList({ messages }: { messages: Message[] }) {
    return (
        <div className="flex flex-col gap-4">
            {messages.map((message, index) => {
                return (
                    <MessageContainer
                        key={message._id}
                        {...message}
                        showAuthor={
                            index < 1 || messages.at(index - 1)?.author._id !== message.author._id
                        }
                    />
                );
            })}
        </div>
    );
}
