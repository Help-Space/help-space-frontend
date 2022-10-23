import { Container, Loading } from "@nextui-org/react";
import ActiveConversation from "chat/ui/ActiveConversation";
import useChat from "../hooks/useChat";
import ConversationList from "../ui/ConversationList";
import FullPageError from "../../shared/ui/FullPageError";
import {useUser} from "../../user/store/useUser";
import FullPageLoading from "../../shared/ui/FullPageLoading";
import useAuthRedirect from "user/hooks/useAuthRedirect";

export default function MainPage() {
    const {changeConversation, activeConversationId, messages, sendMessage, loadOldMessages, converstions, error, isLoading} = useChat();
    const {isLoggedIn} = useUser();

    useAuthRedirect({ redirectWhen: "unathorized", redirectPath: '/login'})

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
        return <FullPageLoading />;
    }

    return (
        <>
            {converstions.length === 0 ? <FullPageError content={"There are no active conversations!"} /> : (
                <>
                    <div className="flex py-5 bg-[#fff] rounded-[15px]">
                        <div className="flex flex-col w-1/4 px-5">
                            <div className="py-2 px-2">
                                <span className="font-[700] text-[20px] md:text-[18px]">Wiadomości</span>
                            </div>
                            <div className="w-full h-full ">
                                <ConversationList conversations={converstions} changeConversation={changeConversation}  />
                            </div> 
                        </div>
                        <div className="flex w-3/4 bg-primaryPink  ">
                            <div className="bg-[red] w-full h-full ">
                                <div className="bg-primaryPink rounded-[30px]">
                                    { 
                                        converstions.length !== 0 && <ActiveConversation activeConversationId={activeConversationId} messages={messages} sendMessage={sendMessage} loadOldMessages={loadOldMessages} />
                                    } 
                                </div>
                            </div> 
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
