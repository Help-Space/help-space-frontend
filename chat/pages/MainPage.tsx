import ActiveConversation from "chat/ui/ActiveConversation";
import useChat from "../hooks/useChat";
import ConversationList from "../ui/ConversationList";
import FullPageError from "../../shared/ui/FullPageError";
import FullPageLoading from "../../shared/ui/FullPageLoading";
import useAuthRedirect from "user/hooks/useAuthRedirect";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MainPage() {
    const router = useRouter();
    const {
        conversationCreate,
        changeConversation,
        activeConversationId,
        messages,
        sendMessage,
        loadOldMessages,
        converstions,
        error,
        isLoading,
    } = useChat();

    useAuthRedirect({ redirectWhen: "unathorized", redirectPath: "/login" });

    useEffect(() => {
        const searchParams = new URL(window.location.href).searchParams;
        const postId = searchParams.get("postId");
        if (!postId) return;
        conversationCreate(postId);
        router.push("/conversations");
    }, []);

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
            {converstions.length === 0 ? (
                <FullPageError content={"There are no active conversations!"} />
            ) : (
                <div className="min-h-screen">
                    <div className="flex py-5 bg-[#fff] h-[80vh] rounded-[15px] ">
                        <div className="flex flex-col w-1/4 px-5 ">
                            <div className="py-2 px-2">
                                <span className="font-[700] text-[20px] md:text-[18px]">
                                    Wiadomości
                                </span>
                            </div>
                            <div className="w-full h-full overflow-scroll overflow-x-hidden">
                                <ConversationList
                                    activeConverstionId={activeConversationId}
                                    conversations={converstions}
                                    changeConversation={changeConversation}
                                />
                            </div>
                        </div>
                        <div className="flex w-3/4 bg-primaryPink h-full ">
                            {converstions.length !== 0 && (
                                <ActiveConversation
                                    activeConversationId={activeConversationId}
                                    messages={messages}
                                    sendMessage={sendMessage}
                                    loadOldMessages={loadOldMessages}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
