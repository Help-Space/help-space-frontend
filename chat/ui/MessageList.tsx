import { Container } from "@nextui-org/react";
import MessageContainter from "./MessageContainer";
import { Message } from "../types";

export default function MessageList({ messages }: { messages: Message[] }) {
    return (
        <Container>
            {messages.map((message) => (
                <MessageContainter key={message._id} {...message} />
            ))}
        </Container>
    );
}
