export interface User {
    _id: string;
    first_name: string;
    last_name: string;
}

export interface Message {
    _id: string;
    author: User;
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
    targetUser: User;
    post: ConversationPost;
}
