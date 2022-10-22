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
        <Container>
            <MessageList messages={messages}/>
            <MessageInput sendMessage={sendMessage}/>
        </Container>
    );
}
