import {
    Container,
} from "@nextui-org/react";
import { Message} from "../types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface ActiveConversationProps {
    activeConversationId: string;
    messages: Message[];
    sendMessage: (message: string) => void;
    loadOldMessages: () => void
}

export default function ActiveConversation({
    messages,
    sendMessage,
}: ActiveConversationProps) {

    return (
        <div className="flex flex-col justify-between w-full p-5">
            <div className="overflow-scroll overflow-x-hidden h-[100%] ">
                <MessageList messages={messages}/>
            </div>
            <div className="h-max">
                <MessageInput sendMessage={sendMessage}/>
            </div>
        </div>
    );
}
