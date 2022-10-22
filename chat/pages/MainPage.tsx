import { Container, Loading } from "@nextui-org/react";
import ActiveConversation from "chat/ui/ActiveConversation";
import useChat from "../hooks/useChat";
import ConversationList from "../ui/ConversationList";

export default function MainPage() {
    const {changeConversation, activeConversationId, conversationCreate, messages, sendMessage, loadOldMessages, converstions, error, isLoading} = useChat();

    if (error) {
        return (
            <div className="flex flex-col gap-4 items-center min-h-screen py-[100px] md:min-h-[auto] ">
                <span className="text-[350px] opacity-10 font-[700] text-primaryPink md:text-[150px]">
                    5<span className="text-mediumDark">0</span>0
                </span>
                <span className="text-lightDark text-[40px] font-[700]">{error}</span>
            </div>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container css={{ display: "flex", justifyContent: "center", gap: "$10" }}>
            <ConversationList conversations={converstions} changeConversation={changeConversation} />
            <ActiveConversation activeConversationId={activeConversationId} messages={messages} sendMessage={sendMessage} loadOldMessages={loadOldMessages} />
        </Container>
    );
}
