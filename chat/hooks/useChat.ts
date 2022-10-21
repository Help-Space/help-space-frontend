import { Conversation, Message } from "chat/types";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "shared/api/fetchApi";
import { io, Socket } from "socket.io-client";

export default function useChat() {
    const socketRef = useRef<Socket>();

    const [activeConversationId, setActiveConversationId] = useState<string>("");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    const setUpListeners = (socket: Socket) => {
        socket.once("conversations", (conversations: Conversation[]) => {
            if (conversations.length < 1) return;
            setConversations(conversations);
            changeConversation(conversations[0]._id);
        });
        socket.on("converstionCreated", (newConversation: Conversation) => {
            setConversations((conversations) => [newConversation, ...conversations]);
        });
        socket.on("message", (message: Message) => {
            if (message.conversation !== activeConversationId) return;
            setMessages((msgs) => [...msgs, message]);
        });
        socket.on("messages", (messages: Message[]) => {
            if (messages.length < 1 || messages[0].conversation !== activeConversationId) return;
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

    const conversationCreate = (postId: string) => {
        socketRef.current?.emit("conversationCreate", { postId });
    };

    const loadMessages = (conversationId: string, skip: number) => {
        socketRef.current?.emit("messagesRequest", { conversationId, skip });
    };

    const changeConversation = (conversationId: string) => {
        setActiveConversationId(conversationId);
        setMessages([]);
        loadMessages(conversationId, 0);
    };

    const loadOldMessages = () => {
        loadMessages(activeConversationId, messages.length);
    };

    const sendMessage = (message: string) => {
        socketRef.current?.emit("message", { conversationId: activeConversationId, message });
    };

    return {
        activeConversationId,
        converstions: conversations,
        messages,
        conversationCreate,
        changeConversation,
        loadOldMessages,
        sendMessage,
    };
}
