import {Container, Text} from "@nextui-org/react";
import ConversationCard from "./ConversationCard";
import {Conversation} from "../types";

interface ConversationListProps {
    conversations: Conversation[];
    changeConversation: (conversationId: string) => void;
}

export default function ConversationList({conversations, changeConversation}: ConversationListProps) {
    return (
        <Container>
            {conversations.length === 0 && <Text>There are no started conversations!</Text>}
            {conversations.map((conversation) => {
                return <ConversationCard conversation={conversation} key={conversation._id}
                                         changeConversation={changeConversation}/>;
            })}
        </Container>
    );
}
