import { Container, Loading } from "@nextui-org/react";
import ActiveConversation from "chat/ui/ActiveConversation";
import useChat from "../hooks/useChat";
import ConversationList from "../ui/ConversationList";
import FullPageError from "../ui/FullPageError";
import {useUser} from "../../user/store/useUser";

export default function MainPage() {
    const {changeConversation, activeConversationId, conversationCreate, messages, sendMessage, loadOldMessages, converstions, error, isLoading} = useChat();
    const {isLoggedIn} = useUser();

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
            {!isLoggedIn && <FullPageError content={"Login to see your conversations!"}/>}
            {converstions.length === 0 && isLoggedIn && <FullPageError content={"There are no active conversations!"}/>}
            <ConversationList conversations={converstions} changeConversation={changeConversation} />


            {converstions.length !== 0 &&
                <ActiveConversation activeConversationId={activeConversationId} messages={messages} sendMessage={sendMessage} loadOldMessages={loadOldMessages} />}
        </Container>
    );
}