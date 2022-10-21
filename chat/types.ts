export interface Message {
    _id: string;
    author: string;
    message: string;
    conversation: string;
    created_at: Date;
}

export interface ConversationPost {
    _id: string;
    title: string;
}

export interface Conversation {
    _id: string;
    user: string;
    post: ConversationPost;
}
