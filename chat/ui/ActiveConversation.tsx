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
        <div className="flex  flex-col justify-between bg-[lightgreen] w-full ">
            <div className="overflow-scroll overflow-x-hidden h-[90%]">
                <MessageList messages={messages}/>
            </div>
            <div>
                <MessageInput sendMessage={sendMessage}/>
            </div>
        </div>
    );
}
