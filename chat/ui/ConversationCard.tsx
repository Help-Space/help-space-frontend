import { Card, Text, Spacer } from "@nextui-org/react";
import UserAvatar from "user/ui/Avatar";
import { Conversation } from "../types";

interface ConversationCardProps {
    conversation: Conversation;
    changeConversation: (conversationId: string) => void;
}

export default function ConversationCard({
    conversation: {
        _id,
        targetUser: { first_name, last_name },
        post: { title },
    },
    changeConversation,
}: ConversationCardProps) {
    return (
        <div className="flex py-3 px-2 rounded-lg bg-white transition  ease-in-out delay-[40ms] hover:bg-[#ffdfdf] text-lightDark">
            <UserAvatar
                firstName={first_name}
                lastName={last_name}
            />
            <Spacer x={0.5} />
            <div className="flex flex-col" style={{ flexWrap: "wrap", wordBreak: "break-word", cursor: 'pointer' }} onClick={() => changeConversation(_id)} >
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                    {title}
                </span>
                <span style={{ fontSize: "11px" }}>
                    {first_name + " " + last_name}
                </span>
            </div>
        </div>

    );
}


