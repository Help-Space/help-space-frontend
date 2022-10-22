import {
    Card,
    Text,
} from "@nextui-org/react";
import {Conversation} from "../types";

interface ConversationCardProps {
    conversation: Conversation;
    changeConversation: (conversationId: string) => void;
}

export default function ConversationCard({
    conversation: {_id, targetUser: {first_name, last_name}, post: {title}},
    changeConversation
}: ConversationCardProps) {

    return (
        <Card borderWeight={undefined}>
            {/* todo avatar */}}
            <Card.Header>
                <Text
                    css={{ fontSize: "$3xl", width: "100%", fontWeight: "$medium" }}
                    onClick={() => changeConversation(_id)}
                >
                    {first_name+ " "+ last_name}
                </Text>
            </Card.Header>
            <Card.Body>
                {title}
            </Card.Body>
        </Card>
    );
}
