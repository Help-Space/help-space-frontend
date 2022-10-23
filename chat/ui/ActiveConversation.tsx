import { Container } from "@nextui-org/react";
import { Message } from "../types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";

interface ActiveConversationProps {
    activeConversationId: string;
    messages: Message[];
    sendMessage: (message: string) => void;
    loadOldMessages: () => void;
}

export default function ActiveConversation({ messages, sendMessage }: ActiveConversationProps) {
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageListRef.current?.scrollTo({
            top: messageListRef.current?.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="flex flex-col justify-between w-full p-5 gap-[1.25rem]">
            <div className="overflow-scroll overflow-x-hidden h-[100%]" ref={messageListRef}>
                <MessageList messages={messages} />
            </div>
            <div className="h-max">
                <MessageInput sendMessage={sendMessage} />
            </div>
        </div>
    );
}
