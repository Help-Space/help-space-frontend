import { Avatar } from "@nextui-org/react";

interface UserAvatarProps {
    firstName: string;
    lastName: string;
}

export default function UserAvatar({ firstName, lastName }: UserAvatarProps) {
    return <Avatar text={firstName.substring(0, 1) + lastName.substring(0, 1)} squared />;
}
