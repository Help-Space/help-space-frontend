import { Conversation, Message } from "chat/types";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "shared/api/fetchApi";
import { io, Socket } from "socket.io-client";

export default function useChat() {
    const socketRef = useRef<Socket>();

    const [activeConverstionId, setActiveConverationId] = useState<string>("");
    const [converstions, setConverstions] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    const setUpListeners = (socket: Socket) => {
        socket.once("conversations", (converstions: Conversation[]) => {
            setConverstions(converstions);
        });
        socket.on("message", (message: Message) => {
            if (message.conversation !== activeConverstionId) return;
            setMessages((msgs) => [...msgs, message]);
        });
        socket.on("messages", (messages: Message[]) => {
            if (messages.length < 1 || messages[0].conversation !== activeConverstionId) return;
            setMessages((msgs) => [...messages, ...msgs]);
        });
    };

    const connect = () => {
        const socket = io(BACKEND_URL);
        socketRef.current = socket;
        setUpListeners(socket);
    };

    const disconnect = () => {
        if (!socketRef.current) return;
        socketRef.current.disconnect();
        socketRef.current = undefined;
    };

    useEffect(() => {
        connect();
        return disconnect;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const converstionCreate = (postId: string) => {
        socketRef.current?.emit("conversationCreate", { postId });
    };

    const loadMessages = (converstionId: string, skip: number) => {
        socketRef.current?.emit("messagesRequest", { converstionId, skip });
    };

    const changeConverstion = (converstionId: string) => {
        setActiveConverationId(converstionId);
        loadMessages(converstionId, 0);
    };

    const loadOldMessages = () => {
        loadMessages(activeConverstionId, messages.length);
    };

    const sendMessage = (message: string) => {
        socketRef.current?.emit("message", { conversationId: activeConverstionId, message });
    };

    return {
        activeConverstionId,
        converstions,
        messages,
        converstionCreate,
        changeConverstion,
        loadOldMessages,
        sendMessage,
    };
}
