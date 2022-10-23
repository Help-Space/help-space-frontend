import { Container, Text } from "@nextui-org/react";
import ConversationCard from "./ConversationCard";
import { Conversation } from "../types";

interface ConversationListProps {
    activeConverstionId: string;
    conversations: Conversation[];
    changeConversation: (conversationId: string) => void;
}

export default function ConversationList({
    activeConverstionId,
    conversations,
    changeConversation,
}: ConversationListProps) {
    return (
        <div>
            {conversations.map((conversation) => {
                return (
                    <ConversationCard
                        isActive={activeConverstionId === conversation._id}
                        conversation={conversation}
                        key={conversation._id}
                        changeConversation={changeConversation}
                    />
                );
            })}
        </div>
    );
}
